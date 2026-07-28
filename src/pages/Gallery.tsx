import { useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/hooks/useSiteContent";
import { resolveMediaUrl } from "@/lib/localAssets";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const t = useContent();

  useEffect(() => {
    supabase
      .from("media_items")
      .select("id, title, description, type, url")
      .eq("published", true)
      .order("sort_order")
      .then(({ data }) => setItems((data as GalleryItem[]) ?? []));
  }, []);

  const images = items.filter((i) => i.type !== "video");
  const videos = items.filter((i) => i.type === "video");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero title={t("gallery.hero.title")} subtitle={t("gallery.hero.subtitle")} image={heroImage} />

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group relative cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
                  onClick={() => setSelectedImage(resolveMediaUrl(item.url))}
                >
                  <div className="aspect-video">
                    <img
                      src={resolveMediaUrl(item.url)}
                      alt={item.title || item.description || "Community gallery photo"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-3xl font-bold text-foreground">{t("gallery.videos.title")}</h2>
              <p className="text-muted-foreground">{t("gallery.videos.subtitle")}</p>
            </div>

            {videos.length ? (
              <div className="grid gap-6 md:grid-cols-2">
                {videos.map((v) => (
                  <div key={v.id} className="overflow-hidden rounded-lg border border-border bg-card">
                    <video src={resolveMediaUrl(v.url)} controls className="aspect-video w-full" />
                    {v.title && <p className="p-3 text-sm font-medium text-foreground">{v.title}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-4xl text-center">
                <div className="rounded-lg border border-border bg-card p-8">
                  <p className="text-muted-foreground">
                    Video content will be added soon. Stay tuned for highlights from our upcoming events!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged gallery photo"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
