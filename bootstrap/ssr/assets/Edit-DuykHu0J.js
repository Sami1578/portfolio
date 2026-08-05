import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CGnw3vJz.js";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import { T as Toggle } from "./Toggle-ChkV6bZx.js";
import { L as ListRepeater } from "./ListRepeater-CQ9K3hhr.js";
import { G as GroupRepeater } from "./GroupRepeater-CmVSo66U.js";
import "react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
function ProfileEdit({ profile }) {
  const { data, setData, put, processing, errors } = useForm({
    name: profile.name || "",
    initials: profile.initials || "",
    title: profile.title || "",
    tagline: profile.tagline || "",
    available: profile.available ?? true,
    availability_label: profile.availability_label || "",
    location: profile.location || "",
    stack: profile.stack || [],
    stats: profile.stats || []
  });
  const resolve = (name) => typeof route === "function" ? route(name) : "#";
  const submit = (e) => {
    e.preventDefault();
    put(resolve("admin.profile.update"), { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Profile", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Profile",
        description: "The hero identity, availability status, and headline stats."
      }
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { title: "Identity", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx(FormField, { label: "Name", htmlFor: "name", error: errors.name, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "name", value: data.name, onChange: (e) => setData("name", e.target.value), invalid: !!errors.name }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Initials", htmlFor: "initials", error: errors.initials, hint: "Shown in the avatar mark.", required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "initials", value: data.initials, onChange: (e) => setData("initials", e.target.value), invalid: !!errors.initials }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Title", htmlFor: "title", error: errors.title, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "title", value: data.title, onChange: (e) => setData("title", e.target.value), invalid: !!errors.title }) }),
          /* @__PURE__ */ jsx(FormField, { label: "Location", htmlFor: "location", error: errors.location, required: true, children: /* @__PURE__ */ jsx(TextInput, { id: "location", value: data.location, onChange: (e) => setData("location", e.target.value), invalid: !!errors.location }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(FormField, { label: "Tagline", htmlFor: "tagline", error: errors.tagline, required: true, children: /* @__PURE__ */ jsx(TextArea, { id: "tagline", value: data.tagline, onChange: (e) => setData("tagline", e.target.value), invalid: !!errors.tagline }) }) })
      ] }),
      /* @__PURE__ */ jsx(Card, { title: "Availability", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          Toggle,
          {
            label: "Available for work",
            description: "Controls the status dot shown on the site.",
            checked: data.available,
            onChange: (val) => setData("available", val)
          }
        ),
        /* @__PURE__ */ jsx(FormField, { label: "Availability label", htmlFor: "availability_label", error: errors.availability_label, required: true, children: /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "availability_label",
            value: data.availability_label,
            onChange: (e) => setData("availability_label", e.target.value),
            invalid: !!errors.availability_label
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { title: "Tech stack", description: "Short list of core technologies shown in the hero.", children: /* @__PURE__ */ jsx(
        ListRepeater,
        {
          items: data.stack,
          onChange: (val) => setData("stack", val),
          placeholder: "e.g. Laravel",
          addLabel: "Add technology",
          error: errors.stack
        }
      ) }),
      /* @__PURE__ */ jsx(Card, { title: "Stats", description: "Headline numbers (value + label).", children: /* @__PURE__ */ jsx(
        GroupRepeater,
        {
          items: data.stats,
          onChange: (val) => setData("stats", val),
          fields: [
            { key: "value", placeholder: "10+" },
            { key: "label", placeholder: "Projects shipped" }
          ],
          addLabel: "Add stat",
          error: errors.stats
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : "Save changes" }) })
    ] })
  ] });
}
export {
  ProfileEdit as default
};
