import { jsx, jsxs } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import { D as DataTable, a as DeleteButton } from "./DeleteButton-CJDJVMry.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { useState } from "react";
import { router } from "@inertiajs/react";
import { P as Pagination } from "./Pagination-BgJAkZWc.js";
import { S as SearchInput, T as TagFilter } from "./SearchInput-BBidT4nV.js";
import { Plus, Boxes, FileArchive, Images, Download } from "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./EmptyState-CgyiNVaa.js";
function ActiveToggleCell({ resource, routeName = "admin.resources.toggle-active" }) {
  const [isActive, setIsActive] = useState(resource.is_active);
  const [pending, setPending] = useState(false);
  const toggle = () => {
    const next = !isActive;
    setIsActive(next);
    setPending(true);
    router.patch(
      route(routeName, resource.id),
      {},
      {
        preserveScroll: true,
        preserveState: true,
        onError: () => setIsActive(!next),
        // roll back on failure
        onFinish: () => setPending(false)
      }
    );
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: toggle,
      disabled: pending,
      "aria-pressed": isActive,
      className: [
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-60",
        isActive ? "bg-accent" : "bg-border"
      ].join(" "),
      children: /* @__PURE__ */ jsx(
        "span",
        {
          className: [
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
            isActive ? "translate-x-[18px]" : "translate-x-1"
          ].join(" ")
        }
      )
    }
  );
}
function ResourcesIndex({
  resources = { data: [], links: [] },
  availableTags = [],
  selectedTags = [],
  search = ""
}) {
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const rows = resources.data ?? [];
  const columns = [
    {
      key: "title",
      header: "Resource",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-border/30", children: [
          row.thumbnail_path ? /* @__PURE__ */ jsx("img", { src: `/storage/${row.thumbnail_path}`, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-text-muted", children: /* @__PURE__ */ jsx(FileArchive, { size: 14 }) }),
          row.media_count > 1 && /* @__PURE__ */ jsxs("span", { className: "absolute bottom-0.5 right-0.5 flex items-center gap-0.5 rounded bg-black/70 px-1 py-0.5 text-[9px] text-white", children: [
            /* @__PURE__ */ jsx(Images, { size: 9 }),
            " ",
            row.media_count
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: row.title }),
          row.short_description && /* @__PURE__ */ jsx("p", { className: "mt-0.5 max-w-md truncate text-xs text-text-muted", children: row.short_description })
        ] })
      ] })
    },
    {
      key: "tech_tags",
      header: "Tags",
      render: (row) => /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: (row.tech_tags ?? []).slice(0, 3).map((tag) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-text-muted",
          children: tag
        },
        tag
      )) })
    },
    {
      key: "download_count",
      header: "Downloads",
      className: "text-center",
      render: (row) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-text-muted", children: [
        /* @__PURE__ */ jsx(Download, { size: 13 }),
        " ",
        row.download_count
      ] })
    },
    {
      key: "is_active",
      header: "Active",
      className: "text-center",
      render: (row) => /* @__PURE__ */ jsx(ActiveToggleCell, { resource: row })
    },
    {
      key: "actions",
      header: "",
      className: "text-right w-px whitespace-nowrap",
      render: (row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.resources.edit", row.id), variant: "secondary", size: "sm", children: "Edit" }),
        /* @__PURE__ */ jsx(DeleteButton, { href: resolve("admin.resources.destroy", row.id), iconOnly: true })
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Resources", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Resources",
        description: "Downloadable code bundles and templates shown on the public resources page.",
        actions: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.resources.create"), children: [
          /* @__PURE__ */ jsx(Plus, { size: 15 }),
          " New resource"
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "mb-6 max-w-sm", children: /* @__PURE__ */ jsx(
      SearchInput,
      {
        routeName: "admin.resources.index",
        initialValue: search,
        extraParams: selectedTags.length ? { tags: selectedTags } : {},
        placeholder: "Search resources…"
      }
    ) }),
    /* @__PURE__ */ jsx(
      TagFilter,
      {
        routeName: "admin.resources.index",
        tags: availableTags,
        selectedTags,
        extraParams: search ? { search } : {}
      }
    ),
    /* @__PURE__ */ jsx(
      DataTable,
      {
        columns,
        rows,
        empty: {
          icon: Boxes,
          title: "No resources yet",
          description: "Add your first downloadable resource.",
          action: /* @__PURE__ */ jsxs(AdminButton, { as: "link", href: resolve("admin.resources.create"), size: "sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 14 }),
            " New resource"
          ] })
        }
      }
    ),
    rows.length > 0 && /* @__PURE__ */ jsx(Pagination, { links: resources.links })
  ] });
}
export {
  ResourcesIndex as default
};
