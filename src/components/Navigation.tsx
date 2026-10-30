import { navItems, type NavItem } from "../data/wedding";
import { cn } from "../utils/cn";

export interface NavigationProps {
  activeSection: string;
  onNavigate?: (id: string) => void;
  items?: NavItem[] | Array<[string, string]>;
  className?: string;
}

export function Navigation({
  activeSection,
  onNavigate,
  items = navItems,
  className = "",
}: NavigationProps) {
  const handleNavigate = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const normalizedItems: Array<{ id: string; label: string }> = items.map((item) => {
    if (Array.isArray(item)) {
      return { id: item[0], label: item[1] };
    }
    return item;
  });

  return (
    <nav className={cn("chapter-nav", className)} aria-label="Invitation chapters">
      {normalizedItems.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleNavigate(id)}
          className={activeSection === id ? "active" : ""}
          aria-label={`Go to ${label}`}
        >
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
