DROP POLICY "Published events are public" ON public.events;
CREATE POLICY "Anon can view published events" ON public.events FOR SELECT TO anon USING (published = true);
CREATE POLICY "Users can view published events" ON public.events FOR SELECT TO authenticated USING (published = true OR public.is_admin());

DROP POLICY "Published media is public" ON public.media_items;
CREATE POLICY "Anon can view published media" ON public.media_items FOR SELECT TO anon USING (published = true);
CREATE POLICY "Users can view published media" ON public.media_items FOR SELECT TO authenticated USING (published = true OR public.is_admin());