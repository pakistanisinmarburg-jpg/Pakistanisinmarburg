import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import heroImage from "@/assets/hero-community.jpg";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ_CATEGORIES, type FaqCategory, type FaqItem } from "@/content/faq";

interface SearchHit extends FaqItem {
  categoryId: string;
  categoryTitle: string;
}

const normalize = (s: string) => s.toLowerCase();

const FAQ = () => {
  const [query, setQuery] = useState("");

  const searchHits = useMemo<SearchHit[]>(() => {
    const q = normalize(query.trim());
    if (q.length < 2) return [];

    const hits: SearchHit[] = [];
    for (const category of FAQ_CATEGORIES) {
      for (const item of category.items) {
        if (normalize(item.question).includes(q) || normalize(item.answer).includes(q)) {
          hits.push({ ...item, categoryId: category.id, categoryTitle: category.title });
        }
      }
    }
    return hits;
  }, [query]);

  const isSearching = query.trim().length >= 2;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Hero
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about moving to, studying, working, and settling in Germany"
          image={heroImage}
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Search bar */}
            <div className="mx-auto mb-10 max-w-2xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search all questions (e.g. Anmeldung, blocked account, health insurance...)"
                  className="pl-9 pr-9"
                  aria-label="Search FAQs"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isSearching && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchHits.length} result{searchHits.length === 1 ? "" : "s"} for &ldquo;{query.trim()}&rdquo;
                </p>
              )}
            </div>

            {isSearching ? (
              <SearchResults hits={searchHits} />
            ) : (
              <CategoryList categories={FAQ_CATEGORIES} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const AnswerText = ({ text }: { text: string }) => (
  <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{text}</div>
);

const SearchResults = ({ hits }: { hits: SearchHit[] }) => {
  if (hits.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
        No questions matched your search. Try a different keyword, or browse the topics below by clearing the search box.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Accordion type="multiple" className="w-full">
        {hits.map((hit, idx) => (
          <AccordionItem key={`${hit.categoryId}-${idx}`} value={`${hit.categoryId}-${idx}`}>
            <AccordionTrigger className="text-left">
              <div className="flex flex-col items-start gap-1 pr-4 text-left">
                <span className="font-medium">{hit.question}</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {hit.categoryTitle}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AnswerText text={hit.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const CategoryList = ({ categories }: { categories: FaqCategory[] }) => (
  <div className="mx-auto max-w-3xl space-y-4">
    <Accordion type="multiple" className="w-full">
      {categories.map((category) => (
        <AccordionItem key={category.id} value={category.id} className="rounded-lg border border-border px-2 mb-3">
          <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
            <div className="flex w-full items-center justify-between gap-4 pr-2">
              <span>{category.title}</span>
              <Badge variant="outline" className="shrink-0 text-xs font-normal text-muted-foreground">
                {category.items.length} question{category.items.length === 1 ? "" : "s"}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {category.intro && <p className="mb-4 whitespace-pre-line text-sm text-muted-foreground">{category.intro}</p>}

            <Accordion type="multiple" className="w-full">
              {category.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${category.id}-${idx}`}>
                  <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <AnswerText text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {category.glossary && category.glossary.rows.length > 0 && (
              <div className="mt-6 overflow-x-auto rounded-md border border-border">
                {category.glossary.title && (
                  <div className="border-b border-border bg-muted/50 px-4 py-2 text-sm font-semibold">
                    {category.glossary.title}
                  </div>
                )}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30 text-left">
                      <th className="px-4 py-2 font-medium">{category.glossary.headers[0]}</th>
                      <th className="px-4 py-2 font-medium">{category.glossary.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.glossary.rows.map(([de, en], i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2 font-medium text-foreground">{de}</td>
                        <td className="px-4 py-2 text-muted-foreground">{en}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {category.sources && category.sources.length > 0 && (
              <div className="mt-6 rounded-md bg-muted/30 p-4 text-sm text-muted-foreground">
                <p className="mb-1 font-medium text-foreground">Official information sources</p>
                <ul className="list-inside list-disc space-y-1">
                  {category.sources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQ;
