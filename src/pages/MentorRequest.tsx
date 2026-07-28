import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import studentsHero from "@/assets/students-hero.jpg";
import { useContent } from "@/hooks/useSiteContent";

const mentorRequestSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  mobileNo: z.string().trim().max(20, "Mobile number must be less than 20 characters").optional().or(z.literal("")),
  areaOfHelp: z.string().trim().min(1, "Please specify what you need help with").max(500, "Area of help must be less than 500 characters"),
  message: z.string().trim().max(2000, "Message must be less than 2000 characters").optional().or(z.literal("")),
});

const MentorRequest = () => {
  const t = useContent();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    areaOfHelp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const validationResult = mentorRequestSchema.safeParse(formData);
      
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

      const { error } = await supabase
        .from("mentor_requests")
        .insert([
          {
            first_name: validationResult.data.firstName,
            last_name: validationResult.data.lastName,
            email: validationResult.data.email,
            mobile_no: validationResult.data.mobileNo || null,
            area_of_help: validationResult.data.areaOfHelp,
            message: validationResult.data.message || null,
          },
        ]);

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "mentor",
          data: validationResult.data,
        },
      });

      toast({
        title: "Request Submitted!",
        description: "We've received your mentor request. A mentor will contact you soon.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNo: "",
        areaOfHelp: "",
        message: "",
      });

      setTimeout(() => navigate("/students"), 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
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
          title={t("mentor.hero.title")}
          subtitle={t("mentor.hero.subtitle")}
          image={studentsHero}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-foreground">Mentor Request Form</h2>
                <p className="text-muted-foreground">
                  Fill out this form and we'll connect you with a mentor who can help you settle in Marburg.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border bg-card p-6">
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

                <div className="space-y-2">
                  <Label htmlFor="mobileNo">Mobile Number</Label>
                  <Input
                    id="mobileNo"
                    type="tel"
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="areaOfHelp">What do you need help with? *</Label>
                  <Input
                    id="areaOfHelp"
                    type="text"
                    required
                    value={formData.areaOfHelp}
                    onChange={(e) => setFormData({ ...formData, areaOfHelp: e.target.value })}
                    placeholder="e.g., Housing, Registration, Academic guidance"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your situation and how we can help..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MentorRequest;
