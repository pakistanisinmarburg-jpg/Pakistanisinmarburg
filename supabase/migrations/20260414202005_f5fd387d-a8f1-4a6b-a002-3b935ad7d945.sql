
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
