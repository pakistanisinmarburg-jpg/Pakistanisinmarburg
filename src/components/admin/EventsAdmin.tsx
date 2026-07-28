import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import MediaPicker from "./MediaPicker";

export interface EventRow {
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
  show_on_home: boolean;
  show_on_events: boolean;
  published: boolean;
  sort_order: number;
}

const emptyEvent: Omit<EventRow, "id"> = {
  slug: "",
  title: "",
  date: "",
  location: "",
  description: "",
  long_description: "",
  poster_image: "",
  color: "#2E7D32",
  attendees: 0,
  registration_offset: 0,
  webhook_type: "",
  featured: false,
  show_on_home: false,
  show_on_events: true,
  published: true,
  sort_order: 0,
};

const EventsAdmin = () => {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [editing, setEditing] = useState<(Partial<EventRow> & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase.from("events").select("*").order("sort_order");
    if (error) toast({ title: "Could not load events", variant: "destructive" });
    setEvents((data as EventRow[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      ...emptyEvent,
      ...editing,
      slug: (editing.slug || editing.title || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    };
    if (!payload.title || !payload.slug) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { id, ...values } = payload as EventRow;
    const { error } = editing.id
      ? await supabase.from("events").update(values).eq("id", editing.id)
      : await supabase.from("events").insert(values);
    setBusy(false);
    if (error) {
      toast({ title: "Save failed", description: "Please check the fields and try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this event? This cannot be undone.")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Events ({events.length})</h2>
        <Button onClick={() => setEditing({ ...emptyEvent })}>
          <Plus className="mr-2 h-4 w-4" /> New event
        </Button>
      </div>

      <div className="grid gap-3">
        {events.map((ev) => (
          <Card key={ev.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-2 rounded" style={{ backgroundColor: ev.color }} />
                <div>
                  <CardTitle className="text-base">
                    {ev.title} {!ev.published && <span className="text-xs text-muted-foreground">(hidden)</span>}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{ev.date} · {ev.location}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => setEditing(ev)} aria-label="Edit event">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => remove(ev.id)} aria-label="Delete event">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit event" : "New event"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date (display text)</Label>
                  <Input value={editing.date ?? ""} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short description</Label>
                <Textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Full details (shown in the registration dialog)</Label>
                <Textarea rows={8} value={editing.long_description ?? ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Poster image</Label>
                <MediaPicker
                  value={editing.poster_image ?? ""}
                  onChange={(url) => setEditing({ ...editing, poster_image: url })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Colour</Label>
                  <div className="flex gap-2">
                    <Input type="color" className="w-16 p-1" value={editing.color ?? "#2E7D32"} onChange={(e) => setEditing({ ...editing, color: e.target.value })} />
                    <Input value={editing.color ?? ""} onChange={(e) => setEditing({ ...editing, color: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Sort order</Label>
                  <Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Expected attendees</Label>
                  <Input type="number" value={editing.attendees ?? 0} onChange={(e) => setEditing({ ...editing, attendees: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Offline registrations to add</Label>
                  <Input type="number" value={editing.registration_offset ?? 0} onChange={(e) => setEditing({ ...editing, registration_offset: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                  Published
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} />
                  Featured badge
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={!!editing.show_on_events} onCheckedChange={(v) => setEditing({ ...editing, show_on_events: v })} />
                  Show on events page
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Switch checked={!!editing.show_on_home} onCheckedChange={(v) => setEditing({ ...editing, show_on_home: v })} />
                  Show on home page
                </label>
              </div>
              <Button onClick={save} disabled={busy} className="w-full">
                {busy ? "Saving..." : "Save event"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsAdmin;
