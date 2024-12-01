export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          address: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          address: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          address?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string
          total_amount: number
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          order_date: string
        }
        Insert: {
          id?: string
          customer_id: string
          total_amount: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          order_date?: string
        }
        Update: {
          id?: string
          customer_id?: string
          total_amount?: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          order_date?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
    }
  }
}