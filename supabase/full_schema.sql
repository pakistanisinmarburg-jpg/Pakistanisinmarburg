-- =====================================================================
-- Pakistani Community Marburg -- Consolidated Supabase Schema
-- =====================================================================
-- This file merges every migration in supabase/migrations/ (in order)
-- into one script you can paste into a BRAND NEW Supabase project's
-- SQL Editor (Dashboard -> SQL Editor -> New query) to recreate the
-- entire backend: tables, RLS policies, functions, triggers, and the
-- storage bucket used for the media library.
--
-- Run this ONCE, top to bottom, right after creating your new project.
-- It is idempotent-ish (uses IF EXISTS/IF NOT EXISTS/ON CONFLICT where
-- possible) but is meant to run against an empty database.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Migration: 20251027183143_3cfda485-0dc8-4919-bf62-aaa8bb450756.sql
-- ---------------------------------------------------------------------
-- Create members table
CREATE TABLE public.members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  address text NOT NULL,
  mobile_no text NOT NULL,
  email text NOT NULL UNIQUE,
  gdpr_consent boolean NOT NULL DEFAULT false,
  gdpr_consent_date timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view members
CREATE POLICY "Authenticated users can view members"
ON public.members
FOR SELECT
TO authenticated
USING (true);

-- Create policy for anyone to insert (for registration)
CREATE POLICY "Anyone can register as member"
ON public.members
FOR INSERT
TO anon
WITH CHECK (gdpr_consent = true);

-- Create volunteers table
CREATE TABLE public.volunteers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  mobile_no text NOT NULL,
  address text,
  message text,
  gdpr_consent boolean NOT NULL DEFAULT false,
  gdpr_consent_date timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view volunteers
CREATE POLICY "Authenticated users can view volunteers"
ON public.volunteers
FOR SELECT
TO authenticated
USING (true);

-- Create policy for anyone to sign up as volunteer
CREATE POLICY "Anyone can sign up as volunteer"
ON public.volunteers
FOR INSERT
TO anon
WITH CHECK (gdpr_consent = true);

-- Create mentor requests table
CREATE TABLE public.mentor_requests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  mobile_no text,
  area_of_help text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mentor_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to request a mentor
CREATE POLICY "Anyone can request a mentor"
ON public.mentor_requests
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for authenticated users to view mentor requests
CREATE POLICY "Authenticated users can view mentor requests"
ON public.mentor_requests
FOR SELECT
TO authenticated
USING (true);

-- ---------------------------------------------------------------------
-- Migration: 20251027191634_64268ac9-ea61-4a53-abc2-0778509aa192.sql
-- ---------------------------------------------------------------------
-- Add user_id column to members table to link with authenticated users
ALTER TABLE public.members 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Make user_id NOT NULL after adding it (existing rows will need to be handled separately)
-- For now, we'll allow NULL for existing data but new inserts must have user_id
ALTER TABLE public.members 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view members" ON public.members;

-- Create new policy: Users can only view their own member record
CREATE POLICY "Users can view own member record" 
ON public.members 
FOR SELECT 
USING (auth.uid() = user_id);

-- Update INSERT policy to automatically set user_id
DROP POLICY IF EXISTS "Anyone can register as member" ON public.members;

CREATE POLICY "Users can register as member" 
ON public.members 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND gdpr_consent = true
);

-- Allow users to update their own member record
CREATE POLICY "Users can update own member record" 
ON public.members 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_members_user_id ON public.members(user_id);

-- Create function to help with admin access (if needed in future)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- This is a placeholder. To enable admin access, create a user_roles table
  -- For now, returns false. Admins should be implemented via user_roles table
  SELECT false;
$$;

-- Optional: Add admin policy (currently inactive until admin roles are set up)
CREATE POLICY "Admins can view all members" 
ON public.members 
FOR SELECT 
USING (public.is_admin());

-- Optional: Add admin update policy
CREATE POLICY "Admins can update all members" 
ON public.members 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Optional: Add admin delete policy
CREATE POLICY "Admins can delete members" 
ON public.members 
FOR DELETE 
USING (public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20251027192436_cd9412fa-e29c-4792-abcf-0f47b66d6854.sql
-- ---------------------------------------------------------------------
-- Add user_id column to volunteers table to link with authenticated users
ALTER TABLE public.volunteers 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Set default for user_id
ALTER TABLE public.volunteers 
ALTER COLUMN user_id SET DEFAULT auth.uid();

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view volunteers" ON public.volunteers;

-- Create new policy: Users can only view their own volunteer record
CREATE POLICY "Users can view own volunteer record" 
ON public.volunteers 
FOR SELECT 
USING (auth.uid() = user_id);

-- Update INSERT policy to automatically set user_id
DROP POLICY IF EXISTS "Anyone can sign up as volunteer" ON public.volunteers;

CREATE POLICY "Users can register as volunteer" 
ON public.volunteers 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND gdpr_consent = true
);

