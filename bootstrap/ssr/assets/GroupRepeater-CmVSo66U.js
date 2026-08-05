import { jsxs, jsx } from "react/jsx-runtime";
import { Trash2, Plus } from "lucide-react";
import { T as TextInput } from "./TextInput-DU1M0Yh9.js";
function GroupRepeater({ label, items = [], fields = [], onChange, addLabel = "Add row", error }) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, ""]));
  const update = (index, key, value) => {
    const next = items.map((item, i) => i === index ? { ...item, [key]: value } : item);
    onChange(next);
  };
  const add = () => onChange([...items, blank()]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    label && /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted", children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 rounded-md border border-border bg-bg p-2", children: [
      /* @__PURE__ */ jsx("div", { className: "grid flex-1 gap-2 sm:grid-cols-2", children: fields.map((field) => /* @__PURE__ */ jsx(
        TextInput,
        {
          value: item?.[field.key] ?? "",
          onChange: (e) => update(index, field.key, e.target.value),
          placeholder: field.placeholder || field.key
        },
        field.key
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => remove(index),
          className: "flex-shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent",
          "aria-label": "Remove row",
          children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
        }
      )
    ] }, index)) }),
    error && /* @__PURE__ */ jsx("p", { className: "text-xs text-accent", children: error }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: add,
        className: "mt-1 inline-flex w-fit items-center gap-1.5 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent",
        children: [
          /* @__PURE__ */ jsx(Plus, { size: 14 }),
          " ",
          addLabel
        ]
      }
    )
  ] });
}
export {
  GroupRepeater as G
};
