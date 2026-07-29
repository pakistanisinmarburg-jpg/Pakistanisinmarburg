import { useEffect, useMemo, useState } from "react";
import { X, Heart, Image as ImageIcon, Video as VideoIcon, LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/hooks/useSiteContent";
import { resolveMediaUrl } from "@/lib/localAssets";
import { useBookmarks } from "@/hooks/useBookmarks";
import { highlightText } from "@/lib/highlightText";
import { glassCard } from "@/lib/glass";
import { cn } from "@/lib/utils";
import GlassSearchInput from "@/components/common/GlassSearchInput";
import GlassFilterChips, { type FilterChipDef } from "@/components/common/GlassFilterChips";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  type: string;
  url: string;
}

const ALL_FILTER = "all";
const PHOTOS_FILTER = "photos";
const VIDEOS_FILTER = "videos";
const FAVORITES_FILTER = "favorites";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(ALL_FILTER);
  const t = useContent();
  const { isSaved, toggle: toggleSaved, savedIds, count: savedCount } = useBookmarks("gallery");

  useEffect(() => {
    supabase
      .from("media_items")
      .select("id, title, description, type, url")
      .eq("published", true)
      .order("sort_order")
      .then(({ data }) => setItems((data as GalleryItem[]) ?? []));
  }, []);

  const isSearching = query.trim().length >= 2;
  const photoCount = items.filter((i) => i.type !== "video").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  const visibleItems = useMemo(() => {
    let list = items;
    if (filter === PHOTOS_FILTER) list = list.filter((i) => i.type !== "video");
    if (filter === VIDEOS_FILTER) list = list.filter((i) => i.type === "video");
    if (filter === FAVORITES_FILTER) list = list.filter((i) => savedIds.has(i.id));
    if (isSearching) {
      const q = query.trim().toLowerCase();
      list = list.filter((i) => (i.title ?? "").toLowerCase().includes(q) || (i.description ?? "").toLowerCase().includes(q));
    }
    return list;
  }, [items, filter, isSearching, query, savedIds]);

  const chips: FilterChipDef[] = [
    { id: ALL_FILTER, label: "All media", icon: LayoutGrid },
    { id: PHOTOS_FILTER, label: "Photos", icon: ImageIcon, count: photoCount },
    { id: VIDEOS_FILTER, label: "Videos", icon: VideoIcon, count: videoCount },
    { id: FAVORITES_FILTER, label: "Favorites", icon: Heart, count: savedCount },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero title={t("gallery.hero.title")} subtitle={t("gallery.hero.subtitle")} image={heroImage} />

        <section className="relative overflow-hidden py-16">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-24 top-72 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <GlassSearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search photos and videos by caption..."
              resultCount={visibleItems.length}
              isSearching={isSearching}
            />

            <div className="mt-6">
              <GlassFilterChips chips={chips} selected={filter} onSelect={setFilter} ariaLabel="Filter gallery" />
            </div>

            <AnimatePresence mode="wait">
              {visibleItems.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/40 bg-white/40 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span className="rounded-full bg-primary/10 p-3 text-primary">
                    <ImageIcon className="h-6 w-6" />
                  </span>
                  <h3 className="font-medium text-foreground">Nothing here yet</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    {filter === FAVORITES_FILTER
                      ? "Tap the heart on any photo or video to favorite it."
                      : "Try a different search term or filter."}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${filter}-${query}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {visibleItems.map((item, i) => {
                    const isVideo = item.type === "video";
                    const saved = isSaved(item.id);
                    const caption = item.title || item.description || "";

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.04, ease: [0.4, 0, 0.2, 1] }}
                        className={cn("group relative overflow-hidden rounded-2xl", glassCard, "p-0")}
                      >
                        <button
                          type="button"
                          onClick={() => toggleSaved(item.id)}
                          aria-pressed={saved}
                          aria-label={saved ? "Remove from favorites" : "Add to favorites"}
                          className="absolute right-2 top-2 z-10 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                        >
                          <Heart className={cn("h-4 w-4 transition-colors", saved && "fill-destructive text-destructive")} />
                        </button>

                        {isVideo ? (
                          <div className="aspect-video overflow-hidden">
                            <video src={resolveMediaUrl(item.url)} controls className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div
                            className="aspect-video cursor-pointer overflow-hidden"
                            onClick={() => setSelectedImage(resolveMediaUrl(item.url))}
                          >
                            <img
                              src={resolveMediaUrl(item.url)}
                              alt={caption || "Community gallery photo"}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}

                        {caption && (
                          <div className="p-3 text-sm font-medium text-foreground">{highlightText(caption, query)}</div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selectedImage}
              alt="Enlarged gallery photo"
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
