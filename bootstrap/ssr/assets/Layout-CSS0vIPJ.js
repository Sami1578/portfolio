import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { X, Menu, MessageCircle } from "lucide-react";
import { T as ThemeToggle } from "./ThemeToggle-D0Maapqw.js";
import { FaGithub, FaLinkedin } from "react-icons/fa";
function Container({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 ${className}`, children });
}
const base = "group inline-flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl";
const sizes = {
  md: "px-6 py-3.5",
  sm: "px-5 py-2.5 text-[13px]"
};
const variants = {
  // Confident dark/accent CTA — the primary action everywhere on the site.
  primary: "bg-text text-bg hover:bg-accent hover:text-white hover:-translate-y-0.5",
  // Hairline-bordered secondary.
  ghost: "border border-border-strong text-text bg-surface hover:bg-surface-2 hover:-translate-y-0.5",
  // Inline underlined text link.
  link: "text-text hover:text-accent px-0 py-0 underline underline-offset-4 decoration-1 decoration-border-strong hover:decoration-accent rounded-none"
};
function Button({ children, variant = "primary", size = "md", href, className = "", ...props }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return /* @__PURE__ */ jsx("a", { href, className: classes, ...props, children });
  }
  return /* @__PURE__ */ jsx("button", { className: classes, ...props, children });
}
function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  return scrolled;
}
const siteConfig = {
  brandName: "SA.",
  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "/posts" },
    { name: "Contact", href: "#contact" }
  ],
  ctaLabel: "Hire me"
};
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(50);
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled || isOpen ? "bg-bg/85 backdrop-blur-md border-border" : "bg-bg/85 backdrop-blur-md border-transparent md:bg-transparent md:backdrop-blur-none"}`,
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20", children: [
          /* @__PURE__ */ jsx(Link, { href: "/", className: "font-display text-xl font-extrabold tracking-tight text-text", children: siteConfig.brandName }),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-9", children: [
            siteConfig.navLinks.map((link) => /* @__PURE__ */ jsx(
              "a",
              {
                href: link.href,
                className: "font-medium text-sm text-text-muted hover:text-text transition-colors duration-200",
                children: link.name
              },
              link.name
            )),
            /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "primary", size: "sm", children: siteConfig.ctaLabel }),
            /* @__PURE__ */ jsx(ThemeToggle, {})
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 md:hidden", children: [
            /* @__PURE__ */ jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsOpen(!isOpen),
                className: "text-text hover:text-accent transition-colors",
                "aria-label": isOpen ? "Close menu" : "Open menu",
                children: isOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Menu, { size: 22 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsxs("div", { className: "py-6 space-y-5 border-t border-border", children: [
          siteConfig.navLinks.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: "block font-medium text-sm text-text-muted hover:text-text transition-colors duration-200",
              onClick: () => setIsOpen(false),
              children: link.name
            },
            link.name
          )),
          /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "primary", size: "sm", className: "w-full", onClick: () => setIsOpen(false), children: siteConfig.ctaLabel })
        ] }) })
      ] })
    }
  );
}
function Footer({ profile }) {
  const name = profile?.name || "";
  const title = profile?.title || "";
  return /* @__PURE__ */ jsx("footer", { className: "bg-bg border-t border-border pt-14 pb-8", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-xl font-bold text-text", children: name }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-text-muted", children: title })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#home",
          className: "group inline-flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted hover:text-accent transition-colors duration-200",
          children: [
            "Back to top",
            /* @__PURE__ */ jsx("span", { className: "transition-transform duration-200 group-hover:-translate-y-0.5", children: "↑" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-text-muted", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      name,
      ". All rights reserved."
    ] }) })
  ] }) });
}
function FloatingSocialDock({ socialLinks, whatsapp }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);
  const findLink = (name) => socialLinks?.find((l) => l?.name?.toLowerCase() === name)?.href;
  const github = findLink("github");
  const linkedin = findLink("linkedin");
  const whatsappUrl = whatsapp?.phoneNumber && `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || "Hello!")}`;
  const items = [
    github && { key: "github", href: github, label: "GitHub", Icon: FaGithub, size: "sm" },
    linkedin && { key: "linkedin", href: linkedin, label: "LinkedIn", Icon: FaLinkedin, size: "sm" },
    whatsappUrl && { key: "whatsapp", href: whatsappUrl, label: "Chat on WhatsApp", Icon: MessageCircle, size: "lg" }
  ].filter(Boolean);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-8 z-50 flex flex-col-reverse gap-3", children: items.map(({ key, href, label, Icon, size }, idx) => /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": label,
      title: label,
      className: `group relative flex items-center justify-center rounded-full shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-accent/30 ${size === "lg" ? "w-14 h-14 bg-text text-bg hover:bg-accent" : "w-11 h-11 bg-surface border border-border text-text-muted hover:text-accent hover:border-accent/40"} ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`,
      style: { transitionDelay: `${idx * 90}ms` },
      children: [
        /* @__PURE__ */ jsx(Icon, { size: size === "lg" ? 24 : 18 }),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded bg-text px-2.5 py-1 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100", children: label })
      ]
    },
    key
  )) });
}
const SITE_ORIGIN = "https://samiahmed.dev";
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
function Layout({ children, title, description, profile, whatsapp, socialLinks }) {
  const metaTitle = title || "Sami Ahmed | Full-Stack Software Engineer";
  const metaDescription = description || "Full-Stack Software Engineer Portfolio";
  const { url } = usePage().props;
  const canonicalUrl = url?.canonical ?? SITE_ORIGIN;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "description", name: "description", content: metaDescription }),
      /* @__PURE__ */ jsx("link", { "head-key": "canonical", rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:title", property: "og:title", content: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:description", property: "og:description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:type", property: "og:type", content: "website" }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:url", property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:image", property: "og:image", content: OG_IMAGE }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:site_name", property: "og:site_name", content: "Sami Ahmed" }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:card", name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:title", name: "twitter:title", content: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:description", name: "twitter:description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:image", name: "twitter:image", content: OG_IMAGE }),
      profile && /* @__PURE__ */ jsx("script", { "head-key": "json-ld", type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profile.name,
        "jobTitle": profile.title,
        "url": SITE_ORIGIN,
        "description": metaDescription,
        "sameAs": [
          "https://www.linkedin.com/in/sami-ahmed-3021b4287/",
          "https://github.com/Sami1578"
        ],
        "knowsAbout": [
          "Laravel",
          "React.js",
          "Next.js",
          "Vue.js",
          "Python Django",
          "Multi-Tenant Architecture",
          "RPA Automation",
          "REST APIs"
        ]
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-bg", children: [
      /* @__PURE__ */ jsx(Navbar, { profile }),
      /* @__PURE__ */ jsx("main", { className: "relative", children }),
      /* @__PURE__ */ jsx(Footer, { profile }),
      /* @__PURE__ */ jsx(FloatingSocialDock, { socialLinks, whatsapp })
    ] })
  ] });
}
export {
  Button as B,
  Container as C,
  Layout as L
};
