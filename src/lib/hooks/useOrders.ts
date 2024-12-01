import { useState, useEffect } from 'react';
import { getCustomerOrders } from '../api/orders';
import type { Database } from '../supabase/types';

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: Database['public']['Tables']['order_items']['Row'][];
};

export function useOrders(customerId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getCustomerOrders(customerId);
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [customerId]);

  return { orders, loading, error };
}