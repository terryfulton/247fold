import React, { useEffect, useState } from 'react';
import { OrderDetails, Address, TimeSlot, SPECIALTY_ITEMS_PRICING, BAG_PRICE } from '../../../types/scheduling';
import { supabase } from '../../../lib/supabase';
import { Package, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface OrderReviewProps {
  orderDetails: Partial<OrderDetails>;
  onUpdate: (details: Partial<OrderDetails>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function OrderReview({
  orderDetails,
  onUpdate,
  onSubmit,
  onBack
}: OrderReviewProps) {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<Address | null>(null);
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    loadDetails();
  }, [orderDetails.address_id, orderDetails.pickup_time_slot]);

  const loadDetails = async () => {
    setLoading(true);
    try {
      // Load address details
      if (orderDetails.address_id) {
        const { data: addressData, error: addressError } = await supabase
          .from('addresses')
          .select('*')
          .eq('id', orderDetails.address_id)
          .single();

        if (addressError) throw addressError;
        setAddress(addressData);
      }

      // Load time slot details
      if (orderDetails.pickup_time_slot) {
        const { data: timeSlotData, error: timeSlotError } = await supabase
          .from('time_slots')
          .select('*')
          .eq('id', orderDetails.pickup_time_slot)
          .single();

        if (timeSlotError) throw timeSlotError;
        setTimeSlot(timeSlotData);
      }
    } catch (err) {
      console.error('Error loading order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeSlot = (slot: TimeSlot) => {
    const start = new Date(`2000-01-01T${slot.start_time}`);
    const end = new Date(`2000-01-01T${slot.end_time}`);
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const calculateTotal = (): number => {
    const bagTotal = (orderDetails.bag_count || 1) * BAG_PRICE;
    const specialtyTotal = (orderDetails.specialty_items || []).reduce(
      (sum, item) => sum + (item.quantity * item.price_per_item),
      0
    );
    return bagTotal + specialtyTotal;
  };

  if (loading) {
    return <div className="text-center py-8">Loading order details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Package className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium">Order Summary</h3>
              <p className="text-sm text-gray-600 mt-1">
                {orderDetails.bag_count} Wash & Fold {orderDetails.bag_count === 1 ? 'Bag' : 'Bags'}
              </p>
              {orderDetails.specialty_items?.map((item) => (
                <p key={item.type} className="text-sm text-gray-600">
                  {item.quantity}x {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
              ))}
            </div>
          </div>
        </div>

        {address && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Pickup & Delivery Address</h3>
                <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
                {address.delivery_instructions && (
                  <p className="text-sm text-gray-500 mt-2">{address.delivery_instructions}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {timeSlot && orderDetails.pickup_date && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium">Pickup Time</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {format(new Date(orderDetails.pickup_date), 'EEEE, MMMM d')}
                </p>
                <p className="text-sm text-gray-600">{formatTimeSlot(timeSlot)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Wash & Fold ({orderDetails.bag_count} {orderDetails.bag_count === 1 ? 'bag' : 'bags'})</span>
          <span>${((orderDetails.bag_count || 1) * BAG_PRICE / 100).toFixed(2)}</span>
        </div>
        
        {orderDetails.specialty_items?.map((item) => (
          <div key={item.type} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} (×{item.quantity})
            </span>
            <span>${((item.quantity * item.price_per_item) / 100).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between text-lg font-semibold pt-2">
          <span>Total</span>
          <span>${(calculateTotal() / 100).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>Proceed to Payment</span>
        </button>
      </div>
    </div>
  );
} 