import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CGnw3vJz.js";
import SkillCategoryForm from "./Form-qstXYIqo.js";
import "react";
import "@inertiajs/react";
import "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "./Card-BaIZw849.js";
import "./AdminButton-Dfp76XtD.js";
import "./TextInput-DU1M0Yh9.js";
function SkillCategoriesEdit({ category }) {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Edit Category", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Skill categories", title: "Edit category", description: category.title }),
    /* @__PURE__ */ jsx(SkillCategoryForm, { category })
  ] });
}
export {
  SkillCategoriesEdit as default
};
