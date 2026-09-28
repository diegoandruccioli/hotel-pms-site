import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// One entry per SectionBand id (About … StatusSection), reusing each section's own heading
// key — no separate copy of the label to keep in sync.
const SECTIONS = [
  { id: "about", headingKey: "about_heading" },
  { id: "screenshots", headingKey: "screenshots_heading" },
  { id: "architecture", headingKey: "architecture_heading" },
  { id: "decisions", headingKey: "decisions_heading" },
  { id: "security", headingKey: "security_heading" },
  { id: "quality", headingKey: "quality_heading" },
  { id: "hotels", headingKey: "hotels_heading" },
  { id: "status", headingKey: "status_heading" },
] as const;

const LINK_BASE = "block shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold";

/**
 * In-page index for the long stack of sections below the hero. The links work as plain anchors
 * with no JavaScript at all (progressive enhancement); the IntersectionObserver only adds the
 * "current section" highlight once it runs client-side — the prerendered HTML has none active.
 */
export function SectionNav() {
  const { t } = useTranslation("site");
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label={t("label_page_sections")} className="sticky top-0 z-10 overflow-x-auto border-b border-outline-variant bg-surface">
      <ul className="mx-auto flex max-w-6xl gap-1 px-6">
        {SECTIONS.map(({ id, headingKey }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={isActive ? `${LINK_BASE} border-primary text-primary` : `${LINK_BASE} border-transparent`}
              >
                {t(headingKey)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
