import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import "react";
function SkillCategoryForm({ category = null }) {
  const isEdit = !!category;
  const { data, setData, post, put, processing, errors } = useForm({
    title: category?.title || ""
  });
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve("admin.skill-categories.update", category.id));
    } else {
      post(resolve("admin.skill-categories.store"));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(FormField, { label: "Title", htmlFor: "title", error: errors.title, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "title", value: data.title, onChange: (e) => setData("title", e.target.value), invalid: !!errors.title, autoFocus: true }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.skill-categories.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update category" : "Create category" })
    ] })
  ] });
}
export {
  SkillCategoryForm as default
};
