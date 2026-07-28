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