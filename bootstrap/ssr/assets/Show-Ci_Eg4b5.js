import { jsxs, jsx } from "react/jsx-runtime";
import { router } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { ArrowLeft, Trash2 } from "lucide-react";
import "react";
import "./ThemeToggle-D0Maapqw.js";
function MessagesShow({ message }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const destroy = () => {
    if (confirm("Delete this message? This cannot be undone.")) {
      router.delete(resolve("admin.messages.destroy", message.id), {
        onSuccess: () => router.visit(resolve("admin.messages.index"))
      });
    }
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Message", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Inbox",
        title: message.subject,
        actions: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.messages.index"), variant: "secondary", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { size: 15 }),
            " Back"
          ] }),
          /* @__PURE__ */ jsxs(AdminButton, { variant: "danger", onClick: destroy, children: [
            /* @__PURE__ */ jsx(Trash2, { size: 15 }),
            " Delete"
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx("dl", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
        { label: "From", value: message.name },
        { label: "Email", value: message.email },
        { label: "Received", value: new Date(message.created_at).toLocaleString() }
      ].map(({ label, value }) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("dt", { className: "font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted", children: label }),
        /* @__PURE__ */ jsx("dd", { className: "mt-0.5 text-sm text-text", children: value })
      ] }, label)) }) }),
      /* @__PURE__ */ jsx(Card, { title: "Message", children: /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-sm leading-relaxed text-text", children: message.message }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: `mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`,
          className: "inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm text-text transition-colors hover:border-border-strong",
          children: "Reply via email ↗"
        }
      ) })
    ] })
  ] });
}
export {
  MessagesShow as default
};
