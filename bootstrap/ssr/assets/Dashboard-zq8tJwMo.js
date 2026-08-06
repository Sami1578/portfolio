import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import { C as Card } from "./Card-BaIZw849.js";
import { E as EmptyState } from "./EmptyState-CgyiNVaa.js";
import { ArrowUpRight, Mail } from "lucide-react";
import "react";
import "./ThemeToggle-D0Maapqw.js";
function Dashboard({ stats = [], recentMessages = [] }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Dashboard", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Overview",
        title: "Dashboard",
        description: "Manage everything that appears on your public portfolio."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4 lg:grid-cols-4", children: stats.map((stat) => /* @__PURE__ */ jsxs(
      Link,
      {
        href: stat.href,
        className: "group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-strong",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-display text-3xl tracking-tight text-text", children: stat.value }),
            /* @__PURE__ */ jsx(
              ArrowUpRight,
              {
                size: 16,
                className: "text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted", children: stat.label })
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Card, { title: "Recent messages", description: "Latest submissions from your contact form.", children: recentMessages.length ? /* @__PURE__ */ jsx("ul", { className: "flex flex-col divide-y divide-border", children: recentMessages.map((msg) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
      Link,
      {
        href: typeof route === "function" ? route("admin.messages.show", msg.id) : "#",
        className: "flex items-center justify-between gap-4 py-3 transition-colors hover:text-accent",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-text", children: msg.subject }),
            /* @__PURE__ */ jsxs("p", { className: "truncate text-xs text-text-muted", children: [
              msg.name,
              " · ",
              msg.email
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 font-mono-ui text-xs text-text-muted", children: new Date(msg.created_at).toLocaleDateString() })
        ]
      }
    ) }, msg.id)) }) : /* @__PURE__ */ jsx(EmptyState, { icon: Mail, title: "No messages yet", description: "Contact form submissions will appear here." }) }) })
  ] });
}
export {
  Dashboard as default
};
