import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link, usePage, Head, useForm } from "@inertiajs/react";
import { X, Menu, MessageCircle, ArrowRight, Smartphone, Database, Server, Code, ArrowLeft, Loader2, Send, MapPin, Phone, Mail } from "lucide-react";
import { T as ThemeToggle } from "./ThemeToggle-D0Maapqw.js";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGit, SiDocker, SiMongodb, SiPostgresql, SiMysql, SiPython, SiNodedotjs, SiPhp, SiLaravel, SiJavascript, SiTailwindcss, SiVuedotjs, SiReact } from "react-icons/si";
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
function StatusDot({ active = true }) {
  return /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
    active && /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-status opacity-60" }),
    /* @__PURE__ */ jsx("span", { className: `relative inline-flex h-2 w-2 rounded-full ${active ? "bg-status" : "bg-text-muted"}` })
  ] });
}
function useScrollReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}
function Hero({ profile }) {
  if (!profile) return null;
  const { ref, isVisible } = useScrollReveal();
  const show = (delay) => `transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;
  const delayStyle = (ms) => ({ transitionDelay: `${ms}ms` });
  return /* @__PURE__ */ jsx("section", { id: "home", className: "relative pt-40 pb-24 text-center", ref, children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx("div", { className: show(), style: delayStyle(0), children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 font-mono-ui text-xs font-medium text-accent-deep", children: [
      /* @__PURE__ */ jsx(StatusDot, { active: profile.status.available }),
      profile.status.label,
      /* @__PURE__ */ jsxs("span", { className: "text-text-muted", children: [
        "— ",
        profile.location
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "h1",
      {
        className: `${show()} mt-8 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-text max-w-4xl mx-auto text-balance`,
        style: delayStyle(100),
        children: [
          profile.title.split(" ").slice(0, -1).join(" "),
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: profile.title.split(" ").slice(-1) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: `${show()} mt-6 max-w-xl mx-auto text-lg text-text-muted leading-relaxed`, style: delayStyle(200), children: profile.tagline }),
    /* @__PURE__ */ jsxs("div", { className: `${show()} mt-10 flex flex-wrap items-center justify-center gap-4`, style: delayStyle(300), children: [
      /* @__PURE__ */ jsxs(Button, { href: "#projects", variant: "primary", children: [
        "View my work",
        /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "transition-transform duration-200 group-hover:translate-x-1" })
      ] }),
      /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "ghost", children: "Get in touch" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${show()} mt-16 max-w-3xl mx-auto rounded-2xl border border-border bg-surface shadow-2xl shadow-black/10 overflow-hidden text-left`,
        style: delayStyle(420),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-5 py-3 border-b border-border", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-3 font-mono-ui text-xs text-text-muted", children: [
              "app/Services/",
              profile.initials,
              "Service.php"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[40px_1fr] gap-x-2 bg-[#0D0E14] px-5 py-6 font-mono-ui text-[13px] leading-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-right text-[#4A4C5C] select-none", children: [
              "1",
              /* @__PURE__ */ jsx("br", {}),
              "2",
              /* @__PURE__ */ jsx("br", {}),
              "3",
              /* @__PURE__ */ jsx("br", {}),
              "4",
              /* @__PURE__ */ jsx("br", {}),
              "5",
              /* @__PURE__ */ jsx("br", {}),
              "6",
              /* @__PURE__ */ jsx("br", {}),
              "7"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-[#D8D9E3] whitespace-pre", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#C792EA]", children: "class" }),
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-[#FFCB6B]", children: [
                profile.initials,
                "Service"
              ] }),
              "\n",
              "{",
              "\n",
              "  ",
              /* @__PURE__ */ jsx("span", { className: "text-[#C792EA]", children: "public function" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-[#82AAFF]", children: "handle" }),
              "(Request $request): Response",
              "\n",
              "  ",
              "{",
              "\n",
              "    ",
              /* @__PURE__ */ jsx("span", { className: "text-[#5A5C6B]", children: "// validate, persist, respond" }),
              "\n",
              "    ",
              /* @__PURE__ */ jsx("span", { className: "text-[#C792EA]", children: "return" }),
              " $this->",
              /* @__PURE__ */ jsx("span", { className: "text-[#82AAFF]", children: "respond" }),
              "($request);",
              "\n",
              "  ",
              "}",
              "\n",
              "}"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: `${show()} mt-14 border-t border-border pt-8`, style: delayStyle(550), children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted mb-5", children: "Working daily with" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-3", children: profile.stack.map((tech, i) => /* @__PURE__ */ jsx("span", { className: "font-display font-bold text-lg text-text-muted/70 hover:text-text transition-colors duration-200", children: tech }, i)) })
    ] }),
    /* @__PURE__ */ jsx("dl", { className: `${show()} mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto`, style: delayStyle(650), children: profile.stats.map((stat, index) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("dd", { className: "font-display text-3xl font-extrabold text-text", children: stat.value }),
      /* @__PURE__ */ jsx("dt", { className: "mt-1 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted", children: stat.label })
    ] }, index)) })
  ] }) });
}
function SectionHeader({ eyebrow, heading, description, index, align = "left" }) {
  const centered = align === "center";
  return /* @__PURE__ */ jsxs("div", { className: `mb-14 ${centered ? "text-center" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`, children: [
      index && /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-2 py-1 rounded-full", children: index }),
      /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep", children: eyebrow })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end ${centered ? "text-center" : ""}`, children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-text text-balance lg:col-span-8", children: heading }),
      description && /* @__PURE__ */ jsx("p", { className: `text-text-muted leading-relaxed lg:col-span-4 ${centered ? "" : "lg:pb-1"}`, children: description })
    ] })
  ] });
}
function FieldRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-6 py-3.5 border-b border-border", children: [
    /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted shrink-0", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-text text-sm text-right", children: value })
  ] });
}
const ICONS$2 = { Code, Server, Database, Smartphone };
function About({ about }) {
  const { ref, isVisible } = useScrollReveal();
  if (!about) return null;
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 md:py-32 bg-bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        eyebrow: about.eyebrow,
        heading: about.heading,
        description: "I'm a full-stack developer who cares about clean, dependable code."
      }
    ),
    /* @__PURE__ */ jsxs("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12`, children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-8", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-5", children: about.paragraphs.map((p, i) => /* @__PURE__ */ jsx(
          "p",
          {
            className: `${i === 0 ? "text-xl font-display font-semibold leading-snug text-text text-pretty" : "text-text-muted leading-relaxed"} transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
            style: { transitionDelay: `${i * 100}ms` },
            children: p
          },
          i
        )) }),
        /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-surface p-6", children: about.fields.map((field, i) => /* @__PURE__ */ jsx(FieldRow, { label: field.label, value: field.value }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: about.services.map((service, index) => {
        const Icon = ICONS$2[service?.icon] || Code;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: `group rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
            style: { transitionDelay: `${300 + index * 100}ms` },
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-accent-deep transition-transform duration-300 group-hover:scale-110" }) }),
              /* @__PURE__ */ jsx("h4", { className: "text-text font-semibold group-hover:text-accent transition-colors duration-300", children: service.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-text-muted text-sm leading-relaxed", children: service.description })
            ]
          },
          index
        );
      }) }) })
    ] })
  ] }) });
}
const ICONS$1 = {
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiJavascript,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit
};
const LEVEL_WIDTH = {
  core: 95,
  "working knowledge": 65
};
function levelToWidth(level) {
  return LEVEL_WIDTH[(level || "").toLowerCase()] ?? 75;
}
function Skills({ categories }) {
  const { ref, isVisible } = useScrollReveal();
  const [marqueePaused, setMarqueePaused] = useState(false);
  if (!categories || categories.length === 0) return null;
  const allSkills = categories.flatMap((c) => c.skills);
  const uniqueSkills = Array.from(new Map(allSkills.map((s) => [s.name, s])).values());
  const marqueeSkills = [...uniqueSkills, ...uniqueSkills];
  return /* @__PURE__ */ jsxs("section", { id: "skills", className: "py-24 md:py-32 bg-surface-2 border-y border-border overflow-hidden", children: [
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(
      SectionHeader,
      {
        eyebrow: "Skills",
        heading: "Tech stack",
        description: "Technologies and tools I work with day to day."
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative mb-16 select-none",
        style: {
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
        },
        onMouseEnter: () => setMarqueePaused(true),
        onMouseLeave: () => setMarqueePaused(false),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "flex w-max gap-14 py-2",
              style: {
                animation: "skills-marquee 28s linear infinite",
                animationPlayState: marqueePaused ? "paused" : "running"
              },
              children: marqueeSkills.map((skill, idx) => {
                const Icon = ICONS$1[skill.icon];
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2.5 shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300",
                    children: [
                      Icon && /* @__PURE__ */ jsx(Icon, { size: 22, style: { color: skill.color } }),
                      /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted whitespace-nowrap", children: skill.name })
                    ]
                  },
                  `${skill.name}-${idx}`
                );
              })
            }
          ),
          /* @__PURE__ */ jsx("style", { children: `
          @keyframes skills-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="skills-marquee"] { animation: none !important; }
          }
        ` })
        ]
      }
    ),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`, children: categories.map((category, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
        style: { transitionDelay: `${index * 100}ms` },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-7", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted group-hover:text-accent transition-colors duration-300", children: category.title }),
            /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-1.5 py-0.5 rounded-full", children: String(index + 1).padStart(2, "0") })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-5", children: category.skills.map((skill, skillIndex) => {
            const Icon = ICONS$1[skill.icon];
            const width = levelToWidth(skill.level);
            return /* @__PURE__ */ jsxs("li", { className: "group/skill", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                Icon && /* @__PURE__ */ jsx(
                  Icon,
                  {
                    size: 17,
                    className: "shrink-0 transition-transform duration-300 group-hover/skill:scale-125",
                    style: { color: skill.color }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-text text-sm font-medium leading-snug group-hover/skill:text-accent transition-colors duration-300", children: skill.name }),
                /* @__PURE__ */ jsx("span", { className: "ml-auto text-[10px] font-mono-ui text-text-muted tracking-[0.1em] uppercase", children: skill.level })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-1 w-full rounded-full bg-border overflow-hidden", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-full rounded-full bg-accent transition-all ease-out",
                  style: {
                    width: isVisible ? `${width}%` : "0%",
                    transitionDuration: "900ms",
                    transitionDelay: `${300 + index * 100 + skillIndex * 80}ms`
                  }
                }
              ) })
            ] }, skillIndex);
          }) })
        ]
      },
      index
    )) }) })
  ] });
}
const SWIPE_THRESHOLD = 50;
function Projects({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const touchStartX = useRef(null);
  if (!projects || projects.length === 0) return null;
  const goTo = (idx) => {
    const total = projects.length;
    setCurrentIndex((idx % total + total) % total);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) handlePrev();
    else if (delta < -SWIPE_THRESHOLD) handleNext();
    touchStartX.current = null;
  };
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-24 md:py-32 bg-bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        eyebrow: "Portfolio",
        heading: "Featured projects",
        description: "Production systems and applications I've architected and engineered."
      }
    ),
    /* @__PURE__ */ jsxs("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex transition-transform duration-500 ease-out",
          style: { transform: `translateX(-${currentIndex * 100}%)` },
          children: projects.map((project, pIdx) => /* @__PURE__ */ jsxs("article", { className: "w-full shrink-0 bg-surface grid grid-cols-1 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-accent-soft to-surface-2 p-10 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-xl bg-surface border border-border shadow-lg shadow-accent/10 p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted mb-5", children: [
                /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-status animate-pulse" }),
                project.architecture_tag || "System Architecture"
              ] }),
              project.stats?.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border last:border-none text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: stat.label }),
                /* @__PURE__ */ jsx("span", { className: "font-display font-bold text-accent-deep", children: stat.value })
              ] }, idx))
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-10 lg:p-12", children: [
              project.subtitle && /* @__PURE__ */ jsx("span", { className: "inline-block font-mono-ui text-[11px] font-semibold text-accent-deep bg-accent-soft px-2.5 py-1 rounded-full mb-5", children: project.subtitle }),
              /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text text-balance", children: project.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-text-muted leading-relaxed", children: project.description }),
              project.highlights && project.highlights.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2.5", children: project.highlights.slice(0, 4).map((point, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-text", children: [
                /* @__PURE__ */ jsx("span", { className: "text-accent mt-0.5", children: "→" }),
                /* @__PURE__ */ jsx("span", { className: "leading-snug", children: point })
              ] }, idx)) }),
              project.tech_stack && project.tech_stack.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap gap-2", children: project.tech_stack.map((tech, idx) => /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] uppercase tracking-[0.08em] text-text-muted bg-surface-2 border border-border px-2.5 py-1 rounded-md", children: tech }, idx)) })
            ] })
          ] }, project.id))
        }
      ) }),
      projects.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5", children: projects.map((_, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => goTo(idx),
            className: `h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-accent" : "w-1.5 bg-border hover:bg-border-strong"}`,
            "aria-label": `Go to project ${idx + 1}`
          },
          idx
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxs("span", { className: "font-mono-ui text-xs tracking-[0.12em] text-text-muted", children: [
            String(currentIndex + 1).padStart(2, "0"),
            " / ",
            String(projects.length).padStart(2, "0")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handlePrev,
                className: "w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-300",
                "aria-label": "Previous project",
                children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleNext,
                className: "w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-300",
                "aria-label": "Next project",
                children: /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
function useContactForm() {
  const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const handleChange = (e) => {
    setData(e.target.id, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/contact", {
      preserveScroll: true,
      onSuccess: () => reset()
    });
  };
  return {
    formData: data,
    handleChange,
    handleSubmit,
    isSubmitting: processing,
    submitted: recentlySuccessful,
    error: errors.message || errors.email || errors.name || null
  };
}
const ICONS = { Mail, Phone, MapPin };
const FIELDS = [
  { id: "name", label: "Your name", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Your email", type: "email", placeholder: "john@example.com" },
  { id: "subject", label: "Subject", type: "text", placeholder: "Project discussion" }
];
const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent focus:bg-white/[0.07] transition-colors duration-300";
function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 md:py-32 bg-bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        eyebrow: "Contact",
        heading: "Get in touch",
        description: "Have a project in mind? Let's talk about what you need."
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `reveal ${isVisible ? "is-visible" : ""} rounded-3xl bg-[#12131A] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold text-white mb-8", children: "Send a message" }),
            submitted && /* @__PURE__ */ jsx("div", { className: "mb-6 py-3 border-l-2 border-status pl-4 bg-status/10 text-status text-sm rounded-r", children: "Message sent — I'll get back to you soon." }),
            error && /* @__PURE__ */ jsx("div", { className: "mb-6 py-3 border-l-2 border-red-500 pl-4 bg-red-500/10 text-red-400 text-sm rounded-r", children: error }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              FIELDS.map((field) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: field.id, className: "block font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/50 mb-2", children: field.label }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: field.type,
                    id: field.id,
                    value: formData[field.id],
                    onChange: handleChange,
                    required: true,
                    className: inputClasses,
                    placeholder: field.placeholder
                  }
                )
              ] }, field.id)),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/50 mb-2", children: "Message" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "message",
                    rows: "4",
                    value: formData.message,
                    onChange: handleChange,
                    required: true,
                    className: `${inputClasses} resize-none`,
                    placeholder: "Tell me about your project..."
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: isSubmitting, className: "w-full !bg-accent !text-white hover:!bg-accent-deep", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }),
                "Sending..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Send, { size: 16 }),
                "Send message"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold text-white mb-8", children: "Contact information" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: contactInfo?.map((info, index) => {
              const Icon = ICONS[info?.icon] || Mail;
              const content = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-4 border-b border-white/10 group", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Icon, { className: "text-accent", size: 17 }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-white/40 text-[11px] font-mono-ui uppercase tracking-[0.12em]", children: info?.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-white text-sm mt-0.5 group-hover:text-accent transition-colors duration-200", children: info?.value })
                ] })
              ] });
              return info?.href ? /* @__PURE__ */ jsx("a", { href: info.href, children: content }, index) : /* @__PURE__ */ jsx("div", { children: content }, index);
            }) }),
            socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/40 mb-4", children: "Social links" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: socialLinks.map((link, idx) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "font-mono-ui text-xs uppercase tracking-[0.1em] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-colors duration-200",
                  children: link.name
                },
                idx
              )) })
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
function Home({
  profile,
  about,
  skillCategories,
  projects,
  contactInfo,
  socialLinks,
  whatsapp
}) {
  const pageDescription = "Full-Stack Software Engineer specializing in Laravel, React, Next.js, Python Django, and Multi-Tenant Enterprise Systems. View production case studies and architecture.";
  return /* @__PURE__ */ jsxs(Layout, { title: `${profile.name} - ${profile.title}`, description: pageDescription, profile, whatsapp, socialLinks, children: [
    /* @__PURE__ */ jsx(Hero, { profile }),
    /* @__PURE__ */ jsx(About, { about }),
    /* @__PURE__ */ jsx(Skills, { categories: skillCategories }),
    /* @__PURE__ */ jsx(Projects, { projects }),
    /* @__PURE__ */ jsx(Contact, { contactInfo, socialLinks })
  ] });
}
export {
  Home as default
};
