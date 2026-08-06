import { jsxs, jsx } from "react/jsx-runtime";
import "react";
function SectionHeader({ eyebrow, heading, description, index, align = "left" }) {
  const centered = align === "center";
  return /* @__PURE__ */ jsxs("div", { className: `mb-14 ${centered ? "text-center" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`, children: [
      index && /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-2 py-1 rounded-full", children: index }),
      /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep", children: eyebrow })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end ${centered ? "text-center" : ""}`, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-text text-balance lg:col-span-8", children: heading }),
      description && /* @__PURE__ */ jsx("p", { className: `text-text-muted leading-relaxed lg:col-span-4 ${centered ? "" : "lg:pb-1"}`, children: description })
    ] })
  ] });
}
export {
  SectionHeader as S
};
