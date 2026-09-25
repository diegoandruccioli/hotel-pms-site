import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import { SkipLink } from "./components/SkipLink";
import { getI18n } from "./i18n";
import { useRouteLang } from "./useRouteLang";

export function Layout({ children }: { children: ReactNode }) {
  const lang = useRouteLang();
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const lang = useRouteLang();
  return (
    <I18nextProvider i18n={getI18n(lang)}>
      <SkipLink />
      <Outlet />
    </I18nextProvider>
  );
}
