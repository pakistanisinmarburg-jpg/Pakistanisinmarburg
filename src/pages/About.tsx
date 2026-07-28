import { Target, Users, Heart, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import uniMarburg from "@/assets/logos/uni-marburg-official.png";
import studentenwerk from "@/assets/logos/studentenwerk-official.png";
import stadtMarburg from "@/assets/logos/stadt-marburg-official.png";
import auslanderbeirat from "@/assets/logos/auslanderbeirat.png";
import marburgLiebe from "@/assets/logos/marburg-liebe.png";
import internationalOffice from "@/assets/logos/international-office.png";
import { useContent } from "@/hooks/useSiteContent";

const About = () => {
  const t = useContent();
  const objectives = [
    {
      icon: Users,
      title: "Community Building",
      description: "Create a supportive network for Pakistani families, students, and professionals in Marburg through regular gatherings and social events."
    },
    {
      icon: Heart,
      title: "Cultural Representation",
      description: "Celebrate and promote Pakistani culture, traditions, and values while fostering integration into German society."
    },
    {
      icon: Target,
      title: "Member Support",
      description: "Provide practical assistance with housing, registration, language learning, and navigating life in Marburg."
    },
    {
      icon: Globe,
      title: "Bridge Building",
      description: "Foster understanding and collaboration between the Pakistani community and local German institutions and organizations."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero
          title={t("about.hero.title")}
          subtitle={t("about.hero.subtitle")}
          image={heroImage}
        />

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                The Pakistani community in Marburg is dedicated to supporting and connecting Pakistanis living in this beautiful city. We help newcomers navigate essential bureaucratic steps, settle comfortably, and integrate into Marburg's vibrant life—while providing a welcoming network of fellow Pakistanis.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                We bring our community together through regular gatherings, cultural festivals, and social events, creating a strong sense of belonging and shared identity.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                At the same time, we proudly represent Pakistani culture, art, and traditions within Marburg's diverse international landscape, fostering friendship, understanding, and cultural exchange.
              </p>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">Our Objectives</h2>
              <p className="text-muted-foreground">What we aim to achieve together</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle>{objective.title}</CardTitle>
                      <CardDescription>{objective.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">Team</h2>
              <p className="text-muted-foreground">Meet the people making it happen</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Zoraiz Fazal</CardTitle>
                  <CardDescription>Member</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">TBA</CardTitle>
                  <CardDescription>Coordinator</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">TBA</CardTitle>
                  <CardDescription>Finance</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">TBA</CardTitle>
                  <CardDescription>PR & Social Media</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">Partners</h2>
              <p className="text-muted-foreground">Working together to serve our community</p>
            </div>

            {/* Partner Logos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center rounded-lg bg-card p-6 shadow-sm">
                <img src={stadtMarburg} alt="Stadt Marburg" className="w-full h-auto object-contain" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-card p-6 shadow-sm">
                <img src={auslanderbeirat} alt="Ausländerbeirat" className="w-full h-auto object-contain" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-card p-6 shadow-sm">
                <img src={uniMarburg} alt="Philipps University Marburg" className="w-full h-auto object-contain" />
              </div>
              <div className="flex items-center justify-center rounded-lg bg-card p-6 shadow-sm">
                <img src={studentenwerk} alt="Studentenwerk Marburg" className="w-full h-auto object-contain" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
