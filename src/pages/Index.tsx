import { Link } from "react-router-dom";
import { Calendar, Users, GraduationCap, Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePublicEvents, renderEventCard } from "@/pages/Events";
import { useContent } from "@/hooks/useSiteContent";
import { Reveal, RevealItem, RevealStagger } from "@/components/common/Reveal";
import { glassCard } from "@/lib/glass";
import AnimatedHero from "@/components/home/AnimatedHero";
import TiltCard from "@/components/home/TiltCard";
import LogoMarquee from "@/components/home/LogoMarquee";
import ScrollProgressBar from "@/components/home/ScrollProgressBar";

import marburgOldCity from "@/assets/marburg-oldcity.jpg";

const features = [
  {
    icon: Users,
    title: "Community Support",
    description: "Connect with fellow Pakistanis in Marburg for mutual support and friendship",
  },
  {
    icon: GraduationCap,
    title: "Student Services",
    description: "Housing help, mentorship, and orientation for Pakistani students at Uni Marburg",
  },
  {
    icon: Calendar,
    title: "Cultural Events",
    description: "Celebrate National Day, Eid, cricket tournaments, and cultural evenings together",
  },
  {
    icon: Heart,
    title: "New Arrival Help",
    description: "Guidance on registration, housing, language courses, and settling in Marburg",
  },
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <Reveal className="mb-10 text-center">
    <h2 className="relative mb-2 inline-block text-3xl font-bold text-foreground">
      {title}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </h2>
    {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
  </Reveal>
);

const Index = () => {
  const homeEvents = usePublicEvents(true);
  const t = useContent();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgressBar />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <AnimatedHero
          title={t("home.hero.title")}
          subtitle={t("home.hero.subtitle")}
          badge="Welcome to our community"
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
        </AnimatedHero>

        {/* Partner logo marquee */}
        <LogoMarquee />

        {/* Features Section */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <RevealItem key={title}>
                  <TiltCard className="group relative h-full">
                    <Card className={`${glassCard} h-full`}>
                      <CardHeader>
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionHeading title={t("home.events.title")} subtitle={t("home.events.subtitle")} />

            <div className="grid gap-6 md:grid-cols-2">
              {homeEvents.map((event, i) => renderEventCard(event, i))}
            </div>

            <Reveal className="mt-8 text-center">
              <Button asChild size="lg" variant="outline" className="group">
                <Link to="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, hsl(var(--accent) / 0.4), transparent 45%), radial-gradient(circle at 80% 80%, hsl(var(--accent) / 0.3), transparent 45%)",
                "radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.4), transparent 45%), radial-gradient(circle at 20% 70%, hsl(var(--accent) / 0.3), transparent 45%)",
                "radial-gradient(circle at 20% 20%, hsl(var(--accent) / 0.4), transparent 45%), radial-gradient(circle at 80% 80%, hsl(var(--accent) / 0.3), transparent 45%)",
              ],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute text-primary-foreground/30"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ y: [0, -14, 0], opacity: [0.2, 0.5, 0.2], rotate: [0, 15, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.span>
          ))}

          <div className="container relative z-10 mx-auto px-4 text-center">
            <Reveal>
              <h2 className="mb-4 text-3xl font-bold">{t("home.cta.title")}</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
                {t("home.cta.text")}
              </p>
              <motion.div className="inline-block" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button asChild size="lg" variant="secondary" className="shadow-lg shadow-black/10">
                  <Link to="/join">{t("home.cta.button")}</Link>
                </Button>
              </motion.div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
