import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminLayout, P as PageHeader } from "./PageHeader-CujSf4Rc.js";
import PostForm from "./Form-DIk8Pn_Q.js";
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
function PostsCreate() {
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "New Post", children: [
    /* @__PURE__ */ jsx(PageHeader, { eyebrow: "Blog Posts", title: "New post" }),
    /* @__PURE__ */ jsx(PostForm, {})
  ] });
}
export {
  PostsCreate as default
};
