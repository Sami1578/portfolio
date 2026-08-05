import { jsxs, jsx } from "react/jsx-runtime";
function Toggle({ checked, onChange, label, description }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      label && /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-text", children: label }),
      description && /* @__PURE__ */ jsx("p", { className: "text-xs text-text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": checked,
        onClick: () => onChange(!checked),
        className: `relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors ${checked ? "bg-accent" : "bg-border"}`,
        children: /* @__PURE__ */ jsx(
          "span",
          {
            className: `inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`
          }
        )
      }
    )
  ] });
}
export {
  Toggle as T
};
