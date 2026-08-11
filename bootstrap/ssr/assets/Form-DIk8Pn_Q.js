import { jsxs, jsx } from "react/jsx-runtime";
import { useForm } from "@inertiajs/react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import { L as ListRepeater } from "./ListRepeater-CQ9K3hhr.js";
import { T as Toggle } from "./Toggle-ChkV6bZx.js";
import { R as RichTextEditor } from "./RichTextEditor-CrtKH4AL.js";
import "react";
import "lucide-react";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "axios";
function PostForm({ post = null }) {
  const isEdit = !!post;
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const { data, setData, post: submitPost, processing, errors } = useForm({
    _method: isEdit ? "put" : "post",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    featured_image: null,
    tech_tags: post?.tech_tags ?? [],
    is_published: post?.is_published ?? false
  });
  console.log(post);
  const submit = (e) => {
    e.preventDefault();
    const url = isEdit ? resolve("admin.posts.update", post.id) : resolve("admin.posts.store");
    submitPost(url, { forceFormData: true });
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Card, { title: "Details", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx(FormField, { label: "Title", htmlFor: "title", error: errors.title, required: true, children: /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "title",
          value: data.title,
          onChange: (e) => setData("title", e.target.value),
          invalid: !!errors.title,
          autoFocus: true
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Excerpt", htmlFor: "excerpt", error: errors.excerpt, hint: "Short summary shown on the blog listing card.", children: /* @__PURE__ */ jsx(
        TextArea,
        {
          id: "excerpt",
          value: data.excerpt,
          onChange: (e) => setData("excerpt", e.target.value),
          invalid: !!errors.excerpt,
          rows: 2
        }
      ) }),
      /* @__PURE__ */ jsx(FormField, { label: "Content", htmlFor: "content", error: errors.content, required: true, children: /* @__PURE__ */ jsx(
        RichTextEditor,
        {
          value: data.content,
          onChange: (html) => setData("content", html),
          uploadUrl: resolve("admin.posts.upload-image")
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Featured image", description: "Used as the listing thumbnail and social preview image.", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      post?.featured_image_path && /* @__PURE__ */ jsx(
        "img",
        {
          src: `${post.featured_image_path}`,
          alt: "",
          className: "h-40 w-full rounded-md border border-border object-cover sm:w-64"
        }
      ),
      /* @__PURE__ */ jsx(FormField, { label: "Upload image", htmlFor: "featured_image", error: errors.featured_image, children: /* @__PURE__ */ jsx(
        "input",
        {
          id: "featured_image",
          type: "file",
          accept: "image/*",
          onChange: (e) => setData("featured_image", e.target.files?.[0] ?? null),
          className: "text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Tech tags", children: /* @__PURE__ */ jsx(
      ListRepeater,
      {
        items: data.tech_tags,
        onChange: (val) => setData("tech_tags", val),
        placeholder: "Laravel",
        addLabel: "Add tag",
        error: errors.tech_tags
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { title: "Settings", children: /* @__PURE__ */ jsx(
      Toggle,
      {
        checked: data.is_published,
        onChange: (val) => setData("is_published", val),
        label: "Published",
        description: "Published posts are visible on the public blog."
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.posts.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update post" : "Create post" })
    ] })
  ] });
}
export {
  PostForm as default
};
