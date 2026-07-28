import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import heroImage from "@/assets/hero-community.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/hooks/useSiteContent";
import { resolveMediaUrl } from "@/lib/localAssets";

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

export const renderEventCard = (event: PublicEvent) => (
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
  />
);

const Events = () => {
  const events = usePublicEvents();
  const t = useContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero title={t("events.hero.title")} subtitle={t("events.hero.subtitle")} image={heroImage} />

        {/* Events Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-foreground">{t("events.list.title")}</h2>
              <p className="text-muted-foreground">{t("events.list.subtitle")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map(renderEventCard)}
            </div>
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
