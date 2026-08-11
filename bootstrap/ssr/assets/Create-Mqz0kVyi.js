import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import ProjectForm from "./Form-cOZzEhO7.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
import "./TextArea-Bzkoiz27.js";
import "./ListRepeater-CQ9K3hhr.js";
import "./GroupRepeater-CmVSo66U.js";
import "./Toggle-ChkV6bZx.js";
function ProjectsCreate() {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Project", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Projects", title: "New project" }),
    /* @__PURE__ */ jsx(ProjectForm, {})
  ] });
}
export {
  ProjectsCreate as default
};
