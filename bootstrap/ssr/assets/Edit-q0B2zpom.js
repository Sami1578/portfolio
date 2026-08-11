import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import ResourceForm from "./Form-CuJrrGCb.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
import "./TextArea-Bzkoiz27.js";
import "./ListRepeater-CQ9K3hhr.js";
import "./Toggle-ChkV6bZx.js";
import "./RichTextEditor-CrtKH4AL.js";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "axios";
function ResourcesEdit({ resource }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Resource", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Resources", title: "Edit resource", description: resource.title }),
    /* @__PURE__ */ jsx(ResourceForm, { resource })
  ] });
}
export {
  ResourcesEdit as default
};
