ALTER TABLE public.events ADD COLUMN show_on_events boolean NOT NULL DEFAULT true;
UPDATE public.events SET show_on_events = false WHERE slug IN ('pak-street-food-may-2026','national-day-2026');