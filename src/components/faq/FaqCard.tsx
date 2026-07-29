import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, ChevronDown, ThumbsDown, ThumbsUp } from "lucide-react";
import { highlightText } from "@/lib/highlightText";
import { cn } from "@/lib/utils";
import type { FaqVote } from "@/hooks/useFaqPreferences";

interface FaqCardProps {
  id: string;
  index?: number;
  question: string;
  answer: string;
  categoryTitle?: string;
  searchQuery?: string;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  vote: FaqVote | null;
  onVote: (vote: FaqVote) => void;
}

const answerPreview = (text: string, max = 140) => {
  const singleLine = text.replace(/\s+/g, " ").trim();
  return singleLine.length > max ? `${singleLine.slice(0, max).trim()}…` : singleLine;
};

const FaqCard = ({
  id,
  index = 0,
  question,
  answer,
  categoryTitle,
  searchQuery = "",
  isBookmarked,
  onToggleBookmark,
  vote,
  onVote,
}: FaqCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut", delay: Math.min(index, 20) * 0.02 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-colors duration-300",
        "border-white/40 bg-white/50 shadow-[0_4px_24px_-8px_hsl(145_50%_25%/0.15)] backdrop-blur-xl",
        "dark:border-white/10 dark:bg-white/[0.04]",
        isOpen && "border-primary/30 bg-white/70 dark:bg-white/[0.07]",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {categoryTitle && (
            <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              {categoryTitle}
            </span>
          )}
          <span className="font-medium text-foreground">{highlightText(question, searchQuery)}</span>
          {!isOpen && searchQuery.trim().length >= 2 && (
            <span className="text-sm text-muted-foreground">{highlightText(answerPreview(answer), searchQuery)}</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 pt-0.5">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                onToggleBookmark();
              }
            }}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
            aria-pressed={isBookmarked}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent-foreground"
          >
            <motion.span whileTap={{ scale: 0.75 }} className="flex">
              <Bookmark className={cn("h-4 w-4 transition-colors", isBookmarked && "fill-accent text-accent")} />
            </motion.span>
          </span>

          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex text-muted-foreground">
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`${id}-content`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/40 px-5 pb-4 pt-3 dark:border-white/10">
              <div className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {highlightText(answer, searchQuery)}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-dashed border-border/60 pt-3">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <div className="flex items-center gap-1.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onVote("up")}
                    aria-pressed={vote === "up"}
                    aria-label="Mark as helpful"
                    className={cn(
                      "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors",
                      vote === "up"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-primary",
                    )}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => onVote("down")}
                    aria-pressed={vote === "down"}
                    aria-label="Mark as not helpful"
                    className={cn(
                      "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors",
                      vote === "down"
                        ? "border-destructive/40 bg-destructive/10 text-destructive"
                        : "border-border/60 text-muted-foreground hover:border-destructive/30 hover:text-destructive",
                    )}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
              {vote && (
                <p className="mt-2 text-right text-[11px] text-muted-foreground">
                  {vote === "up" ? "Thanks for the feedback! 🎉" : "Thanks — we'll try to improve this answer."}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FaqCard;
