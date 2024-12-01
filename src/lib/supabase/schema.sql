-- Enable Row Level Security
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Create tables
create table customers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null unique,
  phone text not null,
  address text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id) not null,
  total_amount decimal(10,2) not null check (total_amount >= 0),
  status text not null check (status in ('pending', 'processing', 'completed', 'cancelled')) default 'pending',
  order_date timestamp with time zone default timezone('utc'::text, now()) not null
);

create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) not null,
  product_id uuid not null,
  quantity integer not null check (quantity > 0),
  price decimal(10,2) not null check (price >= 0)
);

-- Create indexes
create index customers_email_idx on customers(email);
create index orders_customer_id_idx on orders(customer_id);
create index order_items_order_id_idx on order_items(order_id);

-- RLS Policies
create policy "Users can view own customer data"
  on customers for select
  using (auth.uid() = id);

create policy "Users can update own customer data"
  on customers for update
  using (auth.uid() = id);

create policy "Users can view own orders"
  on orders for select
  using (auth.uid() = customer_id);

create policy "Users can create own orders"
  on orders for insert
  with check (auth.uid() = customer_id);

create policy "Users can view own order items"
  on order_items for select
  using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.customer_id = auth.uid()
    )
  );