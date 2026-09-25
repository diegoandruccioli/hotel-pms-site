import { HomePage } from "../components/HomePage";
import { buildMeta } from "../meta";

export const handle = { lang: "en" };

export function meta() {
  return buildMeta("en");
}

export default HomePage;
