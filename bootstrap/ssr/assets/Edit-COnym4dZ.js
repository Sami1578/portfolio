import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { L as ListRepeater } from "./ListRepeater-CQ9K3hhr.js";
import { G as GroupRepeater } from "./GroupRepeater-CmVSo66U.js";
import "react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./TextArea-Bzkoiz27.js";
function AboutEdit({ about }) {
  const { data, setData, put, processing, errors } = useForm({
    eyebrow: about.eyebrow || "",
    heading: about.heading || "",
    paragraphs: about.paragraphs || [],
    fields: about.fields || []
  });
  const resolve = (name) => typeof route === "function" ? route(name) : "#";
  const submit = (e) => {
    e.preventDefault();
    put(resolve("admin.about.update"), { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "About", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "About",
        description: "The narrative section and the key-value detail list."
      }
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx(Card, { title: "Heading", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(FormField, { label: "Eyebrow", htmlFor: "eyebrow", error: errors.eyebrow, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "eyebrow", value: data.eyebrow, onChange: (e) => setData("eyebrow", e.target.value), invalid: !!errors.eyebrow }) }),
        /* @__PURE__ */ jsx(FormField, { label: "Heading", htmlFor: "heading", error: errors.heading, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "heading", value: data.heading, onChange: (e) => setData("heading", e.target.value), invalid: !!errors.heading }) })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { title: "Paragraphs", description: "Each entry becomes a paragraph in the About body.", children: /* @__PURE__ */ jsx(
        ListRepeater,
        {
          items: data.paragraphs,
          onChange: (val) => setData("paragraphs", val),
          placeholder: "Write a paragraph…",
          addLabel: "Add paragraph",
          multiline: true,
          error: errors.paragraphs
        }
      ) }),
      /* @__PURE__ */ jsx(Card, { title: "Detail fields", description: "The label/value list beside the narrative.", children: /* @__PURE__ */ jsx(
        GroupRepeater,
        {
          items: data.fields,
          onChange: (val) => setData("fields", val),
          fields: [
            { key: "label", placeholder: "Role" },
            { key: "value", placeholder: "Full-Stack Developer" }
          ],
          addLabel: "Add field",
          error: errors.fields
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : "Save changes" }) })
    ] })
  ] });
}
export {
  AboutEdit as default
};
