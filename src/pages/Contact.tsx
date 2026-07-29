import { useState } from "react";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import { useContent } from "@/hooks/useSiteContent";
import { Reveal, RevealItem, RevealStagger } from "@/components/common/Reveal";
import { glassCard } from "@/lib/glass";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
  consent: z.boolean().refine((val) => val === true, { message: "You must accept the consent" }),
});

const Contact = () => {
  const t = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: false
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate input
      const validationResult = contactSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        return;
      }

      // Store the message in Supabase so it shows up in the admin dashboard
      const { name, email, message, consent } = validationResult.data;
      const { error: insertError } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
        consent,
      });

      if (insertError) {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Best-effort email notification - the message is already saved above,
      // so don't fail the submission if only the email step has trouble.
      try {
        await supabase.functions.invoke("send-form-notification", {
          body: {
            formType: "contact",
            data: validationResult.data,
          },
        });
      } catch {
        // Ignore - message is already stored in contact_messages.
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "", consent: false });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero
          title={t("contact.hero.title")}
          subtitle={t("contact.hero.subtitle")}
          image={heroImage}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <RevealStagger className="space-y-6">
                <RevealItem><Card className={glassCard}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">pakistanisinmarburg@gmail.com</p>
                    <p className="mt-2 text-sm text-muted-foreground">We typically respond within 24-48 hours</p>
                  </CardContent>
                </Card></RevealItem>

                <RevealItem><Card className={glassCard}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">+49 152 16164830</p>
                    <p className="mt-2 text-sm text-muted-foreground">Monday - Friday, 10:00 - 18:00</p>
                  </CardContent>
                </Card></RevealItem>

                <RevealItem><Card className={glassCard}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Bahnhofstrasse 36, 35037 Marburg</p>
                    <p className="mt-2 text-sm text-muted-foreground">Community events held at various venues</p>
                  </CardContent>
                </Card></RevealItem>

                <RevealItem><Card className={glassCard}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Emergency Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">For urgent assistance, please call our emergency hotline or contact your assigned mentor.</p>
                  </CardContent>
                </Card></RevealItem>
              </RevealStagger>

              {/* Contact Form */}
              <Reveal className="lg:col-span-2" delay={0.1}>
                <Card className={glassCard}>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          className="min-h-[150px]"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="consent"
                            checked={formData.consent}
                            onCheckedChange={(checked) => 
                              setFormData({ ...formData, consent: checked as boolean })
                            }
                          />
                          <Label 
                            htmlFor="consent" 
                            className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                          >
                            I consent to Pakistani Community Marburg storing and using my submitted personal 
                            data (name, email) for the purpose of community communications, event invitations, 
                            and essential membership services. I understand I can withdraw consent at any time 
                            and request deletion of my data. *
                          </Label>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="w-full" size="lg">
                          Send Message
                        </Button>
                      </motion.div>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
