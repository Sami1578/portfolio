import { jsx } from "react/jsx-runtime";
import "react";
const base = "group inline-flex items-center justify-center gap-2 font-mono-ui text-xs uppercase tracking-[0.18em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
const sizes = {
  md: "px-7 py-3.5",
  sm: "px-5 py-2.5"
};
const variants = {
  // Confident editorial ink button that warms to the accent on hover.
  primary: "bg-text text-bg hover:bg-accent",
  // Hairline-bordered secondary that inverts to ink on hover.
  ghost: "border border-border-strong text-text hover:bg-text hover:text-bg",
  // Inline underlined text link.
  link: "text-text hover:text-accent px-0 py-0 underline underline-offset-4 decoration-1 decoration-border-strong hover:decoration-accent"
};
function Button({ children, variant = "primary", size = "md", href, className = "", ...props }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, className: classes, ...props, children });
  }
  return /* @__PURE__ */ jsx("button", { className: classes, ...props, children });
}
export {
  Button as B
};
