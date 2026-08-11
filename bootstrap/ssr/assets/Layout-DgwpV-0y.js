import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link, usePage, Head } from "@inertiajs/react";
import { X, Menu, Plus, MessageCircle } from "lucide-react";
import { T as ThemeToggle } from "./ThemeToggle-D0Maapqw.js";
import { FaLinkedin, FaGithub } from "react-icons/fa";
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
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/posts" },
    { name: "Contact", href: "/#contact" }
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
              Link,
              {
                href: link.href,
                className: "font-medium text-sm text-text-muted hover:text-text transition-colors duration-200",
                children: link.name
              },
              link.name
            )),
            /* @__PURE__ */ jsx(Button, { href: "/#contact", variant: "primary", size: "sm", children: siteConfig.ctaLabel }),
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
            Link,
            {
              href: link.href,
              className: "font-medium text-sm text-text-muted hover:text-text transition-colors duration-200",
              children: link.name
            },
            link.name
          )),
          /* @__PURE__ */ jsx(Button, { href: "/#contact", variant: "primary", size: "sm", children: siteConfig.ctaLabel })
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
  const [isOpen, setIsOpen] = useState(false);
  const [transform, setTransform] = useState("perspective(600px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const cardRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const findLink = (name) => socialLinks?.find((l) => l?.name?.toLowerCase() === name)?.href;
  const github = findLink("github");
  const linkedin = findLink("linkedin");
  const whatsappUrl = whatsapp?.phoneNumber && `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || "Hello!")}`;
  const items = [
    whatsappUrl && { key: "whatsapp", href: whatsappUrl, label: "WhatsApp", Icon: MessageCircle, color: "#25D366" },
    linkedin && { key: "linkedin", href: linkedin, label: "LinkedIn", Icon: FaLinkedin, color: "#0A66C2" },
    github && { key: "github", href: github, label: "GitHub", Icon: FaGithub, color: "#ffffff" }
  ].filter(Boolean);
  if (items.length === 0) return null;
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTransform(`perspective(600px) rotateX(${(-y * 15).toFixed(2)}deg) rotateY(${(x * 15).toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`);
    setGlare({
      opacity: 0.3,
      x: (e.clientX - rect.left) / rect.width * 100,
      y: (e.clientY - rect.top) / rect.height * 100
    });
  };
  const handleMouseLeave = () => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: cardRef,
      className: `fixed bottom-8 left-8 z-50 flex flex-col items-center transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            style: {
              transform,
              transformStyle: "preserve-3d",
              transition: "transform 0.15s ease-out, opacity 0.3s ease, visibility 0.3s"
            },
            className: `relative mb-4 rounded-2xl border border-white/10 bg-[#12131A]/90 p-3 shadow-2xl backdrop-blur-xl ${isOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95 pointer-events-none"}`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute -inset-1 rounded-2xl bg-accent/20 blur-lg opacity-50",
                  style: { transform: "translateZ(-10px)" }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300",
                  style: {
                    opacity: glare.opacity,
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 70%)`
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "relative z-10 flex flex-col gap-3", style: { transformStyle: "preserve-3d" }, children: items.map(({ key, href, label, Icon, color }, idx) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": label,
                  style: {
                    transform: `translateZ(${15 + idx * 5}px)`,
                    transitionDelay: `${isOpen ? idx * 50 : 0}ms`
                  },
                  className: "group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] shadow-inner transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:bg-white/[0.1]",
                  children: [
                    /* @__PURE__ */ jsx(Icon, { size: 20, style: { color }, className: "transition-transform duration-300 group-hover:scale-110" }),
                    /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded bg-text px-2.5 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-bg opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100", children: label })
                  ]
                },
                key
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsOpen((prev) => !prev),
            "aria-label": "Toggle Social Links",
            className: "group relative flex h-14 w-14 items-center justify-center rounded-full bg-text text-bg shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white",
            style: { transformStyle: "preserve-3d" },
            children: [
              /* @__PURE__ */ jsx("span", { className: "absolute -inset-1 rounded-full bg-accent/40 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "relative z-10 transition-transform duration-500 ease-out",
                  style: { transform: isOpen ? "rotate(135deg)" : "rotate(0deg)" },
                  children: isOpen ? /* @__PURE__ */ jsx(X, { size: 22 }) : /* @__PURE__ */ jsx(Plus, { size: 22 })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const SITE_ORIGIN = "https://samiahmed.dev";
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
function Layout({
  children,
  title,
  description,
  profile,
  whatsapp,
  socialLinks,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  keywords,
  jsonLd
}) {
  const metaTitle = title || "Sami Ahmed | Full-Stack Software Engineer";
  const metaDescription = description || "Full-Stack Software Engineer Portfolio";
  const metaImage = image || OG_IMAGE;
  const { url } = usePage().props;
  const canonicalUrl = url?.canonical ?? SITE_ORIGIN;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "description", name: "description", content: metaDescription }),
      keywords?.length > 0 && /* @__PURE__ */ jsx("meta", { "head-key": "keywords", name: "keywords", content: keywords.join(", ") }),
      /* @__PURE__ */ jsx("link", { "head-key": "canonical", rel: "canonical", href: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:title", property: "og:title", content: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:description", property: "og:description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:type", property: "og:type", content: type }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:url", property: "og:url", content: canonicalUrl }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:image", property: "og:image", content: metaImage }),
      /* @__PURE__ */ jsx("meta", { "head-key": "og:site_name", property: "og:site_name", content: "Sami Ahmed" }),
      type === "article" && publishedTime && /* @__PURE__ */ jsx("meta", { "head-key": "article:published_time", property: "article:published_time", content: publishedTime }),
      type === "article" && (modifiedTime || publishedTime) && /* @__PURE__ */ jsx("meta", { "head-key": "article:modified_time", property: "article:modified_time", content: modifiedTime || publishedTime }),
      type === "article" && keywords?.map((tag) => /* @__PURE__ */ jsx("meta", { property: "article:tag", content: tag }, tag)),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:card", name: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:title", name: "twitter:title", content: metaTitle }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:description", name: "twitter:description", content: metaDescription }),
      /* @__PURE__ */ jsx("meta", { "head-key": "twitter:image", name: "twitter:image", content: metaImage }),
      jsonLd ? /* @__PURE__ */ jsx("script", { "head-key": "json-ld", type: "application/ld+json", children: JSON.stringify(jsonLd) }) : profile && /* @__PURE__ */ jsx("script", { "head-key": "json-ld", type: "application/ld+json", children: JSON.stringify({
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
