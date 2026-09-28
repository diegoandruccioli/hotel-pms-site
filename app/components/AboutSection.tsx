import { Trans, useTranslation } from "react-i18next";
import { SectionBand, type SectionTone } from "./SectionBand";

export const CONTACT_EMAIL = "diegoandruccioli@gmail.com";

const CONTACT_VALUES = { email: CONTACT_EMAIL };

// Trans fills this element's content from the translation string; eslint cannot see that.
// eslint-disable-next-line jsx-a11y/anchor-has-content
const EMAIL_LINK = <a className="text-primary underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`} />;
const CONTACT_COMPONENTS = { email: EMAIL_LINK };

/** Product-first project summary: what Hotel PMS is and how to reach out, not a personal bio. */
export function AboutSection({ tone }: { tone?: SectionTone }) {
  const { t } = useTranslation("site");
  return (
    <SectionBand id="about" headingId="about-heading" tone={tone}>
      <h2 id="about-heading" className="font-display text-2xl font-semibold">
        {t("about_heading")}
      </h2>
      <p className="mt-3">{t("about_body")}</p>
      <p className="mt-3">
        <Trans t={t} i18nKey="about_contact" values={CONTACT_VALUES} components={CONTACT_COMPONENTS} />
      </p>
    </SectionBand>
  );
}
