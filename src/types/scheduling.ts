export interface TimeSlot {
  id: string;
  start_time: string;
  end_time: string;
  max_orders: number;
  is_active: boolean;
}

export interface Address {
  id: string;
  user_id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  delivery_instructions?: string;
  is_default: boolean;
}

export interface SpecialtyItem {
  type: 'comforter' | 'blanket' | 'pillow';
  quantity: number;
  price_per_item: number;
}

export interface OrderDetails {
  pickup_date: string;
  pickup_time_slot: string;
  address_id: string;
  bag_count: number;
  specialty_items: SpecialtyItem[];
  total_amount: number;
}

export const SPECIALTY_ITEMS_PRICING = {
  comforter: 4495, // $44.95
  blanket: 1795,   // $17.95
  pillow: 2495     // $24.95
} as const;

export const BAG_PRICE = 5500; // $55.00 per bag 