import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-DUMFrkAC.js";
import SkillForm from "./Form-B-C6TRCl.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
function SkillsCreate({ categories = [] }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Skill", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Skills", title: "New skill" }),
    /* @__PURE__ */ jsx(SkillForm, { categories })
  ] });
}
export {
  SkillsCreate as default
};
