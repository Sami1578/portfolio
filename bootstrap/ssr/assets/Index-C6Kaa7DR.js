import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { E as EmptyState } from "./EmptyState-CgyiNVaa.js";
import { Mail } from "lucide-react";
import "react";
import "./ThemeToggle-D0Maapqw.js";
function MessagesIndex({ messages = [] }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    {
      key: "from",
      header: "From",
      render: (row) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium text-text", children: row.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-text-muted", children: row.email })
      ] })
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: row.subject })
    },
    {
      key: "created_at",
      header: "Received",
      className: "whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted", children: new Date(row.created_at).toLocaleDateString() })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: resolve("admin.messages.show", row.id),
            className: "rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text",
            children: "View"
          }
        ),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.messages.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Messages", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Inbox",
        title: "Messages",
        description: "Contact form submissions from your portfolio site."
      }
    ),
    messages.length ? /* @__PURE__ */ jsx(DataTable, { columns, rows: messages }) : /* @__PURE__ */ jsx(
      EmptyState,
      {
        icon: Mail,
        title: "No messages yet",
        description: "Contact form submissions will appear here."
      }
    )
  ] });
}
export {
  MessagesIndex as default
};
