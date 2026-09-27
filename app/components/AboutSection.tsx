import { Trans, useTranslation } from "react-i18next";
import { M3Card } from "./m3/M3Card";

export const CONTACT_EMAIL = "diegoandruccioli@gmail.com";

const CONTACT_VALUES = { email: CONTACT_EMAIL };

// Trans fills this element's content from the translation string; eslint cannot see that.
// eslint-disable-next-line jsx-a11y/anchor-has-content
const EMAIL_LINK = <a className="text-primary underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`} />;
const CONTACT_COMPONENTS = { email: EMAIL_LINK };

/** Product-first project summary: what Hotel PMS is and how to reach out, not a personal bio. */
export function AboutSection() {
  const { t } = useTranslation("site");
  return (
    <M3Card className="mt-12 max-w-prose" aria-labelledby="about-heading">
      <h2 id="about-heading" className="font-display text-2xl font-semibold">
        {t("about_heading")}
      </h2>
      <p className="mt-3">{t("about_body")}</p>
      <p className="mt-3">
        <Trans t={t} i18nKey="about_contact" values={CONTACT_VALUES} components={CONTACT_COMPONENTS} />
      </p>
    </M3Card>
  );
}
