import { supabase } from '../supabase/config';
import { orderSchema, orderItemSchema } from '../validation/schemas';
import type { Database } from '../supabase/types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInput = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInput = Database['public']['Tables']['order_items']['Insert'];

export async function createOrder(orderData: OrderInput, items: OrderItemInput[]) {
  const validatedOrder = orderSchema.parse(orderData);
  const validatedItems = items.map(item => orderItemSchema.parse(item));

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([validatedOrder])
    .select()
    .single();

  if (orderError) throw orderError;

  const itemsWithOrderId = validatedItems.map(item => ({
    ...item,
    order_id: order.id,
  }));

  const { data: orderItems, error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId)
    .select();

  if (itemsError) throw itemsError;

  return { order, items: orderItems };
}

export async function getOrder(id: string) {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', id)
    .single();

  if (orderError) throw orderError;
  return order;
}

export async function getCustomerOrders(customerId: string) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('customer_id', customerId)
    .order('order_date', { ascending: false });

  if (error) throw error;
  return orders;
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const { data: order, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return order;
}