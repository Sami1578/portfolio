import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import ServiceForm from "./Form-CANtj-jC.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
import "./TextArea-Bzkoiz27.js";
function ServicesEdit({ service }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Service", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Services", title: "Edit service", description: service.title }),
    /* @__PURE__ */ jsx(ServiceForm, { service })
  ] });
}
export {
  ServicesEdit as default
};
