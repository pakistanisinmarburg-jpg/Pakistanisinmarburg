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