import { jsxs, jsx } from "react/jsx-runtime";
function Card({ title, description, children, className = "" }) {
  return /* @__PURE__ */ jsxs("section", { className: `rounded-xl border border-border bg-surface ${className}`, children: [
    (title || description) && /* @__PURE__ */ jsxs("header", { className: "border-b border-border px-5 py-4", children: [
      title && /* @__PURE__ */ jsx("h2", { className: "font-display text-lg tracking-tight text-text", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-sm text-text-muted", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-5", children })
  ] });
}
export {
  Card as C
};
