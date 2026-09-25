import { HomePage } from "../components/HomePage";
import { buildMeta } from "../meta";

export const handle = { lang: "it" };

export function meta() {
  return buildMeta("it");
}

export default HomePage;
