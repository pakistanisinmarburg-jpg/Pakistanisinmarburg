import { useCallback, useEffect, useState } from "react";

/**
 * Personal, per-browser FAQ preferences: bookmarked questions and
 * helpful/not-helpful votes. Stored in localStorage only (no backend table
 * for this yet), so these reflect "your" saved questions and feedback on
 * this device, not site-wide aggregate counts.
 */

const BOOKMARKS_KEY = "faq:bookmarks";
const VOTES_KEY = "faq:votes";

export type FaqVote = "up" | "down";

type VotesMap = Record<string, FaqVote>;

function readBookmarks(): Set<string> {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr) : new Set();
  } catch {
    return new Set();
  }
}

function readVotes(): VotesMap {
  try {
    const raw = localStorage.getItem(VOTES_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

export function useFaqPreferences() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => readBookmarks());
  const [votes, setVotes] = useState<VotesMap>(() => readVotes());

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  }, [votes]);

  const isBookmarked = useCallback((id: string) => bookmarks.has(id), [bookmarks]);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const getVote = useCallback((id: string): FaqVote | null => votes[id] ?? null, [votes]);

  const castVote = useCallback((id: string, vote: FaqVote) => {
    setVotes((prev) => {
      const next = { ...prev };
      // Clicking the same vote again clears it (un-vote).
      if (next[id] === vote) {
        delete next[id];
      } else {
        next[id] = vote;
      }
      return next;
    });
  }, []);

  return {
    bookmarkedIds: bookmarks,
    bookmarkCount: bookmarks.size,
    isBookmarked,
    toggleBookmark,
    getVote,
    castVote,
  };
}
