import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { L as Layout, C as Container } from "./Layout-Dc2wfF-X.js";
import { S as SectionHeader } from "./SectionHeader-DR3FZHAX.js";
import { Link } from "@inertiajs/react";
import { Eye } from "lucide-react";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
function PostCard({ post }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      href: `/posts/${post.slug}`,
      className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover-lift",
      children: [
        /* @__PURE__ */ jsx("div", { className: "image-zoom aspect-[16/9] w-full overflow-hidden bg-surface-2", children: post.featured_image_path ? /* @__PURE__ */ jsx(
          "img",
          {
            src: `/storage/${post.featured_image_path}`,
            alt: post.title,
            className: "h-full w-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-text-muted", children: /* @__PURE__ */ jsx("span", { className: "font-display text-2xl", children: "SA." }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-3 p-6", children: [
          post.tech_tags?.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: post.tech_tags.slice(0, 3).map((tag, idx) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full bg-accent-soft px-2.5 py-0.5 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-accent-deep",
              children: tag
            },
            idx
          )) }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-xl font-bold leading-snug text-text transition-colors duration-300 group-hover:text-accent", children: post.title }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed text-text-muted", children: post.excerpt }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between pt-2 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted", children: [
            /* @__PURE__ */ jsx("span", { children: post.published_at && new Date(post.published_at).toLocaleDateString(void 0, {
              year: "numeric",
              month: "short",
              day: "numeric"
            }) }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { size: 13 }),
              " ",
              post.view_count
            ] })
          ] })
        ] })
      ]
    }
  );
}
function BlogIndex({ profile, whatsapp, socialLinks, posts = [] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${profile.name} - Blog`,
    description: "Articles on Laravel, React, and full-stack development.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}`,
      datePublished: post.published_at
    }))
  };
  return /* @__PURE__ */ jsx(
    Layout,
    {
      title: `Blog - ${profile.name}`,
      description: "Articles on Laravel, React, and full-stack development.",
      profile,
      whatsapp,
      socialLinks,
      jsonLd,
      children: /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 pt-40", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(
          SectionHeader,
          {
            eyebrow: "Blog",
            heading: "Writing",
            description: "Notes on the stacks and problems I work with."
          }
        ),
        posts.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-text-muted", children: "No posts published yet — check back soon." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: posts.map((post) => /* @__PURE__ */ jsx(PostCard, { post }, post.id)) })
      ] }) })
    }
  );
}
export {
  BlogIndex as default
};
