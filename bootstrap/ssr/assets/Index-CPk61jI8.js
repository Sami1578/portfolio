import { jsxs, jsx } from "react/jsx-runtime";
import { Link, router } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { MessageSquare, Check, X } from "lucide-react";
import "react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
const TABS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" }
];
function CommentsIndex({ comments = [], status = "pending" }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    {
      key: "post",
      header: "Post",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.post?.title ?? "—" })
    },
    {
      key: "author",
      header: "Author",
      render: (row) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-text", children: row.author_name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-text-muted", children: row.author_email })
      ] })
    },
    {
      key: "body",
      header: "Comment",
      render: (row) => /* @__PURE__ */ jsx("p", { className: "max-w-md truncate text-text-muted", children: row.body })
    },
    {
      key: "status",
      header: "Status",
      render: (row) => /* @__PURE__ */ jsx(
        "span",
        {
          className: `rounded-full px-2 py-0.5 text-xs font-medium ${row.status === "approved" ? "bg-status/10 text-status" : row.status === "rejected" ? "bg-accent/10 text-accent" : "bg-border/60 text-text-muted"}`,
          children: row.status
        }
      )
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        row.status !== "approved" && /* @__PURE__ */ jsxs(AdminButton, { onClick: () => router.patch(resolve("admin.comments.approve", row.id), {}, { preserveScroll: true }), variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsx(Check, { size: 14 }),
          " Approve"
        ] }),
        row.status !== "rejected" && /* @__PURE__ */ jsxs(AdminButton, { onClick: () => router.patch(resolve("admin.comments.reject", row.id), {}, { preserveScroll: true }), variant: "secondary", size: "sm", children: [
          /* @__PURE__ */ jsx(X, { size: 14 }),
          " Reject"
        ] }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.comments.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Comments", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Inbox",
        title: "Comments",
        description: "Review and moderate comments left on blog posts."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mb-5 flex items-center gap-1 border-b border-border", children: TABS.map((tab) => /* @__PURE__ */ jsx(
      Link,
      {
        href: resolve("admin.comments.index") + `?status=${tab.key}`,
        className: `border-b-2 px-3 py-2 text-sm transition-colors ${status === tab.key ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text"}`,
        children: tab.label
      },
      tab.key
    )) }),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows: comments,
        empty: {
          icon: MessageSquare,
          title: "No comments",
          description: "Nothing here yet."
        }
      }
    )
  ] });
}
export {
  CommentsIndex as default
};
