import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FilterChipDef {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface GlassFilterChipsProps {
  chips: FilterChipDef[];
  selected: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
}

const GlassFilterChips = ({ chips, selected, onSelect, ariaLabel }: GlassFilterChipsProps) => (
  <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2" role="tablist" aria-label={ariaLabel}>
    {chips.map((chip) => {
      const Icon = chip.icon;
      const active = selected === chip.id;
      return (
        <motion.button
          key={chip.id}
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(chip.id)}
          role="tab"
          aria-selected={active}
          className={cn(
            "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-xl transition-all duration-200",
            active
              ? "border-transparent bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_4px_16px_-4px_hsl(145_45%_35%/0.5)]"
              : "border-white/40 bg-white/50 text-muted-foreground hover:border-primary/30 hover:text-primary dark:border-white/10 dark:bg-white/[0.04]",
          )}
        >
          {Icon && <Icon className={cn("h-3.5 w-3.5", active && chip.id === "saved" && "fill-current")} />}
          {chip.label}
          {chip.count !== undefined && chip.count > 0 && (
            <span className={cn("rounded-full px-1.5 text-[11px]", active ? "bg-white/25" : "bg-accent/20 text-accent-foreground")}>
              {chip.count}
            </span>
          )}
        </motion.button>
      );
    })}
  </div>
);

export default GlassFilterChips;
