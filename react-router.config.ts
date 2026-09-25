import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  // Static site: no server runtime, every route is prerendered to plain HTML.
  ssr: false,
  prerender: ["/", "/it"],
} satisfies Config;
