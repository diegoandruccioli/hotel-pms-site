import { useMatches } from "react-router";
import { isLang, type Lang } from "./site";

/** Language of the active route, read from the `handle.lang` each page route declares. */
export function useRouteLang(): Lang {
  const matches = useMatches();
  for (const match of matches) {
    const handle = match.handle;
    if (typeof handle === "object" && handle !== null && "lang" in handle && isLang(handle.lang)) {
      return handle.lang;
    }
  }
  return "en";
}
