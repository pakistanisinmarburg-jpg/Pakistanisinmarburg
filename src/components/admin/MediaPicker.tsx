import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { resolveMediaUrl } from "@/lib/localAssets";

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

interface MediaPickerProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

/** Upload a file to the site-media bucket (or paste an external URL). */
const MediaPicker = ({ value, onChange, accept = "image/*,video/*" }: MediaPickerProps) => {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("site-media").upload(path, file, {
        cacheControl: "31536000",
        contentType: file.type,
      });
      if (error) throw error;
      const { data, error: signErr } = await supabase.storage.from("site-media").createSignedUrl(path, TEN_YEARS);
      if (signErr || !data) throw signErr ?? new Error("Could not create URL");
      onChange(data.signedUrl);
      toast({ title: "Uploaded" });
    } catch {
      toast({ title: "Upload failed", description: "Make sure you are signed in as an admin.", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(value);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input placeholder="https://... or upload a file" value={value} onChange={(e) => onChange(e.target.value)} />
        <Button type="button" variant="outline" disabled={busy} onClick={() => inputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
          {busy ? "Uploading..." : "Upload"}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />
      {value && !isVideo && (
        <img src={resolveMediaUrl(value)} alt="Selected media preview" className="h-28 w-auto rounded border border-border object-cover" />
      )}
      {value && isVideo && (
        <video src={resolveMediaUrl(value)} className="h-28 w-auto rounded border border-border" controls />
      )}
    </div>
  );
};

export default MediaPicker;
