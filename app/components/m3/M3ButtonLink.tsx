import type { AnchorHTMLAttributes } from "react";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

interface M3ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
}

/** A link that looks like a button: navigation stays a link (Enter only, right semantics). */
export function M3ButtonLink({ variant = "filled", className, ...rest }: M3ButtonLinkProps) {
  // The caller supplies the accessible name as children; eslint cannot see through the spread.
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className={buttonClasses(variant, className)} {...rest} />;
}
