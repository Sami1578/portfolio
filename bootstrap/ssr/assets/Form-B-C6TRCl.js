import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import "react";
function SelectInput({ options = [], className = "", invalid = false, placeholder, ...props }) {
  return /* @__PURE__ */ jsxs(
    "select",
    {
      className: `w-full rounded-md border bg-bg px-3 py-2 text-sm text-text outline-none transition-colors focus:border-accent ${invalid ? "border-accent" : "border-border"} ${className}`,
      ...props,
      children: [
        placeholder && /* @__PURE__ */ jsx("option", { value: "", children: placeholder }),
        options.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
      ]
    }
  );
}
const LEVEL_OPTIONS = [
  { value: "Expert", label: "Expert" },
  { value: "Advanced", label: "Advanced" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Beginner", label: "Beginner" }
];
function SkillForm({ skill = null, categories = [] }) {
  const isEdit = !!skill;
  const { data, setData, post, put, processing, errors } = useForm({
    skill_category_id: skill?.skill_category_id ?? "",
    name: skill?.name ?? "",
    icon: skill?.icon ?? "",
    color: skill?.color ?? "",
    level: skill?.level ?? ""
  });
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const submit = (e) => {
    e.preventDefault();
    if (isEdit) {
      put(resolve("admin.skills.update", skill.id));
    } else {
      post(resolve("admin.skills.store"));
    }
  };
  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.title }));
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(FormField, { label: "Category", htmlFor: "skill_category_id", error: errors.skill_category_id, required: true, children: /* @__PURE__ */ jsx(
        SelectInput,
        {
          id: "skill_category_id",
          value: data.skill_category_id,
          onChange: (e) => setData("skill_category_id", e.target.value),
          options: categoryOptions,
          placeholder: "Select a category…",
          invalid: !!errors.skill_category_id
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Name", htmlFor: "name", error: errors.name, required: true, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "name",
          value: data.name,
          onChange: (e) => setData("name", e.target.value),
          invalid: !!errors.name,
          autoFocus: true
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Icon", htmlFor: "icon", error: errors.icon, hint: "Icon identifier used by the frontend (e.g. SiLaravel).", required: true, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "icon",
          value: data.icon,
          onChange: (e) => setData("icon", e.target.value),
          invalid: !!errors.icon
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Color", htmlFor: "color", error: errors.color, hint: "Tailwind color class or hex (e.g. #FF6B6B or text-red-500).", required: true, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "color",
          value: data.color,
          onChange: (e) => setData("color", e.target.value),
          invalid: !!errors.color
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Level", htmlFor: "level", error: errors.level, required: true, children: /* @__PURE__ */ jsx(
        SelectInput,
        {
          id: "level",
          value: data.level,
          onChange: (e) => setData("level", e.target.value),
          options: LEVEL_OPTIONS,
          placeholder: "Select a level…",
          invalid: !!errors.level
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.skills.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update skill" : "Create skill" })
    ] })
  ] });
}
export {
  SkillForm as default
};