-- Allow users to update their own volunteer record
CREATE POLICY "Users can update own volunteer record" 
ON public.volunteers 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create index for better performance on user_id lookups
CREATE INDEX IF NOT EXISTS idx_volunteers_user_id ON public.volunteers(user_id);

-- Add admin policy (uses existing is_admin function)
CREATE POLICY "Admins can view all volunteers" 
ON public.volunteers 
FOR SELECT 
USING (public.is_admin());

-- Add admin update policy
CREATE POLICY "Admins can update all volunteers" 
ON public.volunteers 
FOR UPDATE 
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add admin delete policy
CREATE POLICY "Admins can delete volunteers" 
ON public.volunteers 
FOR DELETE 
USING (public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20251027193033_bd1a84e8-2ab4-4eb2-8b12-7dd9a7f0df32.sql
-- ---------------------------------------------------------------------
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Update is_admin function to use the new role system
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- Fix mentor_requests SELECT policy - restrict to admins only
DROP POLICY IF EXISTS "Authenticated users can view mentor requests" ON public.mentor_requests;

CREATE POLICY "Admins can view all mentor requests"
ON public.mentor_requests
FOR SELECT
USING (public.is_admin());

-- Add UPDATE policy for mentor_requests
CREATE POLICY "Admins can update mentor requests"
ON public.mentor_requests
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add DELETE policy for mentor_requests
CREATE POLICY "Admins can delete mentor requests"
ON public.mentor_requests
FOR DELETE
USING (public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20251027193059_a4e8a93b-da67-46e6-b7d8-aa0d28f522b1.sql
-- ---------------------------------------------------------------------
-- Add RLS policies for user_roles table
-- Only admins can view all roles
CREATE POLICY "Admins can view all user roles"
ON public.user_roles
FOR SELECT
USING (public.is_admin());

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Only admins can insert roles
CREATE POLICY "Admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.is_admin());

-- Only admins can update roles
CREATE POLICY "Admins can update user roles"
ON public.user_roles
FOR UPDATE
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Only admins can delete roles
CREATE POLICY "Admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20251028142406_99fe1c0b-ae29-4974-a23b-6502dd31dcd4.sql
-- ---------------------------------------------------------------------
-- Drop the existing restrictive policy for member registration
DROP POLICY IF EXISTS "Users can register as member" ON public.members;

-- Create a new policy that allows anyone to register as a member with GDPR consent
CREATE POLICY "Anyone can register as member with GDPR consent"
ON public.members
FOR INSERT
WITH CHECK (gdpr_consent = true);

-- Update the user_id column to be nullable and remove the default auth.uid()
-- since this is a public registration form without authentication
ALTER TABLE public.members 
ALTER COLUMN user_id DROP DEFAULT;

-- ---------------------------------------------------------------------
-- Migration: 20260414202005_f5fd387d-a8f1-4a6b-a002-3b935ad7d945.sql
-- ---------------------------------------------------------------------

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT NOT NULL,
  food_to_bring TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone can register for events
CREATE POLICY "Anyone can register for events"
ON public.event_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anyone can view registrations (for count display)
CREATE POLICY "Anyone can view registration counts"
ON public.event_registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can update registrations
CREATE POLICY "Admins can update registrations"
ON public.event_registrations
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins can delete registrations
CREATE POLICY "Admins can delete registrations"
ON public.event_registrations
FOR DELETE
TO authenticated
USING (is_admin());

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_registrations;

-- ---------------------------------------------------------------------
-- Migration: 20260415063015_c6cdeb2a-4d5e-4589-aa5f-b66ff5fe839c.sql
-- ---------------------------------------------------------------------
-- Remove the overly permissive SELECT policy
DROP POLICY "Anyone can view registration counts" ON public.event_registrations;

-- Add admin-only full SELECT access
CREATE POLICY "Admins can view all registrations"
ON public.event_registrations FOR SELECT
TO authenticated
USING (is_admin());

-- Create a secure function to return only counts
CREATE OR REPLACE FUNCTION public.get_event_registration_count(p_event_id text)
RETURNS int
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::int FROM event_registrations WHERE event_id = p_event_id;
$$;

-- Remove from realtime publication to prevent PII broadcast
ALTER PUBLICATION supabase_realtime DROP TABLE public.event_registrations;

-- ---------------------------------------------------------------------
-- Migration: 20260519152153_e49e189b-699b-4453-98b7-a833a4b17f25.sql
-- ---------------------------------------------------------------------

ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS number_of_guests integer,
  ADD COLUMN IF NOT EXISTS dietary_restrictions text,
  ADD COLUMN IF NOT EXISTS contribution text;

ALTER TABLE public.event_registrations
  ALTER COLUMN last_name DROP NOT NULL,
  ALTER COLUMN nationality DROP NOT NULL,
  ALTER COLUMN phone DROP NOT NULL;

-- ---------------------------------------------------------------------
-- Migration: 20260523121917_fe9e3e59-5ca0-42af-8484-66ace1c85e9e.sql
-- ---------------------------------------------------------------------
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;

-- ---------------------------------------------------------------------
-- Migration: 20260615164938_a1565413-3cb0-498a-933b-9d8391369da9.sql
-- ---------------------------------------------------------------------
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS photo_consent boolean NOT NULL DEFAULT false;

-- ---------------------------------------------------------------------
-- Migration: 20260728112548_30177c1d-f7c4-441f-b0b0-a38508110150.sql
-- ---------------------------------------------------------------------
-- EVENTS
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  date text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  long_description text,
  poster_image text,
  color text NOT NULL DEFAULT '#2E7D32',
  attendees integer NOT NULL DEFAULT 0,
  registration_offset integer NOT NULL DEFAULT 0,
  webhook_type text,
  featured boolean NOT NULL DEFAULT false,
  show_on_home boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published events are public" ON public.events FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());
CREATE POLICY "Admins insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update events" ON public.events FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete events" ON public.events FOR DELETE TO authenticated USING (public.is_admin());

-- MEDIA
CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text,
  type text NOT NULL DEFAULT 'image',
  url text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published media is public" ON public.media_items FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());
CREATE POLICY "Admins insert media" ON public.media_items FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update media" ON public.media_items FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete media" ON public.media_items FOR DELETE TO authenticated USING (public.is_admin());

-- SITE CONTENT
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.is_admin());

-- updated_at triggers
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER media_items_updated_at BEFORE UPDATE ON public.media_items FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- allow admins to read their own role check helper
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ---------------------------------------------------------------------
-- Migration: 20260728112620_b2216833-1a10-4d40-af7b-c228ee1aff26.sql
-- ---------------------------------------------------------------------
CREATE POLICY "Anyone can read site media" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'site-media');
CREATE POLICY "Admins can upload site media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-media' AND public.is_admin());
CREATE POLICY "Admins can update site media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-media' AND public.is_admin()) WITH CHECK (bucket_id = 'site-media' AND public.is_admin());
CREATE POLICY "Admins can delete site media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-media' AND public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20260728113202_a75267f7-e4c5-4eda-aee2-d774d3e68242.sql
-- ---------------------------------------------------------------------
DROP POLICY "Published events are public" ON public.events;
CREATE POLICY "Anon can view published events" ON public.events FOR SELECT TO anon USING (published = true);
CREATE POLICY "Users can view published events" ON public.events FOR SELECT TO authenticated USING (published = true OR public.is_admin());

