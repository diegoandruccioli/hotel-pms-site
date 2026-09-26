import type { ButtonHTMLAttributes } from "react";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

interface M3ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function M3Button({ variant = "filled", className, type = "button", ...rest }: M3ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}
