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