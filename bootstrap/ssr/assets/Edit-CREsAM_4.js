import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import { G as GroupRepeater } from "./GroupRepeater-CmVSo66U.js";
import "react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
function ContactEdit({ contact }) {
  const { data, setData, put, processing, errors } = useForm({
    contact_info: contact.contact_info || [],
    social_links: contact.social_links || [],
    whatsapp_number: contact.whatsapp_number || "",
    whatsapp_default_message: contact.whatsapp_default_message || ""
  });
  const resolve = (name) => typeof route === "function" ? route(name) : "#";
  const submit = (e) => {
    e.preventDefault();
    put(resolve("admin.contact.update"), { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Contact Details", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        eyebrow: "Content",
        title: "Contact details",
        description: "Contact methods, social links, and WhatsApp settings."
      }
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx(Card, { title: "Contact info", description: "Label/value pairs (email, phone, location).", children: /* @__PURE__ */ jsx(
        GroupRepeater,
        {
          items: data.contact_info,
          onChange: (val) => setData("contact_info", val),
          fields: [
            { key: "label", placeholder: "Email" },
            { key: "value", placeholder: "hello@example.com" }
          ],
          addLabel: "Add contact method",
          error: errors.contact_info
        }
      ) }),
      /* @__PURE__ */ jsx(Card, { title: "Social links", description: "Label + URL for each social profile.", children: /* @__PURE__ */ jsx(
        GroupRepeater,
        {
          items: data.social_links,
          onChange: (val) => setData("social_links", val),
          fields: [
            { key: "label", placeholder: "GitHub" },
            { key: "url", placeholder: "https://github.com/you" }
          ],
          addLabel: "Add social link",
          error: errors.social_links
        }
      ) }),
      /* @__PURE__ */ jsx(Card, { title: "WhatsApp", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "WhatsApp number",
            htmlFor: "whatsapp_number",
            error: errors.whatsapp_number,
            hint: "Include country code, digits only. e.g. 10000000000",
            required: true,
            children: /* @__PURE__ */ jsx(
              TextInput,
              {
                id: "whatsapp_number",
                value: data.whatsapp_number,
                onChange: (e) => setData("whatsapp_number", e.target.value),
                invalid: !!errors.whatsapp_number
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(FormField, { label: "Default message", htmlFor: "whatsapp_default_message", error: errors.whatsapp_default_message, required: true, children: /* @__PURE__ */ jsx(
          TextArea,
          {
            id: "whatsapp_default_message",
            value: data.whatsapp_default_message,
            onChange: (e) => setData("whatsapp_default_message", e.target.value),
            invalid: !!errors.whatsapp_default_message
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : "Save changes" }) })
    ] })
  ] });
}
export {
  ContactEdit as default
};
