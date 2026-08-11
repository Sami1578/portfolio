import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { usePage, Link, Head, router } from "@inertiajs/react";
import { LayoutDashboard, User, FileText, Wrench, FolderKanban, Tags, Layers, BookOpen, Phone, Mail, MessageSquare, CheckCircle2, AlertCircle, X, Menu, ExternalLink, LogOut } from "lucide-react";
import { T as ThemeToggle } from "./ThemeToggle-D0Maapqw.js";
const nav = [
  { section: "Overview", items: [{ label: "Dashboard", href: "admin.dashboard", icon: LayoutDashboard }] },
  {
    section: "Content",
    items: [
      { label: "Profile", href: "admin.profile.edit", icon: User },
      { label: "About", href: "admin.about.edit", icon: FileText },
      { label: "Services", href: "admin.services.index", icon: Wrench },
      { label: "Projects", href: "admin.projects.index", icon: FolderKanban },
      { label: "Skill Categories", href: "admin.skill-categories.index", icon: Tags },
      { label: "Skills", href: "admin.skills.index", icon: Layers },
      { label: "Blog Posts", href: "admin.posts.index", icon: BookOpen },
      { label: "Resources", href: "admin.resources.index", icon: FolderKanban },
      { label: "Contact Details", href: "admin.contact.edit", icon: Phone }
    ]
  },
  {
    section: "Inbox",
    items: [
      { label: "Messages", href: "admin.messages.index", icon: Mail },
      { label: "Comments", href: "admin.comments.index", icon: MessageSquare }
    ]
  }
];
function Sidebar({ onNavigate }) {
  const { url } = usePage();
  const resolve = (name) => typeof route === "function" ? route(name) : "#";
  const isActive = (name) => {
    try {
      return typeof route === "function" ? route().current(name) : false;
    } catch {
      return false;
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: "flex h-full flex-col gap-8 p-6", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: resolve("admin.dashboard"),
        className: "font-display text-xl tracking-tight text-text",
        onClick: onNavigate,
        children: [
          "Admin",
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-7", children: nav.map((group) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted", children: group.section }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-0.5", children: group.items.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href) || url.startsWith(resolve(item.href).replace(window.location.origin, ""));
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: resolve(item.href),
            onClick: onNavigate,
            className: `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-accent/10 text-accent" : "text-text-muted hover:bg-border/40 hover:text-text"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { size: 17, strokeWidth: 1.75 }),
              item.label
            ]
          }
        ) }, item.href);
      }) })
    ] }, group.section)) })
  ] });
}
function FlashToast() {
  const { flash } = usePage().props;
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState({ type: "success", message: "" });
  useEffect(() => {
    const message = flash?.success || flash?.error;
    if (!message) return;
    setContent({ type: flash.success ? "success" : "error", message });
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 4e3);
    return () => clearTimeout(timer);
  }, [flash]);
  if (!visible) return null;
  const isSuccess = content.type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: "fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 shadow-lg",
      children: [
        /* @__PURE__ */ jsx(Icon, { size: 18, className: isSuccess ? "text-status" : "text-accent" }),
        /* @__PURE__ */ jsx("p", { className: "flex-1 text-sm text-text", children: content.message }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setVisible(false),
            className: "text-text-muted transition-colors hover:text-text",
            "aria-label": "Dismiss notification",
            children: /* @__PURE__ */ jsx(X, { size: 16 })
          }
        )
      ]
    }
  );
}
function AdminLayout({ title, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth } = usePage().props;
  const resolve = (name) => typeof route === "function" ? route(name) : "#";
  const logout = () => router.post(resolve("logout"));
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-bg text-text", children: [
    title && /* @__PURE__ */ jsx(Head, { title }),
    /* @__PURE__ */ jsx("aside", { className: "fixed inset-y-0 left-0 hidden w-64 border-r border-border bg-surface lg:block", children: /* @__PURE__ */ jsx(Sidebar, {}) }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-40 lg:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-text/40",
          onClick: () => setMobileOpen(false),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx("aside", { className: "absolute inset-y-0 left-0 w-64 border-r border-border bg-surface", children: /* @__PURE__ */ jsx(Sidebar, { onNavigate: () => setMobileOpen(false) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:pl-64", children: [
      /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setMobileOpen(!mobileOpen),
              className: "text-text-muted transition-colors hover:text-text lg:hidden",
              "aria-label": mobileOpen ? "Close menu" : "Open menu",
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { size: 20 }) : /* @__PURE__ */ jsx(Menu, { size: 20 })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted", children: "Portfolio CMS" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: resolve("home"),
              target: "_blank",
              rel: "noreferrer",
              className: "hidden items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text sm:flex",
              children: [
                "View site ",
                /* @__PURE__ */ jsx(ExternalLink, { size: 14 })
              ]
            }
          ),
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx("span", { className: "hidden text-sm text-text-muted sm:inline", children: auth?.user?.name }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: logout,
              className: "flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-text transition-colors hover:border-border-strong",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 15 }),
                " ",
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Logout" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10", children })
    ] }),
    /* @__PURE__ */ jsx(FlashToast, {})
  ] });
}
function PageHeader({ eyebrow, title, description, actions }) {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsx("p", { className: "mb-1 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted", children: eyebrow }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl tracking-tight text-text sm:text-3xl", children: title }),
      description && /* @__PURE__ */ jsx("p", { className: "mt-1 max-w-xl text-sm text-text-muted", children: description })
    ] }),
    actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: actions })
  ] });
}
export {
  AdminLayout as A,
  PageHeader as P
};
