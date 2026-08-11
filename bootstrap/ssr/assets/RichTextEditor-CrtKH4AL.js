import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { Heading1, Heading2, Heading3, Bold, Italic, List, ListOrdered, Quote, Code, Link as Link$1, Image as Image$1, Undo, Redo } from "lucide-react";
const ToolbarButton = ({ onClick, active, disabled, title, children }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick,
    disabled,
    title,
    className: `rounded-md p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-accent/10 text-accent" : "text-text-muted hover:bg-border/40 hover:text-text"}`,
    children
  }
);
function RichTextEditor({ value, onChange, uploadUrl }) {
  const fileInputRef = useRef(null);
  const uploadImage = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(uploadUrl, formData);
    return data.url;
  }, [uploadUrl]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
      Image
    ],
    content: value,
    onUpdate: ({ editor: editor2 }) => onChange(editor2.getHTML()),
    editorProps: {
      attributes: {
        class: "post-content prose-editor min-h-[260px] max-w-none px-3 py-2 text-sm text-text focus:outline-none"
      },
      handleDrop: (view, event) => {
        const file = event.dataTransfer?.files?.[0];
        if (file && file.type.startsWith("image/")) {
          event.preventDefault();
          uploadImage(file).then((url) => {
            const { schema } = view.state;
            const node = schema.nodes.image.create({ src: url });
            const transaction = view.state.tr.insert(view.state.selection.from, node);
            view.dispatch(transaction);
          });
          return true;
        }
        return false;
      },
      handlePaste: (view, event) => {
        const file = Array.from(event.clipboardData?.files ?? []).find((f) => f.type.startsWith("image/"));
        if (file) {
          event.preventDefault();
          uploadImage(file).then((url) => {
            const { schema } = view.state;
            const node = schema.nodes.image.create({ src: url });
            const transaction = view.state.tr.insert(view.state.selection.from, node);
            view.dispatch(transaction);
          });
          return true;
        }
        return false;
      }
    }
  });
  if (!editor) return null;
  const handleToolbarUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    editor.chain().focus().setImage({ src: url }).run();
    e.target.value = "";
  };
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Link URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-border bg-bg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border p-2", children: [
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Heading 1", active: editor.isActive("heading", { level: 1 }), onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), children: /* @__PURE__ */ jsx(Heading1, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Heading 2", active: editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: /* @__PURE__ */ jsx(Heading2, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Heading 3", active: editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), children: /* @__PURE__ */ jsx(Heading3, { size: 16 }) }),
      /* @__PURE__ */ jsx("span", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Bold", active: editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run(), children: /* @__PURE__ */ jsx(Bold, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Italic", active: editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ jsx(Italic, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Bullet list", active: editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run(), children: /* @__PURE__ */ jsx(List, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Ordered list", active: editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run(), children: /* @__PURE__ */ jsx(ListOrdered, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Blockquote", active: editor.isActive("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run(), children: /* @__PURE__ */ jsx(Quote, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Code block", active: editor.isActive("codeBlock"), onClick: () => editor.chain().focus().toggleCodeBlock().run(), children: /* @__PURE__ */ jsx(Code, { size: 16 }) }),
      /* @__PURE__ */ jsx("span", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Link", active: editor.isActive("link"), onClick: setLink, children: /* @__PURE__ */ jsx(Link$1, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Insert image", onClick: handleToolbarUploadClick, children: /* @__PURE__ */ jsx(Image$1, { size: 16 }) }),
      /* @__PURE__ */ jsx("span", { className: "mx-1 h-5 w-px bg-border" }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Undo", disabled: !editor.can().undo(), onClick: () => editor.chain().focus().undo().run(), children: /* @__PURE__ */ jsx(Undo, { size: 16 }) }),
      /* @__PURE__ */ jsx(ToolbarButton, { title: "Redo", disabled: !editor.can().redo(), onClick: () => editor.chain().focus().redo().run(), children: /* @__PURE__ */ jsx(Redo, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsx(EditorContent, { editor }),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFileChange
      }
    )
  ] });
}
export {
  RichTextEditor as R
};
