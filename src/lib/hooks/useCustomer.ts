import { useState, useEffect } from 'react';
import { getCustomer } from '../api/customers';
import type { Database } from '../supabase/types';

type Customer = Database['public']['Tables']['customers']['Row'];

export function useCustomer(id: string) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const data = await getCustomer(id);
        setCustomer(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch customer'));
      } finally {
        setLoading(false);
      }
    }

    fetchCustomer();
  }, [id]);

  return { customer, loading, error };
}