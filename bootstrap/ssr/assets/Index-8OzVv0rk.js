import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { Plus, FolderKanban, Star } from "lucide-react";
import "react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function ProjectsIndex({ projects = [] }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    {
      key: "sort_order",
      header: "#",
      className: "w-10",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted", children: row.sort_order })
    },
    {
      key: "title",
      header: "Project",
      render: (row) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.title }),
        row.subtitle && /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-text-muted", children: row.subtitle })
      ] })
    },
    {
      key: "architecture_tag",
      header: "Architecture",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted", children: row.architecture_tag || "—" })
    },
    {
      key: "is_featured",
      header: "Featured",
      className: "text-center",
      render: (row) => row.is_featured ? /* @__PURE__ */ jsx(Star, { size: 14, className: "mx-auto fill-accent text-accent" }) : /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: "—" })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.projects.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.projects.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Projects", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Projects",
        description: "Case studies and work shown in the Projects section.",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.projects.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New project"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows: projects,
        empty: {
          icon: FolderKanban,
          title: "No projects yet",
          description: "Add your first case study or project.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.projects.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New project"
          ] })
        }
      }
    )
  ] });
}
export {
  ProjectsIndex as default
};
