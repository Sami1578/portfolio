import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import SkillForm from "./Form-B-C6TRCl.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
function SkillsEdit({ skill, categories = [] }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Skill", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Skills", title: "Edit skill", description: skill.name }),
    /* @__PURE__ */ jsx(SkillForm, { skill, categories })
  ] });
}
export {
  SkillsEdit as default
};
