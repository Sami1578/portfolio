import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { L as Layout, C as Container } from "./Layout-YOvIwj3D.js";
import { S as SectionHeader } from "./SectionHeader-DR3FZHAX.js";
import { P as Pagination } from "./Pagination-BgJAkZWc.js";
import { S as SearchInput, T as TagFilter } from "./SearchInput-BBidT4nV.js";
import { Link } from "@inertiajs/react";
import { FileArchive, Images, Download } from "lucide-react";
import { B as Button } from "./BracketFrame-XJeLCd7A.js";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
function ResourceCard({ resource }) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const showThumb = resource.thumbnail_path && !thumbFailed;
  return /* @__PURE__ */ jsx(Link, { href: route("resources.show", resource.slug), className: "group block", children: /* @__PURE__ */ jsxs(Button, { className: "flex h-full flex-col overflow-hidden border border-border bg-surface/40 transition-colors group-hover:border-accent-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-video w-full overflow-hidden bg-ink-2", children: [
      showThumb ? /* @__PURE__ */ jsx(
        "img",
        {
          src: `/storage/${resource.thumbnail_path}`,
          alt: resource.title,
          onError: () => setThumbFailed(true),
          className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center text-text-muted", children: /* @__PURE__ */ jsx(FileArchive, { size: 28 }) }),
      resource.media_count > 1 && /* @__PURE__ */ jsxs("span", { className: "absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-white", children: [
        /* @__PURE__ */ jsx(Images, { size: 11 }),
        " ",
        resource.media_count
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-3 p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg text-text", children: resource.title }),
      /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm text-text-muted", children: resource.short_description }),
      resource.tech_tags?.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-auto flex flex-wrap gap-1.5 pt-1", children: resource.tech_tags.map((tag) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "rounded-full border border-border px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted",
          children: tag
        },
        tag
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border pt-3 font-mono-ui text-[11px] uppercase tracking-widest text-text-muted", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Download, { size: 12 }),
          " ",
          resource.download_count
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-accent transition-colors group-hover:text-accent-deep", children: "View →" })
      ] })
    ] })
  ] }) });
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
