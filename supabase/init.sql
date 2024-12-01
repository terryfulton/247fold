-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create addresses table
create table addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  street text not null,
  city text not null,
  state text not null,
  zip text not null,
  delivery_instructions text,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create time_slots table
create table time_slots (
  id uuid default uuid_generate_v4() primary key,
  start_time time not null,
  end_time time not null,
  max_orders integer not null default 4,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  address_id uuid references addresses(id) not null,
  pickup_date date not null,
  pickup_time_slot uuid references time_slots(id) not null,
  status text not null default 'pending',
  bag_count integer not null default 1,
  total_amount integer not null,
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_specialty_items table
create table order_specialty_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  item_type text not null,
  quantity integer not null default 1,
  price_per_item integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default time slots
insert into time_slots (start_time, end_time, max_orders) values
  ('09:00', '11:00', 4),
  ('11:00', '13:00', 4),
  ('13:00', '15:00', 4),
  ('15:00', '17:00', 4),
  ('17:00', '19:00', 4);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_specialty_items enable row level security;

-- Create policies
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can view own addresses"
  on addresses for select
  using ( auth.uid() = user_id );

create policy "Users can insert own addresses"
  on addresses for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own addresses"
  on addresses for update
  using ( auth.uid() = user_id );

create policy "Users can delete own addresses"
  on addresses for delete
  using ( auth.uid() = user_id );

create policy "Users can view own orders"
  on orders for select
  using ( auth.uid() = user_id );

create policy "Users can insert own orders"
  on orders for insert
  with check ( auth.uid() = user_id );

create policy "Users can view own specialty items"
  on order_specialty_items for select
  using ( auth.uid() = (select user_id from orders where id = order_id) );

create policy "Users can insert own specialty items"
  on order_specialty_items for insert
  with check ( auth.uid() = (select user_id from orders where id = order_id) );

-- Create function to handle profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user profile creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 