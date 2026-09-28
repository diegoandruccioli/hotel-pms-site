// Live version of public/favicon.svg's monogram: same shape, but on M3 tokens so it follows
// the active theme (light/dark/high contrast) instead of the favicon's fixed colours — a
// browser tab icon can't react to the page's theme, this element can.
// aria-hidden: the adjacent site name (HomePage's <span>) already gives the accessible name.
export function Logo() {
  return (
    <span
      aria-hidden="true"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-shape-xs bg-primary text-xs font-bold text-on-primary"
    >
      H
    </span>
  );
}
