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