import { jsxs, jsx } from "react/jsx-runtime";
import { GripVertical, Trash2, Plus } from "lucide-react";
import { T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
function ListRepeater({
  label,
  items = [],
  onChange,
  placeholder = "",
  addLabel = "Add item",
  multiline = false,
  error
}) {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };
  const add = () => onChange([...items, ""]);
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const Field = multiline ? TextArea : TextInput;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    label && /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted", children: label }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: items.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsx(GripVertical, { size: 16, className: "mt-2.5 flex-shrink-0 text-text-muted/50" }),
      /* @__PURE__ */ jsx(
        Field,
        {
          value: item ?? "",
          onChange: (e) => update(index, e.target.value),
          placeholder,
          rows: multiline ? 2 : void 0
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => remove(index),
          className: "mt-1.5 flex-shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-accent/10 hover:text-accent",
          "aria-label": "Remove item",
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
  ListRepeater as L
};
