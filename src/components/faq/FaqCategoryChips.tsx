import { Bookmark, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FaqCategory } from "@/content/faq";

export const ALL_FILTER = "all";
export const BOOKMARKED_FILTER = "bookmarked";

interface FaqCategoryChipsProps {
  categories: FaqCategory[];
  selected: string;
  onSelect: (id: string) => void;
  bookmarkCount: number;
}

const shortTitle = (title: string) => title.split(" (")[0];

const FaqCategoryChips = ({ categories, selected, onSelect, bookmarkCount }: FaqCategoryChipsProps) => {
  const chipClass = (active: boolean) =>
    cn(
      "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
      "backdrop-blur-xl",
      active
        ? "border-transparent bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_4px_16px_-4px_hsl(145_45%_35%/0.5)]"
        : "border-white/40 bg-white/50 text-muted-foreground hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/[0.04]",
    );

  return (
    <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="tablist" aria-label="Filter FAQs by category">
      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(ALL_FILTER)}
        role="tab"
        aria-selected={selected === ALL_FILTER}
        className={chipClass(selected === ALL_FILTER)}
      >
        <LayoutGrid className="h-3.5 w-3.5" />
        All topics
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(BOOKMARKED_FILTER)}
        role="tab"
        aria-selected={selected === BOOKMARKED_FILTER}
        className={chipClass(selected === BOOKMARKED_FILTER)}
      >
        <Bookmark className={cn("h-3.5 w-3.5", selected === BOOKMARKED_FILTER && "fill-current")} />
        Bookmarked
        {bookmarkCount > 0 && (
          <span
            className={cn(
              "rounded-full px-1.5 text-[11px]",
              selected === BOOKMARKED_FILTER ? "bg-white/25" : "bg-accent/20 text-accent-foreground",
            )}
          >
            {bookmarkCount}
          </span>
        )}
      </motion.button>

      <div className="mx-1 my-auto h-5 w-px shrink-0 bg-border" aria-hidden="true" />

      {categories.map((category) => (
        <motion.button
          key={category.id}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          role="tab"
          aria-selected={selected === category.id}
          title={category.title}
          className={chipClass(selected === category.id)}
        >
          {shortTitle(category.title)}
        </motion.button>
      ))}
    </div>
  );
};

export default FaqCategoryChips;
