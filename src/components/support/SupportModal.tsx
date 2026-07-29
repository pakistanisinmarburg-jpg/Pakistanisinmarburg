import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LifeBuoy, Mail, MessageCircle, UserRoundPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SUPPORT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "Ask the Community Assistant",
    description: "Get an instant answer from the chat assistant in the bottom-right corner.",
    action: "chatbot" as const,
  },
  {
    icon: Mail,
    title: "Email the community",
    description: "pakistanisinmarburg@gmail.com — usually replies within a couple of days.",
    action: "mailto:pakistanisinmarburg@gmail.com",
  },
  {
    icon: UserRoundPlus,
    title: "Request a mentor",
    description: "Get matched with an experienced community member for 1:1 guidance.",
    action: "/mentor-request",
  },
];

interface SupportModalProps {
  /** "button" = full pill CTA with label (e.g. FAQ page footer).
   *  "fab" = small round floating action button (mounted globally). */
  variant?: "button" | "fab";
  className?: string;
}

const SupportModal = ({ variant = "button", className }: SupportModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (action: string) => {
    setOpen(false);
    if (action === "chatbot") {
      // The floating chat widget listens for this custom event to open itself.
      window.dispatchEvent(new CustomEvent("open-community-chatbot"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "fab" ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Get help"
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/70 text-primary shadow-lg backdrop-blur-xl transition-colors hover:bg-white/90 dark:border-white/10 dark:bg-background/70 dark:hover:bg-background/90",
              className,
            )}
          >
            <LifeBuoy className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={cn("mx-auto w-fit", className)}>
            <Button size="lg" className="gap-2 rounded-full shadow-lg">
              <LifeBuoy className="h-4 w-4" />
              Still need help?
            </Button>
          </motion.div>
        )}
      </DialogTrigger>
      <DialogContent className="border-white/40 bg-white/80 backdrop-blur-2xl dark:border-white/10 dark:bg-background/90 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How can we help?</DialogTitle>
          <DialogDescription>Pick whichever is easiest — the community is happy to help newcomers.</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-2">
          {SUPPORT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const content = (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-white/50 p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 dark:bg-white/[0.03]"
              >
                <span className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{option.title}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </span>
              </motion.div>
            );

            if (option.action === "chatbot") {
              return (
                <button key={option.title} type="button" onClick={() => handleOptionClick(option.action)} className="text-left">
                  {content}
                </button>
              );
            }

            if (option.action.startsWith("/")) {
              return (
                <Link key={option.title} to={option.action} onClick={() => setOpen(false)}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={option.title} href={option.action} onClick={() => setOpen(false)}>
                {content}
              </a>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
