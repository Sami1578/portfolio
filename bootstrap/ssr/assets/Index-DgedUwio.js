import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { P as Pagination } from "./Pagination-BgJAkZWc.js";
import { Plus, BookOpen, Eye } from "lucide-react";
import "react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function PostsIndex({ posts = { data: [], links: [] } }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const rows = posts.data ?? [];
  const columns = [
    {
      key: "title",
      header: "Post",
      render: (row) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.title }),
        row.excerpt && /* @__PURE__ */ jsx("p", { className: "mt-0.5 max-w-md truncate text-xs text-text-muted", children: row.excerpt })
      ] })
    },
    {
      key: "is_published",
      header: "Status",
      render: (row) => row.is_published ? /* @__PURE__ */ jsx("span", { className: "rounded-full bg-status/10 px-2 py-0.5 text-xs font-medium text-status", children: "Published" }) : /* @__PURE__ */ jsx("span", { className: "rounded-full bg-border/60 px-2 py-0.5 text-xs font-medium text-text-muted", children: "Draft" })
    },
    {
      key: "view_count",
      header: "Views",
      className: "text-center",
      render: (row) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-text-muted", children: [
        /* @__PURE__ */ jsx(Eye, { size: 13 }),
        " ",
        row.view_count
      ] })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.posts.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.posts.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Blog Posts", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Blog Posts",
        description: "Write and manage articles shown on the public blog.",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.posts.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New post"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows,
        empty: {
          icon: BookOpen,
          title: "No posts yet",
          description: "Write your first blog post.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.posts.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New post"
          ] })
        }
      }
    ),
    rows.length > 0 && /* @__PURE__ */ jsx(Pagination, { links: posts.links })
  ] });
}
export {
  PostsIndex as default
};
