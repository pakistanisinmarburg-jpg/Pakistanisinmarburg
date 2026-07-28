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