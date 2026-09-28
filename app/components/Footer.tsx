import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CONTACT_EMAIL } from "./AboutSection";

const EMAIL_VALUES = { email: CONTACT_EMAIL };

// Trans fills this element's content from the translation string; eslint cannot see that.
// eslint-disable-next-line jsx-a11y/anchor-has-content
const EMAIL_LINK = <a className="text-primary underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`} />;
const EMAIL_COMPONENTS = { email: EMAIL_LINK };

// No link to the source repository (user decision) and no personal links (LinkedIn, CV) — this
// site is a product showcase, not a personal one; see AboutSection.
export function Footer() {
  const { t } = useTranslation("site");
  const yearValues = useMemo(() => ({ year: new Date().getFullYear() }), []);

  return (
    <footer className="border-t border-outline-variant px-6 py-10">
      <div className="mx-auto max-w-3xl text-sm">
        <p>
          <Trans t={t} i18nKey="footer_contact" values={EMAIL_VALUES} components={EMAIL_COMPONENTS} />
        </p>
        <p className="mt-2">
          <Trans t={t} i18nKey="footer_copyright" values={yearValues} />
        </p>
      </div>
    </footer>
  );
}
