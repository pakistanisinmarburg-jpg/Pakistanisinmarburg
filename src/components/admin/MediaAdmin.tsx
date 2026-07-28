import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Plus, Trash2 } from "lucide-react";
import MediaPicker from "./MediaPicker";
import { resolveMediaUrl } from "@/lib/localAssets";

interface MediaRow {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string;
  published: boolean;
  sort_order: number;
}

const empty: Omit<MediaRow, "id"> = {
  title: "",
  description: "",
  type: "image",
  url: "",
  published: true,
  sort_order: 0,
};

const MediaAdmin = () => {
  const [items, setItems] = useState<MediaRow[]>([]);
  const [editing, setEditing] = useState<(Partial<MediaRow> & { id?: string }) | null>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("media_items").select("*").order("sort_order");
    setItems((data as MediaRow[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (!editing) return;
    const payload = { ...empty, ...editing };
    if (!payload.url) {
      toast({ title: "An image or video is required", variant: "destructive" });
      return;
    }
    const { id, ...values } = payload as MediaRow;
    const { error } = editing.id
      ? await supabase.from("media_items").update(values).eq("id", editing.id)
      : await supabase.from("media_items").insert(values);
    if (error) {
      toast({ title: "Save failed", variant: "destructive" });
      return;
    }
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("media_items").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gallery media ({items.length})</h2>
        <Button onClick={() => setEditing({ ...empty })}>
          <Plus className="mr-2 h-4 w-4" /> Add media
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted">
              {item.type === "video" ? (
                <video src={resolveMediaUrl(item.url)} className="h-full w-full object-cover" controls />
              ) : (
                <img src={resolveMediaUrl(item.url)} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
              )}
            </div>
            <CardContent className="flex items-center justify-between gap-2 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.title || "Untitled"}</p>
                <p className="text-xs text-muted-foreground">{item.published ? "Visible" : "Hidden"}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => setEditing(item)} aria-label="Edit media">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={() => remove(item.id)} aria-label="Delete media">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit media" : "Add media"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Image or video</Label>
                <MediaPicker value={editing.url ?? ""} onChange={(url) => setEditing({ ...editing, url })} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={editing.type ?? "image"} onValueChange={(v) => setEditing({ ...editing, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={2} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Sort order</Label>
                <Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Switch checked={!!editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                Visible on the site
              </label>
              <Button onClick={save} className="w-full">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaAdmin;
