import React from 'react';
import { OrderDetails, SpecialtyItem, SPECIALTY_ITEMS_PRICING, BAG_PRICE } from '../../../types/scheduling';
import { Package, Plus, Minus } from 'lucide-react';

interface ServiceSelectionProps {
  orderDetails: Partial<OrderDetails>;
  onUpdate: (details: Partial<OrderDetails>) => void;
  onNext: () => void;
}

export function ServiceSelection({ orderDetails, onUpdate, onNext }: ServiceSelectionProps) {
  const handleBagCountChange = (increment: boolean) => {
    const newCount = increment
      ? (orderDetails.bag_count || 1) + 1
      : Math.max(1, (orderDetails.bag_count || 1) - 1);
    
    onUpdate({ ...orderDetails, bag_count: newCount });
  };

  const handleSpecialtyItemChange = (type: SpecialtyItem['type'], increment: boolean) => {
    const currentItems = orderDetails.specialty_items || [];
    const itemIndex = currentItems.findIndex(item => item.type === type);
    
    if (itemIndex === -1 && increment) {
      // Add new item
      currentItems.push({
        type,
        quantity: 1,
        price_per_item: SPECIALTY_ITEMS_PRICING[type]
      });
    } else if (itemIndex !== -1) {
      // Update existing item
      const newQuantity = increment
        ? currentItems[itemIndex].quantity + 1
        : currentItems[itemIndex].quantity - 1;
      
      if (newQuantity === 0) {
        currentItems.splice(itemIndex, 1);
      } else {
        currentItems[itemIndex] = {
          ...currentItems[itemIndex],
          quantity: newQuantity
        };
      }
    }

    onUpdate({ ...orderDetails, specialty_items: [...currentItems] });
  };

  const getItemQuantity = (type: SpecialtyItem['type']): number => {
    return orderDetails.specialty_items?.find(item => item.type === type)?.quantity || 0;
  };

  const calculateTotal = (): number => {
    const bagTotal = (orderDetails.bag_count || 1) * BAG_PRICE;
    const specialtyTotal = (orderDetails.specialty_items || []).reduce(
      (sum, item) => sum + (item.quantity * item.price_per_item),
      0
    );
    return bagTotal + specialtyTotal;
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Wash & Fold Bags</h3>
            <p className="text-sm text-gray-600">Each bag holds up to 25 lbs (2-3 loads)</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleBagCountChange(false)}
              className="p-2 rounded-full hover:bg-blue-100 transition-colors"
              disabled={orderDetails.bag_count === 1}
            >
              <Minus className="h-5 w-5 text-blue-600" />
            </button>
            <span className="text-xl font-semibold">{orderDetails.bag_count || 1}</span>
            <button
              onClick={() => handleBagCountChange(true)}
              className="p-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              <Plus className="h-5 w-5 text-blue-600" />
            </button>
          </div>
        </div>
        <div className="text-right text-lg font-semibold">
          ${((orderDetails.bag_count || 1) * BAG_PRICE / 100).toFixed(2)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Specialty Items (Optional)</h3>
        <div className="space-y-4">
          {Object.entries(SPECIALTY_ITEMS_PRICING).map(([type, price]) => (
            <div key={type} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">{type}</h4>
                  <p className="text-sm text-gray-600">${(price / 100).toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleSpecialtyItemChange(type as SpecialtyItem['type'], false)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    disabled={getItemQuantity(type as SpecialtyItem['type']) === 0}
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-medium w-6 text-center">
                    {getItemQuantity(type as SpecialtyItem['type'])}
                  </span>
                  <button
                    onClick={() => handleSpecialtyItemChange(type as SpecialtyItem['type'], true)}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center text-lg font-semibold mb-6">
          <span>Total</span>
          <span>${(calculateTotal() / 100).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onNext}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Package className="h-5 w-5" />
          <span>Continue to Pickup Time</span>
        </button>
      </div>
    </div>
  );
} 