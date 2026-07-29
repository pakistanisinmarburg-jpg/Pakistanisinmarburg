import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface GlassSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  resultCount?: number;
  isSearching?: boolean;
}

const GlassSearchInput = ({ value, onChange, placeholder, resultCount, isSearching }: GlassSearchInputProps) => (
  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto w-full max-w-2xl">
    <div className="relative rounded-2xl border border-white/40 bg-white/60 shadow-[0_8px_32px_-8px_hsl(145_50%_25%/0.18)] backdrop-blur-xl transition-shadow duration-300 focus-within:shadow-[0_8px_32px_-4px_hsl(145_50%_25%/0.3)] dark:border-white/10 dark:bg-white/[0.04]">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border-0 bg-transparent pl-11 pr-11 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
    {isSearching && resultCount !== undefined && (
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-center text-sm text-muted-foreground">
        {resultCount} result{resultCount === 1 ? "" : "s"} for &ldquo;{value.trim()}&rdquo;
      </motion.p>
    )}
  </motion.div>
);

export default GlassSearchInput;
