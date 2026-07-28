
ALTER TABLE public.event_registrations
  ADD COLUMN IF NOT EXISTS number_of_guests integer,
  ADD COLUMN IF NOT EXISTS dietary_restrictions text,
  ADD COLUMN IF NOT EXISTS contribution text;

ALTER TABLE public.event_registrations
  ALTER COLUMN last_name DROP NOT NULL,
  ALTER COLUMN nationality DROP NOT NULL,
  ALTER COLUMN phone DROP NOT NULL;
