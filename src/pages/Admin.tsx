import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ExternalLink } from "lucide-react";
import EventsAdmin from "@/components/admin/EventsAdmin";
import MediaAdmin from "@/components/admin/MediaAdmin";
import ContentAdmin from "@/components/admin/ContentAdmin";
import RegistrationsAdmin from "@/components/admin/RegistrationsAdmin";
import ContactMessagesAdmin from "@/components/admin/ContactMessagesAdmin";
import MembersAdmin from "@/components/admin/MembersAdmin";
import MentorRequestsAdmin from "@/components/admin/MentorRequestsAdmin";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (user && !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Admin access required</h1>
        <p className="max-w-md text-muted-foreground">
          Your account <strong>{user.email}</strong> does not have the admin role yet. Ask an existing admin to grant it.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={signOut}>Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="text-lg font-bold">Site administration</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/"><ExternalLink className="mr-2 h-4 w-4" /> View site</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="media">Gallery &amp; media</TabsTrigger>
            <TabsTrigger value="content">Page text</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="mentors">Mentor requests</TabsTrigger>
          </TabsList>
          <TabsContent value="events"><EventsAdmin /></TabsContent>
          <TabsContent value="media"><MediaAdmin /></TabsContent>
          <TabsContent value="content"><ContentAdmin /></TabsContent>
          <TabsContent value="registrations"><RegistrationsAdmin /></TabsContent>
          <TabsContent value="messages"><ContactMessagesAdmin /></TabsContent>
          <TabsContent value="members"><MembersAdmin /></TabsContent>
          <TabsContent value="mentors"><MentorRequestsAdmin /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
