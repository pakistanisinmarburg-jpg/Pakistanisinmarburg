import { useCallback, useEffect, useState } from "react";

/**
 * Generic per-browser "saved items" set, namespaced so Events, Gallery, FAQ,
 * etc. each get their own independent localStorage bucket
 * (key: `bookmarks:<namespace>`). Personal to this device - not shared/global.
 */
export function useBookmarks(namespace: string) {
  const storageKey = `bookmarks:${namespace}`;

  const [ids, setIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? new Set(arr) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(ids)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, storageKey]);

  const isSaved = useCallback((id: string) => ids.has(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { savedIds: ids, count: ids.size, isSaved, toggle };
}
