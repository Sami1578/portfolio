import { jsxs, jsx } from "react/jsx-runtime";
import { Inbox } from "lucide-react";
function EmptyState({ title = "Nothing here yet", description, icon: Icon = Inbox, action }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center", children: [
    /* @__PURE__ */ jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-full bg-bg text-text-muted", children: /* @__PURE__ */ jsx(Icon, { size: 20 }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "font-display text-lg text-text", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-text-muted", children: description })
    ] }),
    action
  ] });
}
export {
  EmptyState as E
};
