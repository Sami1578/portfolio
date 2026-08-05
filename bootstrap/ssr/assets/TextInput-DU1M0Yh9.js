import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
function FormField({ label, htmlFor, error, hint, required, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor,
        className: "font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted",
        children: [
          label,
          " ",
          required && /* @__PURE__ */ jsx("span", { className: "text-accent", children: "*" })
        ]
      }
    ),
    children,
    hint && !error && /* @__PURE__ */ jsx("p", { className: "text-xs text-text-muted", children: hint }),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-accent", children: error })
  ] });
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", invalid = false, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type,
      className: `w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-text-muted/60 focus:border-accent ${invalid ? "border-accent" : "border-border"} ${className}`,
      ...props
    }
  );
});
export {
  FormField as F,
  TextInput as T
};
