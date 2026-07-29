import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-community.jpg";
import { useContent } from "@/hooks/useSiteContent";
import { Reveal } from "@/components/common/Reveal";
import { glassPanelSolid } from "@/lib/glass";

const memberSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  mobileNo: z.string().trim().min(1, "Mobile number is required").max(20, "Mobile number must be less than 20 characters"),
  address: z.string().trim().min(1, "Address is required").max(500, "Address must be less than 500 characters"),
  gdprConsent: z.boolean().refine((val) => val === true, { message: "You must accept the GDPR consent" }),
});

const Join = () => {
  const t = useContent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    email: "",
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const validationResult = memberSchema.safeParse(formData);
      
      if (!validationResult.success) {
        const firstError = validationResult.error.issues[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Save to database
      const { error: dbError } = await supabase
        .from("members")
        .insert([
          {
            first_name: validationResult.data.firstName,
            last_name: validationResult.data.lastName,
            address: validationResult.data.address,
            mobile_no: validationResult.data.mobileNo,
            email: validationResult.data.email,
            gdpr_consent: validationResult.data.gdprConsent,
            user_id: null, // Public registration without authentication
          },
        ]);

      if (dbError) throw dbError;

      // (n8n webhook removed — event registrations now write to Google Sheets via sheets-append)

      // Send email notification
      await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "member",
          data: validationResult.data,
        },
      });

      toast({
        title: "Success!",
        description: "You have been registered as a member. We'll keep you updated on events and news.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        mobileNo: "",
        email: "",
        gdprConsent: false,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      const msg = error?.code === '23505'
        ? 'This email is already registered.'
        : 'Failed to submit registration. Please try again.';
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero
          title={t("join.hero.title")}
          subtitle={t("join.hero.subtitle")}
          image={heroImage}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Reveal className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-foreground">Member Registration</h2>
                <p className="text-muted-foreground">
                  Fill out the form below to become a member and receive event reminders and important community information.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={`space-y-6 rounded-2xl p-6 ${glassPanelSolid}`}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street, City, Postal Code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobileNo">Mobile Number *</Label>
                  <Input
                    id="mobileNo"
                    type="tel"
                    required
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, gdprConsent: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <Label
                    htmlFor="gdprConsent"
                    className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                  >
                    I consent to the processing of my personal data in accordance with GDPR. My data will be used solely 
                    to send event reminders and important community information. I can withdraw my consent at any time by 
                    contacting pakistanisinmarburg@gmail.com. *
                  </Label>
                </div>

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register as Member"}
                  </Button>
                </motion.div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Join;
