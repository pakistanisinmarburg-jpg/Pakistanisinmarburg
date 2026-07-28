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