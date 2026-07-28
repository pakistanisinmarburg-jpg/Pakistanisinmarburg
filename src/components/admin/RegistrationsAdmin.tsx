import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";

interface Registration {
  id: string;
  event_id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  number_of_guests: number | null;
  dietary_restrictions: string | null;
  photo_consent: boolean;
  created_at: string;
}

const RegistrationsAdmin = () => {
  const [rows, setRows] = useState<Registration[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from("event_registrations")
      .select("id, event_id, first_name, last_name, email, phone, number_of_guests, dietary_restrictions, photo_consent, created_at")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load registrations", variant: "destructive" });
    setRows((data as Registration[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this registration?")) return;
    const { error } = await supabase.from("event_registrations").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  const exportCsv = () => {
    const header = ["Event", "Name", "Email", "Phone", "Guests", "Dietary", "Photo consent", "Registered at"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [
          r.event_id,
          `${r.first_name} ${r.last_name ?? ""}`.trim(),
          r.email,
          r.phone,
          r.number_of_guests,
          r.dietary_restrictions,
          r.photo_consent ? "Yes" : "No",
          new Date(r.created_at).toLocaleString(),
        ]
          .map(escape)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Registrations ({rows.length})</h2>
        <Button variant="outline" onClick={exportCsv} disabled={!rows.length}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Dietary</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">{r.event_id}</TableCell>
                  <TableCell className="whitespace-nowrap">{`${r.first_name} ${r.last_name ?? ""}`.trim()}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.phone}</TableCell>
                  <TableCell>{r.number_of_guests}</TableCell>
                  <TableCell>{r.dietary_restrictions}</TableCell>
                  <TableCell>{r.photo_consent ? "Yes" : "No"}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete registration">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">
                    No registrations yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationsAdmin;
