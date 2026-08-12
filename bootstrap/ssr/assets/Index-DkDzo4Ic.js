import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { L as Layout, C as Container } from "./Layout-YOvIwj3D.js";
import { S as SectionHeader } from "./SectionHeader-DR3FZHAX.js";
import { P as Pagination } from "./Pagination-BgJAkZWc.js";
import { S as SearchInput, T as TagFilter } from "./SearchInput-BBidT4nV.js";
import { Link } from "@inertiajs/react";
import { Images, FileCode2, Download, ArrowUpRight } from "lucide-react";
import { B as Button } from "./BracketFrame-XJeLCd7A.js";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
function ResourceCard({ resource }) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const media = resource.media ?? [];
  const cover = media[0];
  const showThumb = cover?.url && cover.type !== "video" && !thumbFailed;
  const mediaCount = media.length;
  return /* @__PURE__ */ jsx(Link, { href: route("resources.show", resource.slug), className: "group block h-full", children: /* @__PURE__ */ jsxs(
    Button,
    {
      className: "relative flex h-full flex-col overflow-hidden border border-border bg-surface/40\n                   transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent-soft\n                   group-hover:shadow-[0_16px_40px_-16px_rgba(201,161,95,0.35)]",
      children: [
        showThumb && /* @__PURE__ */ jsxs("div", { className: "relative aspect-video w-full overflow-hidden bg-ink-2", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: cover.url,
              alt: resource.title,
              onError: () => setThumbFailed(true),
              className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" }),
          mediaCount > 1 && /* @__PURE__ */ jsxs("span", { className: "absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white backdrop-blur-sm", children: [
            /* @__PURE__ */ jsx(Images, { size: 11 }),
            " ",
            mediaCount
          ] }),
          resource.tech_tags?.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4", children: resource.tech_tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full border border-white/15 bg-black/50 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white/90 backdrop-blur-sm",
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-4 p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg leading-snug text-text transition-colors group-hover:text-accent", children: resource.title }),
            !showThumb && /* @__PURE__ */ jsx("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-accent", children: /* @__PURE__ */ jsx(FileCode2, { size: 15 }) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm leading-relaxed text-text-muted", children: resource.short_description }),
          !showThumb && resource.tech_tags?.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: resource.tech_tags.map((tag) => /* @__PURE__ */ jsx(
            "span",
            {
              className: "rounded-full border border-border px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted",
              children: tag
            },
            tag
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between border-t border-border pt-4 font-mono-ui text-[11px] uppercase tracking-widest text-text-muted", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Download, { size: 12 }),
              " ",
              resource.download_count ?? 0
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-accent transition-all duration-200 group-hover:gap-1.5 group-hover:text-accent-deep", children: [
              "Get resource",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 12, className: "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
function ResourcesIndex({
  profile,
  whatsapp,
  socialLinks,
  resources = { data: [], links: [] },
  availableTags = [],
  selectedTags = [],
  search = ""
}) {
  const resourceList = resources.data ?? [];
  return /* @__PURE__ */ jsx(
    Layout,
    {
      title: `Resources - ${profile.name}`,
      description: "Free code bundles, templates, and setup guides.",
      profile,
      whatsapp,
      socialLinks,
      children: /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 pt-40", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(
          SectionHeader,
          {
            eyebrow: "Resources",
            heading: "Downloads",
            description: "Code bundles and templates, free to use in your own projects."
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mb-6 max-w-sm", children: /* @__PURE__ */ jsx(
          SearchInput,
          {
            routeName: "resources.index",
            initialValue: search,
            extraParams: selectedTags.length ? { tags: selectedTags } : {},
            placeholder: "Search resources…"
          }
        ) }),
        /* @__PURE__ */ jsx(
          TagFilter,
          {
            routeName: "resources.index",
            tags: availableTags,
            selectedTags,
            extraParams: search ? { search } : {}
          }
        ),
        resourceList.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-text-muted", children: search || selectedTags.length > 0 ? "No resources match your filters." : "No resources published yet — check back soon." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: resourceList.map((resource) => /* @__PURE__ */ jsx(ResourceCard, { resource }, resource.id)) }),
          /* @__PURE__ */ jsx(Pagination, { links: resources.links })
        ] })
      ] }) })
    }
  );
}
export {
  ResourcesIndex as default
};
