import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  address: string;
  gdpr_consent: boolean;
  created_at: string;
}

const MembersAdmin = () => {
  const [rows, setRows] = useState<Member[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("id, first_name, last_name, email, mobile_no, address, gdpr_consent, created_at")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load members", variant: "destructive" });
    setRows((data as Member[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  const exportCsv = () => {
    const header = ["First Name", "Last Name", "Email", "Mobile", "Address", "GDPR Consent", "Registered at"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [r.first_name, r.last_name, r.email, r.mobile_no, r.address, r.gdpr_consent ? "Yes" : "No", new Date(r.created_at).toLocaleString()]
          .map(escape)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Members ({rows.length})</h2>
        <Button variant="outline" onClick={exportCsv} disabled={!rows.length}>
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>GDPR</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">{`${r.first_name} ${r.last_name}`.trim()}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.mobile_no}</TableCell>
                  <TableCell className="max-w-xs">{r.address}</TableCell>
                  <TableCell>{r.gdpr_consent ? "Yes" : "No"}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete member">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    No members yet.
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

export default MembersAdmin;
