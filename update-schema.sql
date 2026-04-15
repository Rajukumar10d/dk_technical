-- Create taglines table
CREATE TABLE IF NOT EXISTS public.taglines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ensure only one active tagline (using a partial unique index)
CREATE UNIQUE INDEX IF NOT EXISTS one_active_tagline ON public.taglines (is_active) WHERE (is_active = true);

-- Add missing columns to videos if any (YouTube intelligence)
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS youtube_id TEXT;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS duration TEXT;

-- Enable RLS on taglines
ALTER TABLE public.taglines ENABLE ROW LEVEL SECURITY;

-- Taglines policies
CREATE POLICY "Anyone can view active taglines" ON public.taglines
  FOR SELECT USING (true);

-- FIX INFINITE RECURSION IN RLS
-- Instead of checking public.users (which has RLS), we use a security definer function.

-- Use a function to check admin status (Security Definer bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop old policies to prevent "already exists" errors
DROP POLICY IF EXISTS "Anyone can view active taglines" ON public.taglines;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Anyone can view videos" ON public.videos;
DROP POLICY IF EXISTS "Admins can manage videos" ON public.videos;
DROP POLICY IF EXISTS "Admins can manage taglines" ON public.taglines;
DROP POLICY IF EXISTS "Admins can update questions" ON public.questions;
DROP POLICY IF EXISTS "Admins can delete questions" ON public.questions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;

-- Re-create policies using the function
CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (is_admin());

CREATE POLICY "Anyone can view videos" ON public.videos
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage videos" ON public.videos
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage taglines" ON public.taglines
  FOR ALL USING (is_admin());

CREATE POLICY "Anyone can view active taglines" ON public.taglines
  FOR SELECT USING (true);

-- Also allow admins to delete/update questions
CREATE POLICY "Admins can update questions" ON public.questions
  FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can delete questions" ON public.questions
  FOR DELETE USING (is_admin());

-- USERS TABLE POLICIES (Fixing registration)
CREATE POLICY "Enable insert for authenticated users only" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Update questions schema if needed
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW());

-- MANUAL ADMIN PROMOTION (UUID discovered: 9e8f53bf-5f86-41dd-8e8c-1e3fcf5033e7)
INSERT INTO public.users (id, email, role) 
VALUES ('9e8f53bf-5f86-41dd-8e8c-1e3fcf5033e7', 'admindktiwari12@gmail.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

