import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import { FAQ_CATEGORIES, type FaqCategory } from "@/content/faq";
import { useFaqPreferences } from "@/hooks/useFaqPreferences";
import FaqSearchBar from "@/components/faq/FaqSearchBar";
import FaqCategoryChips, { ALL_FILTER, BOOKMARKED_FILTER } from "@/components/faq/FaqCategoryChips";
import FaqCard from "@/components/faq/FaqCard";
import SupportModal from "@/components/support/SupportModal";

const questionId = (categoryId: string, index: number) => `${categoryId}::${index}`;

interface FlatItem {
  id: string;
  index: number;
  question: string;
  answer: string;
  categoryId: string;
  categoryTitle: string;
}

const flattenAll = (categories: FaqCategory[]): FlatItem[] =>
  categories.flatMap((category) =>
    category.items.map((item, index) => ({
      id: questionId(category.id, index),
      index,
      question: item.question,
      answer: item.answer,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
  );

const ALL_ITEMS = flattenAll(FAQ_CATEGORIES);

const FAQ = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(ALL_FILTER);
  const prefs = useFaqPreferences();

  const isSearching = query.trim().length >= 2;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = query.trim().toLowerCase();
    return ALL_ITEMS.filter((item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q));
  }, [query, isSearching]);

  const bookmarkedItems = useMemo(
    () => ALL_ITEMS.filter((item) => prefs.bookmarkedIds.has(item.id)),
    [prefs.bookmarkedIds],
  );

  const activeCategory = useMemo(
    () => FAQ_CATEGORIES.find((c) => c.id === selected) ?? null,
    [selected],
  );

  const renderCard = (item: FlatItem, showBadge: boolean, i: number) => (
    <FaqCard
      key={item.id}
      id={item.id}
      index={i}
      question={item.question}
      answer={item.answer}
      categoryTitle={showBadge ? item.categoryTitle : undefined}
      searchQuery={query}
      isBookmarked={prefs.isBookmarked(item.id)}
      onToggleBookmark={() => prefs.toggleBookmark(item.id)}
      vote={prefs.getVote(item.id)}
      onVote={(v) => prefs.castVote(item.id, v)}
    />
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about moving to, studying, working, and settling in Germany"
          image={heroImage}
        />

        <section className="relative overflow-hidden py-12">
          {/* Decorative glass-morphism background blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            <FaqSearchBar value={query} onChange={setQuery} resultCount={searchResults.length} isSearching={isSearching} />

            {!isSearching && (
              <div className="mt-6">
                <FaqCategoryChips
                  categories={FAQ_CATEGORIES}
                  selected={selected}
                  onSelect={setSelected}
                  bookmarkCount={prefs.bookmarkCount}
                />
              </div>
            )}

            <div className="mx-auto mt-8 max-w-3xl">
              <AnimatePresence mode="wait">
                {isSearching ? (
                  <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {searchResults.length === 0 ? (
                      <EmptyState
                        icon={Sparkles}
                        title="No matches yet"
                        description="Try a different keyword, or clear the search to browse by topic."
                      />
                    ) : (
                      searchResults.map((item, i) => renderCard(item, true, i))
                    )}
                  </motion.div>
                ) : selected === BOOKMARKED_FILTER ? (
                  <motion.div key="bookmarked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {bookmarkedItems.length === 0 ? (
                      <EmptyState
                        icon={Bookmark}
                        title="No bookmarks yet"
                        description="Tap the bookmark icon on any question to save it here for quick access later."
                      />
                    ) : (
                      bookmarkedItems.map((item, i) => renderCard(item, true, i))
                    )}
                  </motion.div>
                ) : selected === ALL_FILTER ? (
                  <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                    {FAQ_CATEGORIES.map((category) => (
                      <div key={category.id}>
                        <h2 className="mb-3 text-lg font-semibold text-foreground">{category.title}</h2>
                        <div className="space-y-3">
                          {category.items.map((item, i) => renderCard({ ...item, id: questionId(category.id, i), index: i, categoryId: category.id, categoryTitle: category.title }, false, i))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : activeCategory ? (
                  <motion.div key={activeCategory.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                    {activeCategory.intro && (
                      <p className="mb-4 whitespace-pre-line rounded-xl border border-white/40 bg-white/40 p-4 text-sm text-muted-foreground backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
                        {activeCategory.intro}
                      </p>
                    )}
                    {activeCategory.items.map((item, i) =>
                      renderCard(
                        { ...item, id: questionId(activeCategory.id, i), index: i, categoryId: activeCategory.id, categoryTitle: activeCategory.title },
                        false,
                        i,
                      ),
                    )}

                    {activeCategory.glossary && activeCategory.glossary.rows.length > 0 && (
                      <div className="mt-6 overflow-hidden rounded-2xl border border-white/40 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                        {activeCategory.glossary.title && (
                          <div className="border-b border-white/40 bg-primary/5 px-4 py-2 text-sm font-semibold dark:border-white/10">
                            {activeCategory.glossary.title}
                          </div>
                        )}
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/40 text-left dark:border-white/10">
                              <th className="px-4 py-2 font-medium">{activeCategory.glossary.headers[0]}</th>
                              <th className="px-4 py-2 font-medium">{activeCategory.glossary.headers[1]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeCategory.glossary.rows.map(([de, en], i) => (
                              <tr key={i} className="border-b border-white/20 last:border-0 dark:border-white/5">
                                <td className="px-4 py-2 font-medium text-foreground">{de}</td>
                                <td className="px-4 py-2 text-muted-foreground">{en}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {activeCategory.sources && activeCategory.sources.length > 0 && (
                      <div className="mt-6 rounded-2xl border border-white/40 bg-white/40 p-4 text-sm text-muted-foreground backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
                        <p className="mb-1 font-medium text-foreground">Official information sources</p>
                        <ul className="list-inside list-disc space-y-1">
                          {activeCategory.sources.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="mt-16 flex flex-col items-center gap-3 rounded-3xl border border-white/40 bg-white/40 px-6 py-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
              <h3 className="text-xl font-semibold text-foreground">Didn&apos;t find your answer?</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                The Pakistanis in Marburg community is happy to help with anything not covered here.
              </p>
              <div className="mt-2">
                <SupportModal />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/40 bg-white/40 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
    <span className="rounded-full bg-primary/10 p-3 text-primary">
      <Icon className="h-6 w-6" />
    </span>
    <h3 className="font-medium text-foreground">{title}</h3>
    <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
  </div>
);

export default FAQ;