DROP POLICY "Published media is public" ON public.media_items;
CREATE POLICY "Anon can view published media" ON public.media_items FOR SELECT TO anon USING (published = true);
CREATE POLICY "Users can view published media" ON public.media_items FOR SELECT TO authenticated USING (published = true OR public.is_admin());

-- ---------------------------------------------------------------------
-- Migration: 20260728113236_18750f10-5aea-4c6a-878c-ca49d42583e0.sql
-- ---------------------------------------------------------------------
ALTER TABLE public.events ADD COLUMN show_on_events boolean NOT NULL DEFAULT true;
UPDATE public.events SET show_on_events = false WHERE slug IN ('pak-street-food-may-2026','national-day-2026');

-- =====================================================================
-- Storage bucket for the site media library (Gallery / MediaPicker)
-- Not part of the original migrations (Lovable created this via the
-- dashboard), so it's added explicitly here. Private bucket; access is
-- fully governed by the storage.objects RLS policies created above.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', false)
on conflict (id) do nothing;

-- =====================================================================
-- First admin user
-- =====================================================================
-- user_roles has no seed data on purpose -- there is no admin until you
-- create one. Steps:
--   1. Sign up a normal account through the deployed app (Sign Up /
--      Login page) using the email you want to administer the site with.
--   2. Find that user's id:
--        select id, email from auth.users order by created_at desc;
--   3. Grant the admin role (replace the UUID below):
--        insert into public.user_roles (user_id, role)
--        values ('00000000-0000-0000-0000-000000000000', 'admin');
--   4. Log out and back in on the site; the Admin dashboard should now
--      be reachable for that account.
-- =====================================================================
