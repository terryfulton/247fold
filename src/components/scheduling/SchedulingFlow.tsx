import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { ServiceSelection } from './steps/ServiceSelection';
import { TimeSlotSelection } from './steps/TimeSlotSelection';
import { AddressForm } from './steps/AddressForm';
import { OrderReview } from './steps/OrderReview';
import { PaymentForm } from './steps/PaymentForm';
import { OrderDetails } from '../../types/scheduling';
import { supabase } from '../../lib/supabase';

type Step = 'service' | 'time' | 'address' | 'review' | 'payment';

interface SchedulingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulingFlow({ isOpen, onClose }: SchedulingFlowProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('service');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<Partial<OrderDetails>>({
    bag_count: 1,
    specialty_items: []
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    switch (currentStep) {
      case 'service':
        setCurrentStep('time');
        break;
      case 'time':
        setCurrentStep('address');
        break;
      case 'address':
        setCurrentStep('review');
        break;
      case 'review':
        setCurrentStep('payment');
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'time':
        setCurrentStep('service');
        break;
      case 'address':
        setCurrentStep('time');
        break;
      case 'review':
        setCurrentStep('address');
        break;
      case 'payment':
        setCurrentStep('review');
        break;
    }
  };

  const handlePaymentComplete = async (paymentIntentId: string) => {
    try {
      // Create the order in the database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user!.id,
            address_id: orderDetails.address_id,
            pickup_date: orderDetails.pickup_date,
            pickup_time_slot: orderDetails.pickup_time_slot,
            bag_count: orderDetails.bag_count,
            total_amount: orderDetails.total_amount,
            stripe_payment_intent_id: paymentIntentId,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create specialty items if any
      if (orderDetails.specialty_items?.length) {
        const { error: itemsError } = await supabase
          .from('order_specialty_items')
          .insert(
            orderDetails.specialty_items.map(item => ({
              order_id: order.id,
              item_type: item.type,
              quantity: item.quantity,
              price_per_item: item.price_per_item,
            }))
          );

        if (itemsError) throw itemsError;
      }

      // Close the modal and show success message
      onClose();
      // You might want to show a success toast or redirect to an order confirmation page
    } catch (err) {
      console.error('Error creating order:', err);
      // Handle error (show error message to user)
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'service':
        return (
          <ServiceSelection
            orderDetails={orderDetails}
            onUpdate={setOrderDetails}
            onNext={handleNext}
          />
        );
      case 'time':
        return (
          <TimeSlotSelection
            orderDetails={orderDetails}
            onUpdate={setOrderDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'address':
        return (
          <AddressForm
            orderDetails={orderDetails}
            onUpdate={setOrderDetails}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'review':
        return (
          <OrderReview
            orderDetails={orderDetails as OrderDetails}
            onUpdate={setOrderDetails}
            onSubmit={handleNext}
            onBack={handleBack}
          />
        );
      case 'payment':
        return (
          <PaymentForm
            orderDetails={orderDetails as OrderDetails}
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBack}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Schedule Pickup</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {renderStep()}

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signup"
        />
      </div>
    </div>
  );
} 