import { Calendar, MapPin, Users, PartyPopper, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/hooks/useBookmarks";
import { highlightText } from "@/lib/highlightText";
import { glassCard } from "@/lib/glass";
import { cn } from "@/lib/utils";
import { z } from "zod";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Phone number is required").max(20),
  numberOfGuests: z.coerce.number().int().min(1, "At least 1 guest").max(50),
  dietaryRestrictions: z.enum(["Vegetarian", "Vegan", "None"]),
  
  photoConsent: z.boolean(),
});

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  color: string;
  attendees?: number;
  featured?: boolean;
  longDescription?: string;
  webhookType?: string;
  registrationOffset?: number;
  posterImage?: string;
  searchQuery?: string;
  index?: number;
}

const EventCard = ({
  id,
  title,
  date,
  location,
  description,
  color,
  attendees,
  featured,
  longDescription,
  webhookType,
  registrationOffset = 0,
  posterImage,
  searchQuery = "",
  index = 0,
}: EventCardProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);
  const { toast } = useToast();
  const { isSaved, toggle: toggleSaved } = useBookmarks("events");
  const saved = isSaved(id);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    numberOfGuests: "1",
    dietaryRestrictions: "None" as "Vegetarian" | "Vegan" | "None",
    
    photoConsent: false,
  });

  const fetchCount = async () => {
    const { data } = await supabase.rpc("get_event_registration_count", { p_event_id: id });
    setRegistrationCount(data || 0);
  };

  useEffect(() => {
    fetchCount();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = registrationSchema.safeParse(form);
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast({ title: "Validation Error", description: firstError || "Please check your input", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const [firstName, ...rest] = parsed.data.fullName.split(" ");
      const lastName = rest.join(" ") || null;

      const { error } = await supabase.from("event_registrations").insert({
        event_id: id,
        first_name: firstName,
        last_name: lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        number_of_guests: parsed.data.numberOfGuests,
        dietary_restrictions: parsed.data.dietaryRestrictions,
        photo_consent: parsed.data.photoConsent,
      });
      if (error) throw error;

      // Append registration to the connected Google Sheet via edge function
      supabase.functions.invoke("sheets-append", {
        body: {
          eventId: id,
          eventTitle: title,
          eventDate: date,
          eventLocation: location,
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          phone: parsed.data.phone,
          numberOfGuests: parsed.data.numberOfGuests,
          dietaryRestrictions: parsed.data.dietaryRestrictions,
          photoConsent: parsed.data.photoConsent ? "Yes" : "No",
        },
      }).catch(() => {});

      supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "event-registration",
          data: {
            firstName,
            lastName: lastName || "",
            email: parsed.data.email,
            phone: parsed.data.phone,
            nationality: "-",
            foodToBring: `${parsed.data.numberOfGuests} guest(s) • ${parsed.data.dietaryRestrictions} • Photo consent: ${parsed.data.photoConsent ? "Yes" : "No"}`,
            eventTitle: title,
            eventDate: date,
            eventLocation: location,
          },
        },
      }).catch(() => {});

      toast({ title: "Registered!", description: `You're registered for ${title}` });
      setForm({ fullName: "", email: "", phone: "", numberOfGuests: "1", dietaryRestrictions: "None", photoConsent: false });
      setOpen(false);
      fetchCount();
    } catch {
      toast({ title: "Error", description: "Registration failed. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index, 12) * 0.05, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className={cn("group overflow-hidden border-t-4", glassCard)} style={{ borderTopColor: color }}>
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="line-clamp-2 text-xl">{highlightText(title, searchQuery)}</CardTitle>
            <div className="flex shrink-0 items-center gap-1">
              {featured && <Badge style={{ backgroundColor: color, color: "#fff" }}>Featured</Badge>}
              <motion.button
                type="button"
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleSaved(id)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved events" : "Save this event"}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent-foreground"
              >
                <Heart className={cn("h-4 w-4 transition-colors", saved && "fill-destructive text-destructive")} />
              </motion.button>
            </div>
          </div>
          <CardDescription className="line-clamp-2">{highlightText(description, searchQuery)}</CardDescription>
        </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" style={{ color }} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" style={{ color }} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" style={{ color }} />
            <span className="font-semibold">{registrationCount + registrationOffset} registered</span>
            {attendees && <span className="text-xs">({attendees} expected)</span>}
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" style={{ backgroundColor: color, color: "#fff" }}>
              <PartyPopper className="mr-2 h-4 w-4" /> Register Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Register for {title}</DialogTitle>
            </DialogHeader>
            {posterImage && (
              <div className="overflow-hidden rounded-md border border-border">
                <img src={posterImage} alt={`${title} poster`} className="h-auto w-full" loading="lazy" />
              </div>
            )}
            {longDescription && (
              <div className="rounded-md bg-muted/40 p-3 text-xs text-muted-foreground whitespace-pre-line border-l-4" style={{ borderLeftColor: color }}>
                {longDescription}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numberOfGuests">Number of Guests *</Label>
                <Input id="numberOfGuests" type="number" min={1} max={50} value={form.numberOfGuests} onChange={(e) => setForm({ ...form, numberOfGuests: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Dietary Restrictions *</Label>
                <Select value={form.dietaryRestrictions} onValueChange={(v) => setForm({ ...form, dietaryRestrictions: v as typeof form.dietaryRestrictions })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="Vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-2 rounded-md border border-border p-3">
                <Checkbox
                  id="photoConsent"
                  checked={form.photoConsent}
                  onCheckedChange={(c) => setForm({ ...form, photoConsent: c === true })}
                />
                <Label htmlFor="photoConsent" className="text-sm font-normal leading-snug cursor-pointer">
                  Photo consent — I agree that photos taken at this event may be used by Pakistanis in Marburg for community and promotional purposes.
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting} style={{ backgroundColor: color, color: "#fff" }}>
                {isSubmitting ? "Registering..." : "Confirm Registration"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard;
