import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CGnw3vJz.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { Plus, Layers } from "lucide-react";
import "react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function SkillsIndex({ skills = [] }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    {
      key: "name",
      header: "Skill",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.name })
    },
    {
      key: "category",
      header: "Category",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: row.category?.title ?? "—" })
    },
    {
      key: "icon",
      header: "Icon",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted", children: row.icon })
    },
    {
      key: "level",
      header: "Level",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-border px-2 py-0.5 font-mono-ui text-xs text-text-muted", children: row.level })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.skills.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.skills.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Skills", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Skills",
        description: "Individual skills shown in the Skills section.",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.skills.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New skill"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows: skills,
        empty: {
          icon: Layers,
          title: "No skills yet",
          description: "Add skills after creating at least one skill category.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.skills.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New skill"
          ] })
        }
      }
    )
  ] });
}
export {
  SkillsIndex as default
};
