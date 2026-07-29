import { useLocation } from "react-router-dom";
import SupportModal from "./SupportModal";

// Keeps /admin and /auth free of extra floating UI - everywhere else gets
// a quick-access "get help" button (bottom-left, so it never collides with
// the community chat bubble docked bottom-right).
const EXCLUDED_PREFIXES = ["/admin", "/auth"];

const GlobalSupportFab = () => {
  const { pathname } = useLocation();
  if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <SupportModal variant="fab" />
    </div>
  );
};

export default GlobalSupportFab;
