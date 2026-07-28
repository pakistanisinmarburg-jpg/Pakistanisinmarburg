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