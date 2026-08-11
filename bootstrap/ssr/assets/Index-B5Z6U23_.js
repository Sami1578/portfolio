import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { Plus, Wrench } from "lucide-react";
import "react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function ServicesIndex({ services = [] }) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const columns = [
    { key: "title", header: "Title", render: (row) => /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.title }) },
    { key: "icon", header: "Icon", render: (row) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted", children: row.icon }) },
    {
      key: "description",
      header: "Description",
      render: (row) => /* @__PURE__ */ jsx("span", { className: "line-clamp-1 text-text-muted", children: row.description })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.services.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.services.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Services", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Services",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.services.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New service"
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows: services,
        empty: {
          icon: Wrench,
          title: "No services yet",
          description: "Add the services you offer to show them on your site.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.services.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New service"
          ] })
        }
      }
    )
  ] });
}
export {
  ServicesIndex as default
};
