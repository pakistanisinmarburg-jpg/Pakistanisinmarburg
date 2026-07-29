import { Link } from "react-router-dom";
import { Calendar, Users, GraduationCap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { usePublicEvents, renderEventCard } from "@/pages/Events";
import { useContent } from "@/hooks/useSiteContent";
import { Reveal, RevealItem, RevealStagger } from "@/components/common/Reveal";
import { glassCard } from "@/lib/glass";

import marburgOldCity from "@/assets/marburg-oldcity.jpg";

const Index = () => {
  const homeEvents = usePublicEvents(true);
  const t = useContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          title={t("home.hero.title")}
          subtitle={t("home.hero.subtitle")}
          image={marburgOldCity}
        >
          <Button asChild size="lg">
            <Link to="/join">Join the Community</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/30">
            <Link to="/students">Pakistani Student Association Marburg</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/30">
            <Link to="/events">See Events</Link>
          </Button>
        </Hero>


        {/* Features Section */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <RevealItem><Card className={glassCard}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>
                    Connect with fellow Pakistanis in Marburg for mutual support and friendship
                  </CardDescription>
                </CardHeader>
              </Card></RevealItem>

              <RevealItem><Card className={glassCard}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Student Services</CardTitle>
                  <CardDescription>
                    Housing help, mentorship, and orientation for Pakistani students at Uni Marburg
                  </CardDescription>
                </CardHeader>
              </Card></RevealItem>

              <RevealItem><Card className={glassCard}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Cultural Events</CardTitle>
                  <CardDescription>
                    Celebrate National Day, Eid, cricket tournaments, and cultural evenings together
                  </CardDescription>
                </CardHeader>
              </Card></RevealItem>

              <RevealItem><Card className={glassCard}>
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>New Arrival Help</CardTitle>
                  <CardDescription>
                    Guidance on registration, housing, language courses, and settling in Marburg
                  </CardDescription>
                </CardHeader>
              </Card></RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Reveal className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">{t("home.events.title")}</h2>
              <p className="text-muted-foreground">{t("home.events.subtitle")}</p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2">
              {homeEvents.map((event, i) => renderEventCard(event, i))}
            </div>

            <div className="mt-8 text-center">
              <Button asChild size="lg" variant="outline">
                <Link to="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">{t("home.cta.title")}</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              {t("home.cta.text")}
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/join">{t("home.cta.button")}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
