import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "react";
import { Loader2, Send, MessageCircle, Eye } from "lucide-react";
import { B as Button, L as Layout, C as Container } from "./Layout-CSS0vIPJ.js";
import { useForm } from "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
const inputClasses = "w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300";
function CommentForm({ postSlug, commenterEmail }) {
  const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
    author_name: "",
    author_email: commenterEmail ?? "",
    body: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/posts/${postSlug}/comments`, {
      preserveScroll: true,
      onSuccess: () => reset("body")
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold text-text mb-6", children: "Leave a comment" }),
    recentlySuccessful && /* @__PURE__ */ jsx("div", { className: "mb-6 py-3 border-l-2 border-status pl-4 bg-status/5 text-status text-sm rounded-r", children: "Thanks! Your comment is awaiting review." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: data.author_name,
              onChange: (e) => setData("author_name", e.target.value),
              required: true,
              className: inputClasses,
              placeholder: "Jane Doe"
            }
          ),
          errors.author_name && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-accent", children: errors.author_name })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "email",
              value: data.author_email,
              onChange: (e) => setData("author_email", e.target.value),
              required: true,
              className: inputClasses,
              placeholder: "jane@example.com"
            }
          ),
          errors.author_email && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-accent", children: errors.author_email })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2", children: "Comment" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            rows: "3",
            value: data.body,
            onChange: (e) => setData("body", e.target.value),
            required: true,
            className: `${inputClasses} resize-none`,
            placeholder: "Share your thoughts..."
          }
        ),
        errors.body && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-accent", children: errors.body })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: processing, children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }),
        " Posting..."
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Send, { size: 16 }),
        " Post comment"
      ] }) })
    ] })
  ] });
}
function CommentList({ comments = [] }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h3", { className: "font-display text-xl font-bold text-text mb-6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(MessageCircle, { size: 20, className: "text-accent" }),
      comments.length > 0 ? `${comments.length} Comment${comments.length > 1 ? "s" : ""}` : "Comments"
    ] }),
    comments.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-text-muted", children: "Be the first to comment." }) : /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-6", children: comments.map((comment) => /* @__PURE__ */ jsxs("li", { className: "border-b border-border pb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-text", children: comment.author_name }),
        /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted", children: new Date(comment.created_at).toLocaleDateString(void 0, {
          year: "numeric",
          month: "short",
          day: "numeric"
        }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-text-muted leading-relaxed whitespace-pre-wrap", children: comment.body })
    ] }, comment.id)) })
  ] });
}
function BlogShow({ profile, whatsapp, socialLinks, post, comments = [], commenterEmail }) {
  return /* @__PURE__ */ jsx(
    Layout,
    {
      title: `${post.title} - ${profile.name}`,
      description: post.excerpt,
      profile,
      whatsapp,
      socialLinks,
      children: /* @__PURE__ */ jsx("article", { className: "py-24 md:py-32 pt-40", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-3xl", children: [
        post.tech_tags?.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: post.tech_tags.map((tag, idx) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "rounded-full bg-accent-soft px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-accent-deep",
            children: tag
          },
          idx
        )) }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl font-extrabold leading-tight text-text text-balance", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4 font-mono-ui text-xs uppercase tracking-[0.1em] text-text-muted", children: [
          /* @__PURE__ */ jsx("span", { children: post.published_at && new Date(post.published_at).toLocaleDateString(void 0, {
            year: "numeric",
            month: "short",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Eye, { size: 13 }),
            " ",
            post.view_count,
            " views"
          ] })
        ] }),
        post.featured_image_path && /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${post.featured_image_path}`,
            alt: post.title,
            className: "mt-10 w-full rounded-xl border border-border object-cover"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "post-content mt-10", dangerouslySetInnerHTML: { __html: post.content } }),
        /* @__PURE__ */ jsx("div", { className: "mt-16 border-t border-border pt-12", children: /* @__PURE__ */ jsx(CommentList, { comments }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 border-t border-border pt-12", children: /* @__PURE__ */ jsx(CommentForm, { postSlug: post.slug ?? "", commenterEmail }) })
      ] }) })
    }
  );
}
export {
  BlogShow as default
};
