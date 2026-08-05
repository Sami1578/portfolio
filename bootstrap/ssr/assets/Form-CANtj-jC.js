import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import "react";
function ServiceForm({ service = null }) {
  const isEdit = !!service;
  const { data, setData, post, put, processing, errors } = useForm({
    icon: service?.icon || "",
    title: service?.title || "",
    description: service?.description || ""
  });
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve("admin.services.update", service.id));
    } else {
      post(resolve("admin.services.store"));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(FormField, { label: "Title", htmlFor: "title", error: errors.title, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "title", value: data.title, onChange: (e) => setData("title", e.target.value), invalid: !!errors.title }) }),
      /* @__PURE__ */ jsx(FormField, { label: "Icon", htmlFor: "icon", error: errors.icon, hint: "Icon name/key used by the frontend.", required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "icon", value: data.icon, onChange: (e) => setData("icon", e.target.value), invalid: !!errors.icon }) }),
      /* @__PURE__ */ jsx(FormField, { label: "Description", htmlFor: "description", error: errors.description, required: true, children: /* @__PURE__ */ jsx(TextArea, { id: "description", value: data.description, onChange: (e) => setData("description", e.target.value), invalid: !!errors.description }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.services.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update service" : "Create service" })
    ] })
  ] });
}
export {
  ServiceForm as default
};
