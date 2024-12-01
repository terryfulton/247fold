import { supabase } from '../supabase/config';
import { customerSchema } from '../validation/schemas';
import type { Database } from '../supabase/types';

type Customer = Database['public']['Tables']['customers']['Row'];
type CustomerInput = Database['public']['Tables']['customers']['Insert'];

export async function createCustomer(data: CustomerInput) {
  const validated = customerSchema.parse(data);
  
  const { data: customer, error } = await supabase
    .from('customers')
    .insert([validated])
    .select()
    .single();

  if (error) throw error;
  return customer;
}

export async function getCustomer(id: string) {
  const { data: customer, error } = await supabase
    .from('customers')
    .select()
    .eq('id', id)
    .single();

  if (error) throw error;
  return customer;
}

export async function updateCustomer(id: string, data: Partial<CustomerInput>) {
  const validated = customerSchema.partial().parse(data);

  const { data: customer, error } = await supabase
    .from('customers')
    .update(validated)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return customer;
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}