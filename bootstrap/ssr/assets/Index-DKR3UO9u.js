import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CGnw3vJz.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { Plus, Tags } from "lucide-react";
import "react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function SkillCategoriesIndex({ categories = [] }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    { key: "title", header: "Category", render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.title }) },
    {
      key: "skills_count",
      header: "Skills",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: row.skills_count })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.skill-categories.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(
          DeleteButton,
          {
            href: resolve("admin.skill-categories.destroy", row.id),
            confirmMessage: "Delete this category? Its skills will also be removed.",
            iconOnly: true
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Skill Categories", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Skill categories",
        description: "Group your skills (e.g. Backend, Frontend).",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.skill-categories.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New category"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows: categories,
        empty: {
          icon: Tags,
          title: "No categories yet",
          description: "Create a category before adding skills to it.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.skill-categories.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New category"
          ] })
        }
      }
    )
  ] });
}
export {
  SkillCategoriesIndex as default
};
