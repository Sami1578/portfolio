import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import SkillCategoryForm from "./Form-qstXYIqo.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
function SkillCategoriesCreate() {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Category", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Skill categories", title: "New category" }),
    /* @__PURE__ */ jsx(SkillCategoryForm, {})
  ] });
}
export {
  SkillCategoriesCreate as default
};
