import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Search } from "lucide-react";
function TagFilter({ routeName, tags = [], selectedTags = [], extraParams = {} }) {
  if (!tags.length) return null;
  const isSelected = (tag) => selectedTags.includes(tag);
  const buildParams = (tagsList) => ({
    ...extraParams,
    ...tagsList.length ? { tags: tagsList } : {}
  });
  const toggleTag = (tag) => {
    const next = isSelected(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];
    router.get(route(routeName), buildParams(next), {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  const clearAll = () => {
    router.get(route(routeName), buildParams([]), {
      preserveState: true,
      preserveScroll: true,
      replace: true
    });
  };
  const pillClass = (isActive) => [
    "rounded-full px-3 py-1 font-mono-ui text-[11px] uppercase tracking-widest transition-colors border cursor-pointer",
    isActive ? "bg-accent-soft border-accent-soft text-accent-deep font-semibold" : "border-border text-text-muted hover:border-accent-soft hover:text-text"
  ].join(" ");
  return /* @__PURE__ */ jsxs("div", { className: "mb-10 flex flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsx("button", { type: "button", onClick: clearAll, className: pillClass(selectedTags.length === 0), children: "All" }),
    tags.map((tag) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => toggleTag(tag),
        "aria-pressed": isSelected(tag),
        className: pillClass(isSelected(tag)),
        children: tag
      },
      tag
    )),
    selectedTags.length > 0 && /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: clearAll,
        className: "font-mono-ui text-[11px] uppercase tracking-widest text-text-muted underline underline-offset-2 hover:text-text ml-1",
        children: [
          "Clear (",
          selectedTags.length,
          ")"
        ]
      }
    )
  ] });
}
function SearchInput({
  routeName,
  initialValue = "",
  extraParams = {},
  placeholder = "Search…",
  className = ""
}) {
  const [value, setValue] = useState(initialValue);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const handle = setTimeout(() => {
      const params = { ...extraParams };
      if (value.trim()) {
        params.search = value.trim();
      }
      router.get(route(routeName), params, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    }, 350);
    return () => clearTimeout(handle);
  }, [value]);
  return /* @__PURE__ */ jsxs("div", { className: ["relative", className].join(" "), children: [
    /* @__PURE__ */ jsx(Search, { size: 15, className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value,
        onChange: (e) => setValue(e.target.value),
        placeholder,
        className: "w-full rounded-md border border-border bg-transparent py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus:border-accent-soft focus:outline-none"
      }
    )
  ] });
}
export {
  SearchInput as S,
  TagFilter as T
};
