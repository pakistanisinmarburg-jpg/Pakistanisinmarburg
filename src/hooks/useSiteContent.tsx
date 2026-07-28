import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CONTENT_DEFAULTS } from "@/content/defaults";

type Overrides = Record<string, string>;

const SiteContentContext = createContext<{ overrides: Overrides; refresh: () => Promise<void> }>({
  overrides: {},
  refresh: async () => {},
});

export const SiteContentProvider = ({ children }: { children: ReactNode }) => {
  const [overrides, setOverrides] = useState<Overrides>({});

  const refresh = async () => {
    const { data } = await supabase.from("site_content").select("content_key, value");
    if (data) {
      setOverrides(Object.fromEntries(data.map((r) => [r.content_key, r.value])));
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(() => ({ overrides, refresh }), [overrides]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

/** Returns a getter for editable site copy, falling back to the built-in default. */
export const useContent = () => {
  const { overrides } = useContext(SiteContentContext);
  return (key: string, fallback?: string) =>
    overrides[key] ?? CONTENT_DEFAULTS[key]?.value ?? fallback ?? "";
};

export const useSiteContentAdmin = () => useContext(SiteContentContext);
