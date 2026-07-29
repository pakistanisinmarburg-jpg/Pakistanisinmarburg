import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Trash2, Mail, MailOpen } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  consent: boolean;
  status: string;
  created_at: string;
}

const ContactMessagesAdmin = () => {
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("id, name, email, message, consent, status, created_at")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Could not load messages", variant: "destructive" });
    setRows((data as ContactMessage[]) ?? []);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (row: ContactMessage) => {
    const nextStatus = row.status === "new" ? "read" : "new";
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: nextStatus })
      .eq("id", row.id);
    if (error) toast({ title: "Update failed", variant: "destructive" });
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", variant: "destructive" });
    else load();
  };

  const exportCsv = () => {
    const header = ["Name", "Email", "Message", "Consent", "Status", "Received at"];
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        [r.name, r.email, r.message, r.consent ? "Yes" : "No", r.status, new Date(r.created_at).toLocaleString()]
          .map(escape)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const newCount = rows.filter((r) => r.status === "new").length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Contact messages ({rows.length}){newCount > 0 && <span className="ml-2 text-sm font-normal text-primary">{newCount} new</span>}
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
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className={r.status === "new" ? "bg-primary/5" : undefined}>
                  <TableCell>
                    <Badge variant={r.status === "new" ? "default" : "secondary"}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell className="max-w-md whitespace-pre-wrap">{r.message}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleStatus(r)}
                      aria-label={r.status === "new" ? "Mark as read" : "Mark as new"}
                    >
                      {r.status === "new" ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(r.id)} aria-label="Delete message">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!rows.length && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No messages yet.
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

export default ContactMessagesAdmin;
