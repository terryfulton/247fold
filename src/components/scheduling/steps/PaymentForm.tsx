import React, { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { stripePromise, createPaymentIntent } from '../../../lib/stripe';
import { OrderDetails } from '../../../types/scheduling';
import { ArrowLeft } from 'lucide-react';

interface PaymentFormContentProps {
  orderDetails: OrderDetails;
  onPaymentComplete: (paymentIntentId: string) => void;
  onBack: () => void;
}

function PaymentFormContent({
  orderDetails,
  onPaymentComplete,
  onBack
}: PaymentFormContentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'An error occurred while processing your payment.');
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      onPaymentComplete(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        
        <button
          type="submit"
          disabled={!stripe || processing}
          className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? 'Processing...' : `Pay $${(orderDetails.total_amount / 100).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

interface PaymentFormProps {
  orderDetails: OrderDetails;
  onPaymentComplete: (paymentIntentId: string) => void;
  onBack: () => void;
}

export function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const { clientSecret } = await createPaymentIntent(props.orderDetails.total_amount);
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Error initializing payment:', err);
      }
    };

    initializePayment();
  }, [props.orderDetails.total_amount]);

  if (!clientSecret) {
    return <div className="text-center py-8">Loading payment form...</div>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb',
          },
        },
      }}
    >
      <PaymentFormContent {...props} />
    </Elements>
  );
} 