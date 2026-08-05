import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import { L as ListRepeater } from "./ListRepeater-CQ9K3hhr.js";
import { G as GroupRepeater } from "./GroupRepeater-CmVSo66U.js";
import { T as Toggle } from "./Toggle-ChkV6bZx.js";
import "react";
import "lucide-react";
function ProjectForm({ project = null }) {
  const isEdit = !!project;
  const { data, setData, post, put, processing, errors } = useForm({
    title: project?.title ?? "",
    subtitle: project?.subtitle ?? "",
    architecture_tag: project?.architecture_tag ?? "",
    description: project?.description ?? "",
    highlights: project?.highlights ?? [],
    stats: project?.stats ?? [],
    tech_stack: project?.tech_stack ?? [],
    is_featured: project?.is_featured ?? false,
    sort_order: project?.sort_order ?? 0
  });
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve("admin.projects.update", project.id));
    } else {
      post(resolve("admin.projects.store"));
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Card, { title: "Details", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(FormField, { label: "Title", htmlFor: "title", error: errors.title, required: true, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "title",
          value: data.title,
          onChange: (e) => setData("title", e.target.value),
          invalid: !!errors.title,
          autoFocus: true
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Subtitle", htmlFor: "subtitle", error: errors.subtitle, hint: "Short context line (e.g. 'MENA Region · NDA Protected').", children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "subtitle",
          value: data.subtitle,
          onChange: (e) => setData("subtitle", e.target.value),
          invalid: !!errors.subtitle
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Architecture tag", htmlFor: "architecture_tag", error: errors.architecture_tag, hint: "e.g. 'REST API · Event-Driven · Multi-Tenant'", children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "architecture_tag",
          value: data.architecture_tag,
          onChange: (e) => setData("architecture_tag", e.target.value),
          invalid: !!errors.architecture_tag
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Description", htmlFor: "description", error: errors.description, required: true, children: /* @__PURE__ */ jsx(
        TextArea,
        {
          id: "description",
          value: data.description,
          onChange: (e) => setData("description", e.target.value),
          invalid: !!errors.description,
          rows: 4
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Highlights", children: /* @__PURE__ */ jsx(
      ListRepeater,
      {
        items: data.highlights,
        onChange: (val) => setData("highlights", val),
        placeholder: "Built RBAC system supporting 5 roles…",
        addLabel: "Add highlight",
        error: errors.highlights
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { title: "Stats", children: /* @__PURE__ */ jsx(
      GroupRepeater,
      {
        items: data.stats,
        fields: [
          { key: "value", placeholder: "35%" },
          { key: "label", placeholder: "Query speed improvement" }
        ],
        onChange: (val) => setData("stats", val),
        addLabel: "Add stat",
        error: errors.stats
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { title: "Tech stack", children: /* @__PURE__ */ jsx(
      ListRepeater,
      {
        items: data.tech_stack,
        onChange: (val) => setData("tech_stack", val),
        placeholder: "Laravel",
        addLabel: "Add technology",
        error: errors.tech_stack
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { title: "Settings", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(
        Toggle,
        {
          checked: data.is_featured,
          onChange: (val) => setData("is_featured", val),
          label: "Featured project",
          description: "Featured projects are highlighted on the portfolio."
        }
      ),
      /* @__PURE__ */ jsx(FormField, { label: "Sort order", htmlFor: "sort_order", error: errors.sort_order, hint: "Lower numbers appear first.", children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "sort_order",
          type: "number",
          min: "0",
          value: data.sort_order,
          onChange: (e) => setData("sort_order", parseInt(e.target.value, 10) || 0),
          invalid: !!errors.sort_order,
          className: "w-32"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.projects.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update project" : "Create project" })
    ] })
  ] });
}
export {
  ProjectForm as default
};
