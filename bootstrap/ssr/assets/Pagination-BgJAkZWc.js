import { jsx } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
function Pagination({ links = [], className = "" }) {
  if (!links || links.length <= 3) return null;
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Pagination",
      className: `mt-12 flex flex-wrap items-center justify-center gap-1.5 ${className}`,
      children: links.map((link, idx) => {
        const isTextArrow = idx === 0 || idx === links.length - 1;
        if (!link.url) {
          return /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-lg px-3 py-1.5 font-mono-ui text-xs text-text-muted/40 cursor-not-allowed select-none",
              dangerouslySetInnerHTML: { __html: link.label }
            },
            idx
          );
        }
        return /* @__PURE__ */ jsx(
          Link,
          {
            href: link.url,
            preserveScroll: true,
            preserveState: true,
            className: [
              "rounded-lg px-3 py-1.5 font-mono-ui text-xs transition-colors",
              link.active ? "bg-accent-soft text-accent-deep font-semibold" : "text-text-muted hover:bg-accent-soft/50 hover:text-text",
              isTextArrow ? "uppercase tracking-widest" : ""
            ].join(" "),
            dangerouslySetInnerHTML: { __html: link.label }
          },
          idx
        );
      })
    }
  );
}
export {
  Pagination as P
};
