import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { OrderDetails } from '../types/scheduling';

interface UseOrderResult {
  creating: boolean;
  error: string | null;
  createOrder: (userId: string, orderDetails: OrderDetails, paymentIntentId: string) => Promise<string>;
}

export function useOrder(): UseOrderResult {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (
    userId: string,
    orderDetails: OrderDetails,
    paymentIntentId: string
  ): Promise<string> => {
    setCreating(true);
    setError(null);

    try {
      // Create the main order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: userId,
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

      return order.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return {
    creating,
    error,
    createOrder,
  };
} 