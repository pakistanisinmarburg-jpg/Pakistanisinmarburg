import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CONTENT_DEFAULTS } from "@/content/defaults";
import { useSiteContentAdmin } from "@/hooks/useSiteContent";
import { RotateCcw } from "lucide-react";

const ContentAdmin = () => {
  const { refresh } = useSiteContentAdmin();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("site_content").select("content_key, value");
    const overrides = Object.fromEntries((data ?? []).map((r) => [r.content_key, r.value]));
    setValues(
      Object.fromEntries(
        Object.entries(CONTENT_DEFAULTS).map(([key, def]) => [key, overrides[key] ?? def.value]),
      ),
    );
  };

  useEffect(() => {
    load();
  }, []);

  const groups = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.entries(CONTENT_DEFAULTS).forEach(([key, def]) => {
      (map[def.group] ||= []).push(key);
    });
    return map;
  }, []);

  const save = async (key: string) => {
    setSaving(key);
    const { error } = await supabase
      .from("site_content")
      .upsert({ content_key: key, value: values[key] ?? "" }, { onConflict: "content_key" });
    setSaving(null);
    if (error) toast({ title: "Save failed", variant: "destructive" });
    else {
      toast({ title: "Saved" });
      refresh();
    }
  };

  const reset = async (key: string) => {
    await supabase.from("site_content").delete().eq("content_key", key);
    setValues({ ...values, [key]: CONTENT_DEFAULTS[key].value });
    refresh();
    toast({ title: "Reset to default" });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Page text</h2>
      {Object.entries(groups).map(([group, keys]) => (
        <Card key={group}>
          <CardHeader>
            <CardTitle className="text-base">{group}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {keys.map((key) => {
              const def = CONTENT_DEFAULTS[key];
              return (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{def.label}</Label>
                  {def.multiline ? (
                    <Textarea id={key} rows={3} value={values[key] ?? ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
                  ) : (
                    <Input id={key} value={values[key] ?? ""} onChange={(e) => setValues({ ...values, [key]: e.target.value })} />
                  )}
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => save(key)} disabled={saving === key}>
                      {saving === key ? "Saving..." : "Save"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => reset(key)}>
                      <RotateCcw className="mr-2 h-3 w-3" /> Reset
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentAdmin;
