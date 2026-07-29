import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Heart, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import heroImage from "@/assets/hero-community.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/hooks/useSiteContent";
import { resolveMediaUrl } from "@/lib/localAssets";
import { useBookmarks } from "@/hooks/useBookmarks";
import GlassSearchInput from "@/components/common/GlassSearchInput";
import GlassFilterChips, { type FilterChipDef } from "@/components/common/GlassFilterChips";

export interface PublicEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  long_description: string | null;
  poster_image: string | null;
  color: string;
  attendees: number;
  registration_offset: number;
  webhook_type: string | null;
  featured: boolean;
  show_on_events: boolean;
}

export const usePublicEvents = (onlyHome = false) => {
  const [events, setEvents] = useState<PublicEvent[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      let query = supabase.from("events").select("*").eq("published", true).order("sort_order");
      query = onlyHome ? query.eq("show_on_home", true) : query.eq("show_on_events", true);
      const { data } = await query;
      if (active) setEvents((data as PublicEvent[]) ?? []);
    };
    load();
    return () => {
      active = false;
    };
  }, [onlyHome]);

  return events;
};

export const renderEventCard = (event: PublicEvent, index = 0, searchQuery = "") => (
  <EventCard
    key={event.id}
    id={event.slug}
    title={event.title}
    date={event.date}
    location={event.location}
    description={event.description}
    color={event.color}
    attendees={event.attendees}
    featured={event.featured}
    longDescription={event.long_description ?? undefined}
    webhookType={event.webhook_type ?? undefined}
    registrationOffset={event.registration_offset}
    posterImage={event.poster_image ? resolveMediaUrl(event.poster_image) : undefined}
    index={index}
    searchQuery={searchQuery}
  />
);

const ALL_FILTER = "all";
const FEATURED_FILTER = "featured";
const SAVED_FILTER = "saved";

const Events = () => {
  const events = usePublicEvents();
  const t = useContent();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(ALL_FILTER);
  const { savedIds, count: savedCount } = useBookmarks("events");

  const isSearching = query.trim().length >= 2;

  const visibleEvents = useMemo(() => {
    let list = events;
    if (filter === FEATURED_FILTER) list = list.filter((e) => e.featured);
    if (filter === SAVED_FILTER) list = list.filter((e) => savedIds.has(e.slug));
    if (isSearching) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.location.toLowerCase().includes(q),
      );
    }
    return list;
  }, [events, filter, isSearching, query, savedIds]);

  const chips: FilterChipDef[] = [
    { id: ALL_FILTER, label: "All events", icon: CalendarDays },
    { id: FEATURED_FILTER, label: "Featured", icon: Sparkles, count: events.filter((e) => e.featured).length },
    { id: SAVED_FILTER, label: "Saved", icon: Heart, count: savedCount },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero title={t("events.hero.title")} subtitle={t("events.hero.subtitle")} image={heroImage} />

        {/* Events Grid */}
        <section className="relative overflow-hidden py-16">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-24 top-60 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-foreground">{t("events.list.title")}</h2>
              <p className="text-muted-foreground">{t("events.list.subtitle")}</p>
            </div>

            <GlassSearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search events by title, location, or description..."
              resultCount={visibleEvents.length}
              isSearching={isSearching}
            />

            <div className="mt-6">
              <GlassFilterChips chips={chips} selected={filter} onSelect={setFilter} ariaLabel="Filter events" />
            </div>

            <AnimatePresence mode="wait">
              {visibleEvents.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/40 bg-white/40 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span className="rounded-full bg-primary/10 p-3 text-primary">
                    <CalendarDays className="h-6 w-6" />
                  </span>
                  <h3 className="font-medium text-foreground">No events found</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {filter === SAVED_FILTER
                      ? "Tap the heart icon on any event to save it here."
                      : "Try a different search term or filter."}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${filter}-${query}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleEvents.map((event, i) => renderEventCard(event, i, query))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Event Info Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-foreground">{t("events.info.title")}</h2>
              <p className="mb-8 text-lg text-muted-foreground">{t("events.info.text")}</p>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-3 text-xl font-semibold text-foreground">Event Information</h3>
                <p className="mb-4 text-sm text-muted-foreground">{t("events.info.details")}</p>
                <p className="text-sm text-muted-foreground">
                  For event-specific questions, contact us at pakistanisinmarburg@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
