import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { C as Card } from "./Card-BaIZw849.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { T as TextArea } from "./TextArea-Bzkoiz27.js";
import { L as ListRepeater } from "./ListRepeater-CQ9K3hhr.js";
import { T as Toggle } from "./Toggle-ChkV6bZx.js";
import { R as RichTextEditor } from "./RichTextEditor-CrtKH4AL.js";
import { X, Film, FileArchive } from "lucide-react";
import "@tiptap/react";
import "@tiptap/starter-kit";
import "@tiptap/extension-link";
import "@tiptap/extension-image";
import "axios";
function ResourceForm({ resource = null }) {
  const isEdit = !!resource;
  const resolve = (name, param) => typeof route === "function" ? route(name, param) : "#";
  const [existingMedia, setExistingMedia] = useState(resource?.media ?? []);
  const [removingId, setRemovingId] = useState(null);
  const { data, setData, post: submitPost, processing, errors } = useForm({
    _method: isEdit ? "put" : "post",
    title: resource?.title ?? "",
    slug: resource?.slug ?? "",
    short_description: resource?.short_description ?? "",
    instructions: resource?.instructions ?? "",
    preview_files: [],
    code_bundle: null,
    tech_tags: resource?.tech_tags ?? [],
    is_active: resource?.is_active ?? false
  });
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    setData("preview_files", [...data.preview_files, ...files]);
    e.target.value = "";
  };
  const removeNewFile = (index) => {
    setData("preview_files", data.preview_files.filter((_, i) => i !== index));
  };
  const removeExistingMedia = (media) => {
    if (!confirm("Remove this media item?")) return;
    setRemovingId(media.id);
    router.delete(route("admin.resources.media.destroy", [resource.id, media.id]), {
      preserveScroll: true,
      onSuccess: () => setExistingMedia((current) => current.filter((m) => m.id !== media.id)),
      onFinish: () => setRemovingId(null)
    });
  };
  const submit = (e) => {
    e.preventDefault();
    const url = isEdit ? resolve("admin.resources.update", resource.id) : resolve("admin.resources.store");
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
      /* @__PURE__ */ jsx(
        FormField,
        {
          label: "Slug",
          htmlFor: "slug",
          error: errors.slug,
          hint: "Leave blank to auto-generate from the title.",
          children: /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "slug",
              value: data.slug,
              onChange: (e) => setData("slug", e.target.value),
              invalid: !!errors.slug
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          label: "Short description",
          htmlFor: "short_description",
          error: errors.short_description,
          hint: "Shown on the resources listing card.",
          required: true,
          children: /* @__PURE__ */ jsx(
            TextArea,
            {
              id: "short_description",
              value: data.short_description,
              onChange: (e) => setData("short_description", e.target.value),
              invalid: !!errors.short_description,
              rows: 2
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(FormField, { label: "Setup instructions", htmlFor: "instructions", error: errors.instructions, children: /* @__PURE__ */ jsx(
        RichTextEditor,
        {
          value: data.instructions,
          onChange: (html) => setData("instructions", html),
          uploadUrl: resolve("admin.posts.upload-image")
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(
      Card,
      {
        title: "Media",
        description: "Screenshots or short clips shown in the gallery on the public listing and detail pages. Upload as many as you like.",
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          existingMedia.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4", children: existingMedia.map((media) => /* @__PURE__ */ jsxs("div", { className: "group relative aspect-video overflow-hidden rounded-md border border-border", children: [
            media.type === "video" ? /* @__PURE__ */ jsx("video", { src: `/storage/${media.path}`, className: "h-full w-full object-cover", muted: true }) : /* @__PURE__ */ jsx("img", { src: `/storage/${media.path}`, alt: "", className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeExistingMedia(media),
                disabled: removingId === media.id,
                "aria-label": "Remove media",
                className: "absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60",
                children: /* @__PURE__ */ jsx(X, { size: 13 })
              }
            ),
            media.type === "video" && /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 left-1 rounded bg-black/70 p-1 text-white", children: /* @__PURE__ */ jsx(Film, { size: 11 }) })
          ] }, media.id)) }),
          data.preview_files.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 sm:grid-cols-4", children: data.preview_files.map((file, index) => /* @__PURE__ */ jsxs("div", { className: "group relative aspect-video overflow-hidden rounded-md border border-dashed border-accent-soft", children: [
            /* @__PURE__ */ jsx("img", { src: URL.createObjectURL(file), alt: "", className: "h-full w-full object-cover" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => removeNewFile(index),
                "aria-label": "Remove from upload queue",
                className: "absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100",
                children: /* @__PURE__ */ jsx(X, { size: 13 })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 left-1 rounded bg-accent px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-white", children: "New" })
          ] }, `${file.name}-${index}`)) }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "Add media",
              htmlFor: "preview_files",
              error: errors.preview_files || errors["preview_files.0"],
              hint: "Images or short videos. You can select multiple files at once, or add more in separate passes.",
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "preview_files",
                  type: "file",
                  multiple: true,
                  accept: "image/*,video/mp4,video/webm",
                  onChange: handleFilesChange,
                  className: "text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
                }
              )
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Card, { title: "Code bundle", description: "ZIP file made available via the download button on the public page.", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      resource?.code_bundle_path && /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm text-text-muted", children: [
        /* @__PURE__ */ jsx(FileArchive, { size: 14 }),
        "Current file: ",
        /* @__PURE__ */ jsx("span", { className: "text-text", children: resource.code_bundle_original_name ?? "code-bundle.zip" }),
        " ",
        "— uploading a new one will replace it."
      ] }),
      /* @__PURE__ */ jsx(FormField, { label: "Upload ZIP", htmlFor: "code_bundle", error: errors.code_bundle, children: /* @__PURE__ */ jsx(
        "input",
        {
          id: "code_bundle",
          type: "file",
          accept: ".zip",
          onChange: (e) => setData("code_bundle", e.target.files?.[0] ?? null),
          className: "text-sm text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-accent"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(Card, { title: "Tags", children: /* @__PURE__ */ jsx(
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
        checked: data.is_active,
        onChange: (val) => setData("is_active", val),
        label: "Active",
        description: "Active resources are visible on the public resources page."
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx(AdminButton, { as: "link", href: resolve("admin.resources.index"), variant: "secondary", children: "Cancel" }),
      /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, children: processing ? "Saving…" : isEdit ? "Update resource" : "Create resource" })
    ] })
  ] });
}
export {
  ResourceForm as default
};
