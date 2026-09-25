import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("it", "routes/home-it.tsx")] satisfies RouteConfig;
