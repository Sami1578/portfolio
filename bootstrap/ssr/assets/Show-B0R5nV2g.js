import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { L as Layout, C as Container, B as Button$1 } from "./Layout-DgwpV-0y.js";
import { B as Button } from "./BracketFrame-XJeLCd7A.js";
import { FileArchive, Film, Download } from "lucide-react";
import "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
function ResourceShow({ profile, whatsapp, socialLinks, resource }) {
  const media = resource.media ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex];
  return /* @__PURE__ */ jsx(
    Layout,
    {
      title: `${resource.title} - ${profile.name}`,
      description: resource.short_description,
      profile,
      whatsapp,
      socialLinks,
      children: /* @__PURE__ */ jsx("section", { className: "py-24 md:py-32 pt-40", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-6 flex flex-wrap gap-1.5", children: resource.tech_tags?.map((tag) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "rounded-full border border-border px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest text-text-muted",
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsx("h1", { className: "font-heading text-3xl md:text-4xl text-text mb-3", children: resource.title }),
        /* @__PURE__ */ jsx("p", { className: "text-text-muted mb-8", children: resource.short_description }),
        /* @__PURE__ */ jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsx(Button, { className: "overflow-hidden border border-border bg-ink-2", children: active ? active.type === "video" ? /* @__PURE__ */ jsx(
            "video",
            {
              src: `/storage/${active.path}`,
              controls: true,
              className: "aspect-video w-full bg-black"
            },
            active.id
          ) : /* @__PURE__ */ jsx(
            "img",
            {
              src: `/storage/${active.path}`,
              alt: resource.title,
              className: "aspect-video w-full object-cover"
            },
            active.id
          ) : /* @__PURE__ */ jsx("div", { className: "flex aspect-video items-center justify-center text-text-muted", children: /* @__PURE__ */ jsx(FileArchive, { size: 32 }) }) }),
          media.length > 1 && /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto pb-1", children: media.map((item, index) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveIndex(index),
              className: [
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition-colors",
                index === activeIndex ? "border-accent" : "border-border hover:border-accent-soft"
              ].join(" "),
              children: item.type === "video" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("video", { src: `/storage/${item.path}`, className: "h-full w-full object-cover", muted: true }),
                /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 right-1 rounded bg-black/70 p-0.5 text-white", children: /* @__PURE__ */ jsx(Film, { size: 10 }) })
              ] }) : /* @__PURE__ */ jsx("img", { src: `/storage/${item.path}`, alt: "", className: "h-full w-full object-cover" })
            },
            item.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-center justify-between rounded-md border border-border p-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-heading text-text", children: "Code package" }),
            /* @__PURE__ */ jsxs("p", { className: "font-mono-ui text-[11px] uppercase tracking-widest text-text-muted", children: [
              resource.download_count,
              " download",
              resource.download_count === 1 ? "" : "s"
            ] })
          ] }),
          resource.has_code_bundle ? /* @__PURE__ */ jsxs(Button$1, { as: "a", href: route("resources.download", resource.slug), size: "md", children: [
            /* @__PURE__ */ jsx(Download, { size: 15 }),
            " Download"
          ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-text-muted", children: "No file attached" })
        ] }),
        resource.instructions && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-heading text-xl text-text mb-4", children: "Setup instructions" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "prose prose-invert max-w-none prose-headings:font-heading prose-a:text-accent",
              dangerouslySetInnerHTML: { __html: resource.instructions }
            }
          )
        ] })
      ] }) })
    }
  );
}
export {
  ResourceShow as default
};
