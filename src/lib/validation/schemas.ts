import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  address: z.string().min(5).max(200),
});

export const orderSchema = z.object({
  customer_id: z.string().uuid(),
  total_amount: z.number().positive(),
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']),
});

export const orderItemSchema = z.object({
  order_id: z.string().uuid(),
  product_id: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});