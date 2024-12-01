import React from 'react';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessProps {
  orderId: string;
  onClose: () => void;
}

export function OrderSuccess({ orderId, onClose }: OrderSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-4">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        </div>
        
        <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
        
        <p className="text-gray-600 mb-6">
          Your order #{orderId.slice(0, 8)} has been successfully placed.
          We'll send you a confirmation email with the details.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            You can track your order status in your account dashboard.
          </p>

          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors w-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
} 