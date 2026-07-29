import { Fragment } from "react";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` on case-insensitive occurrences of `query` and wraps each
 * match in a <mark> so search results visibly show why they matched.
 * Returns the original text untouched if the query is empty/too short.
 */
export function highlightText(text: string, query: string) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return text;

  const pattern = new RegExp(`(${escapeRegExp(trimmed)})`, "gi");
  // With a capturing group, String.split alternates [text, match, text, match, ...]
  // so odd indices are always the matched substrings - no need to re-test the
  // (stateful, global) regex against each piece.
  const parts = text.split(pattern);

  if (parts.length === 1) return text;

  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded bg-accent/60 px-0.5 text-accent-foreground [.dark_&]:bg-accent/40">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
