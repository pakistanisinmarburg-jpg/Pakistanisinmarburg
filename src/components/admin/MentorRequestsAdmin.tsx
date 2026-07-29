import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MentorRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string | null;
  area_of_help: string;
  message: string | null;
  status: string;
  created_at: string;
}

const STATUSES = ["pending", "contacted", "resolved"];

const MentorRequestsAdmin = () => {
  const [rows, setRows] = useState<MentorRequest[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from("mentor_requests")
      .select("id, first_name, last_name, email, mobile_no, area_of_help, message, status, created_at")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load mentor requests", variant: "destructive" });
    setRows((data as MentorRequest[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("mentor_requests").update({ status }).eq("id", id);
    if (error) toast({ title: "Update failed", variant: "destructive" });
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this mentor request?")) return;
    const { error } = await supabase.from("mentor_requests").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  const exportCsv = () => {
    const header = ["Name", "Email", "Mobile", "Area of help", "Message", "Status", "Received at"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [
          `${r.first_name} ${r.last_name}`.trim(),
          r.email,
          r.mobile_no,
          r.area_of_help,
          r.message,
          r.status,
          new Date(r.created_at).toLocaleString(),
        ]
          .map(escape)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `mentor-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pendingCount = rows.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Mentor requests ({rows.length}){pendingCount > 0 && <span className="ml-2 text-sm font-normal text-primary">{pendingCount} pending</span>}
        </h2>
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
                <TableHead>Area of help</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className={r.status === "pending" ? "bg-primary/5" : undefined}>
                  <TableCell className="whitespace-nowrap">{`${r.first_name} ${r.last_name}`.trim()}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.area_of_help}</TableCell>
                  <TableCell className="max-w-xs whitespace-pre-wrap">{r.message}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(status) => updateStatus(r.id, status)}>
                      <SelectTrigger className="h-8 w-[130px]">
                        <SelectValue>
                          <Badge variant={r.status === "pending" ? "default" : "secondary"}>{r.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete mentor request">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    No mentor requests yet.
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

export default MentorRequestsAdmin;
