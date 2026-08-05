import { jsx, jsxs } from "react/jsx-runtime";
import { E as EmptyState } from "./EmptyState-CgyiNVaa.js";
import { router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
function DataTable({ columns = [], rows = [], empty }) {
  if (!rows.length) {
    return /* @__PURE__ */ jsx(EmptyState, { ...empty });
  }
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-surface", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: "border-b border-border", children: columns.map((col) => /* @__PURE__ */ jsx(
      "th",
      {
        className: `px-4 py-3 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted ${col.className || ""}`,
        children: col.header
      },
      col.key
    )) }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row) => /* @__PURE__ */ jsx("tr", { className: "border-b border-border last:border-0 hover:bg-bg/50", children: columns.map((col) => /* @__PURE__ */ jsx("td", { className: `px-4 py-3 align-middle text-text ${col.className || ""}`, children: col.render ? col.render(row) : row[col.key] }, col.key)) }, row.id)) })
  ] }) }) });
}
function DeleteButton({ href, label = "Delete", confirmMessage = "Are you sure you want to delete this? This cannot be undone.", iconOnly = false }) {
  const handleDelete = () => {
    if (window.confirm(confirmMessage)) {
      router.delete(href, { preserveScroll: true });
    }
  };
  if (iconOnly) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: handleDelete,
        className: "rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent",
        "aria-label": label,
        children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: handleDelete,
      className: "inline-flex items-center gap-1.5 rounded-md border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10",
      children: [
        /* @__PURE__ */ jsx(Trash2, { size: 14 }),
        " ",
        label
      ]
    }
  );
}
export {
  DataTable as D,
  DeleteButton as a
};
