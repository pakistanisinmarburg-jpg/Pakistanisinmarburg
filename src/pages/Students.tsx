import { Home, FileText, Users, BookOpen, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import studentsImage from "@/assets/students-hero.jpg";
import psaLogo from "@/assets/logos/psa-marburg.png";
import psaLogoMain from "@/assets/psa-logo.jpg";
import { Link } from "react-router-dom";
import { useContent } from "@/hooks/useSiteContent";
const Students = () => {
  const t = useContent();
  const services = [{
    icon: Home,
    title: "Housing Support",
    description: "Help finding accommodation through Studentenwerk, WG-Gesucht, and local listings. Tips on rental contracts and deposits."
  }, {
    icon: FileText,
    title: "Registration Guidance",
    description: "Step-by-step help with Anmeldung at Rathaus, health insurance enrollment, and bank account opening."
  }, {
    icon: Users,
    title: "Mentorship Program",
    description: "Connect with senior Pakistani students who can guide you through your first semester and beyond."
  }, {
    icon: BookOpen,
    title: "Study Resources",
    description: "Access to study groups, course materials sharing, and academic support networks."
  }, {
    icon: Calendar,
    title: "Student Events",
    description: "Regular meetups, sports activities, cultural celebrations, and networking opportunities."
  }, {
    icon: MapPin,
    title: "Campus Orientation",
    description: "Guided tours of campus, library orientation, and introduction to student facilities and services."
  }];
  return <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero title={t("students.hero.title")} subtitle={t("students.hero.subtitle")} image={studentsImage}>
          <img src={psaLogoMain} alt="Pakistan Student Association Marburg" className="w-64 h-auto rounded-lg shadow-lg" />
        </Hero>

        {/* Welcome Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Welcome Pakistani Students!</h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                Starting university in a new country can be challenging, but you're not alone! The Pakistani 
                Student Association Marburg is here to help you settle in, succeed academically, and feel at 
                home in Marburg.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                From finding accommodation to connecting with mentors and enjoying campus life, we've got 
                your back every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">How We Help</h2>
              <p className="text-muted-foreground">Comprehensive support services for Pakistani students</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
              const Icon = service.icon;
              return <Card key={index}>
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>;
            })}
            </div>
          </div>
        </section>

        {/* Welcome Pack */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Essential Information for New Students</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>First Steps After Arrival</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-primary">•</span>
                      <div>
                        <h4 className="font-semibold text-foreground">Register at Rathaus (Anmeldung)</h4>
                        <p className="text-sm text-muted-foreground">Within 14 days of arrival. Bring rental contract and passport.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary">•</span>
                      <div>
                        <h4 className="font-semibold text-foreground">Get Health Insurance</h4>
                        <p className="text-sm text-muted-foreground">Required for enrollment. Public insurance (TK, AOK) or private options available.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary">•</span>
                      <div>
                        <h4 className="font-semibold text-foreground">Open Bank Account</h4>
                        <p className="text-sm text-muted-foreground">Sparkasse, Volksbank, or N26/DKB for online banking. Needed for blocked account release.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary">•</span>
                      <div>
                        <h4 className="font-semibold text-foreground">Complete University Enrollment</h4>
                        <p className="text-sm text-muted-foreground">Submit all documents to International Office and get your student ID card.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>University Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-medium text-foreground">International Office</span>
                      <span className="text-sm text-primary">international@uni-marburg.de</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-medium text-foreground">Studentenwerk Housing</span>
                      <span className="text-sm text-primary">housing@studentenwerk-marburg.de</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm font-medium text-foreground">Language Courses</span>
                      <span className="text-sm text-primary">sprachenzentrum@uni-marburg.de</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium text-foreground">Student Advisory Service</span>
                      <span className="text-sm text-primary">studienberatung@uni-marburg.de</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Improve your German through university language courses and language cafés. 
                      English is widely spoken on campus, but German skills help with daily life and integration.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Need Help Getting Started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Our student mentors and community members are here to help you navigate your first weeks in Marburg. 
              Don't hesitate to reach out!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/mentor-request">Request a Mentor</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/30">
                <Link to="/events">Join Student Events</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Students;