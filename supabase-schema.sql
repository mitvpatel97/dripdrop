-- DripDrop Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'dark',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Clothing items table
CREATE TABLE public.clothing_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  brand TEXT,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  image_url TEXT,
  link_url TEXT NOT NULL,
  category TEXT,
  position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.clothing_items ENABLE ROW LEVEL SECURITY;

-- Clothing items policies
CREATE POLICY "Active clothing items are viewable by everyone"
  ON public.clothing_items FOR SELECT
  USING (is_active = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert own clothing items"
  ON public.clothing_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clothing items"
  ON public.clothing_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clothing items"
  ON public.clothing_items FOR DELETE
  USING (auth.uid() = user_id);

-- Function to increment clicks (used for tracking)
CREATE OR REPLACE FUNCTION public.increment_clicks(item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.clothing_items
  SET clicks = clicks + 1
  WHERE id = item_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create index for faster username lookups
CREATE INDEX idx_users_username ON public.users(username);

-- Create index for faster item queries
CREATE INDEX idx_clothing_items_user_id ON public.clothing_items(user_id);
CREATE INDEX idx_clothing_items_position ON public.clothing_items(user_id, position);
