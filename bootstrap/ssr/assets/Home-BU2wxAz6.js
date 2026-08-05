import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link, usePage, Head, useForm } from "@inertiajs/react";
import { X, Menu, MessageCircle, ArrowRight, Smartphone, Database, Server, Code, Loader2, Send, MapPin, Phone, Mail } from "lucide-react";
import { T as ThemeToggle } from "./ThemeToggle-D0Maapqw.js";
import { SiGit, SiDocker, SiMongodb, SiPostgresql, SiMysql, SiPython, SiNodedotjs, SiPhp, SiLaravel, SiJavascript, SiTailwindcss, SiVuedotjs, SiReact } from "react-icons/si";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
function Container({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 ${className}`, children });
}
const base = "group inline-flex items-center justify-center gap-2 font-mono-ui text-xs uppercase tracking-[0.18em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
const sizes = {
  md: "px-7 py-3.5",
  sm: "px-5 py-2.5"
};
const variants = {
  // Confident editorial ink button that warms to the accent on hover.
  primary: "bg-text text-bg hover:bg-accent",
  // Hairline-bordered secondary that inverts to ink on hover.
  ghost: "border border-border-strong text-text hover:bg-text hover:text-bg",
  // Inline underlined text link.
  link: "text-text hover:text-accent px-0 py-0 underline underline-offset-4 decoration-1 decoration-border-strong hover:decoration-accent"
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
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? "bg-bg/90 backdrop-blur border-b border-border" : "bg-bg/90 backdrop-blur border-b border-border md:bg-transparent md:backdrop-blur-none md:border-transparent"}`,
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-20", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/",
              className: "font-display text-2xl tracking-[-0.01em] text-text",
              children: siteConfig.brandName
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-10", children: [
            siteConfig.navLinks.map((link, i) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: link.href,
                className: "group flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-text transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-accent/70 group-hover:text-accent transition-colors", children: String(i + 1).padStart(2, "0") }),
                  link.name
                ]
              },
              link.name
            )),
            /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "ghost", size: "sm", children: siteConfig.ctaLabel }),
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
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "py-6 space-y-5 border-t border-border", children: [
              siteConfig.navLinks.map((link, i) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: link.href,
                  className: "flex items-center gap-3 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-text transition-colors duration-200",
                  onClick: () => setIsOpen(false),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-accent/70", children: String(i + 1).padStart(2, "0") }),
                    link.name
                  ]
                },
                link.name
              )),
              /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "ghost", size: "sm", className: "w-full", onClick: () => setIsOpen(false), children: siteConfig.ctaLabel })
            ] })
          }
        )
      ] })
    }
  );
}
function Footer({ profile }) {
  const name = profile?.name || "";
  const title = profile?.title || "";
  return /* @__PURE__ */ jsx("footer", { className: "bg-bg border-t border-border-strong pt-16 pb-10", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end md:justify-between gap-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-xl", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.01em] text-text text-balance", children: name }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-text-muted", children: title })
      ] }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#home",
          className: "group inline-flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-accent transition-colors duration-200",
          children: [
            "Back to top",
            /* @__PURE__ */ jsx("span", { className: "transition-transform duration-200 group-hover:-translate-y-0.5", children: "↑" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        name
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted", children: "All rights reserved" })
    ] })
  ] }) });
}
function ContactFab({ whatsapp }) {
  if (!whatsapp || !whatsapp.phoneNumber) return null;
  const url = `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || "Hello!")}`;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-text text-bg hover:bg-accent transition-all duration-200 transform hover:-translate-y-1 shadow-lg",
      "aria-label": "Message me on WhatsApp",
      children: /* @__PURE__ */ jsx(MessageCircle, { size: 24 })
    }
  );
}
const SITE_ORIGIN = "https://samiahmed.dev";
const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;
function Layout({ children, title, description, profile, whatsapp }) {
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
      /* @__PURE__ */ jsx(ContactFab, { whatsapp })
    ] })
  ] });
}
function StatusDot({ active = true }) {
  return /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
    active && /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-status opacity-60" }),
    /* @__PURE__ */ jsx("span", { className: `relative inline-flex h-2 w-2 rounded-full ${active ? "bg-status" : "bg-text-muted"}` })
  ] });
}
function Hero({ profile }) {
  if (!profile) return null;
  return /* @__PURE__ */ jsx("section", { id: "home", className: "relative min-h-screen flex items-center pt-28 pb-20", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-border-strong pt-4", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted", children: [
        /* @__PURE__ */ jsx(StatusDot, { active: profile.status.available }),
        profile.status.label
      ] }),
      /* @__PURE__ */ jsx("span", { className: "hidden sm:block font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted", children: profile.location })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-end mt-16 lg:mt-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-xs uppercase tracking-[0.24em] text-text-muted mb-6", children: profile.title }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-6xl sm:text-7xl lg:text-[8.5rem] leading-[0.92] tracking-[-0.02em] text-text text-balance", children: profile.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-10 max-w-xl text-lg text-text-muted leading-relaxed", children: profile.tagline }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxs(Button, { href: "#projects", variant: "primary", children: [
            "View work",
            /* @__PURE__ */ jsx(ArrowRight, { size: 16, className: "transition-transform duration-200 group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsx(Button, { href: "#contact", variant: "ghost", children: "Get in touch" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxs("div", { className: "border-t border-border-strong pt-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-5xl text-accent leading-none", children: profile.initials }),
          /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted", children: "Index" })
        ] }),
        /* @__PURE__ */ jsx("dl", { className: "mt-8 divide-y divide-border", children: profile.stats.map((stat, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-4 py-3.5", children: [
          /* @__PURE__ */ jsx("dt", { className: "font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted", children: stat.label }),
          /* @__PURE__ */ jsx("dd", { className: "font-display text-2xl text-text leading-none", children: stat.value })
        ] }, index)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 border-t border-border pt-4", children: /* @__PURE__ */ jsxs("p", { className: "font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted leading-relaxed", children: [
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Stack — " }),
          profile.stack.join(" / ")
        ] }) })
      ] }) })
    ] })
  ] }) });
}
function Eyebrow({ children, className = "" }) {
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-3 font-mono-ui text-xs tracking-[0.28em] uppercase text-text-muted ${className}`, children: [
    /* @__PURE__ */ jsx("span", { className: "h-px w-7 bg-accent" }),
    children
  ] });
}
function SectionHeader({ eyebrow, heading, description, index, align = "left" }) {
  const centered = align === "center";
  return /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 border-t border-border-strong pt-4", children: [
      index && /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs tracking-[0.2em] text-text-muted", children: index }),
      /* @__PURE__ */ jsx(Eyebrow, { children: eyebrow })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end ${centered ? "text-center" : ""}`,
        children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.01em] text-text text-balance lg:col-span-8", children: heading }),
          description && /* @__PURE__ */ jsx("p", { className: "text-text-muted leading-relaxed lg:col-span-4 lg:pb-2", children: description })
        ]
      }
    )
  ] });
}
function FieldRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-6 py-3.5 border-b border-border", children: [
    /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted shrink-0", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-text text-sm text-right", children: value })
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
const ICONS$2 = { Code, Server, Database, Smartphone };
function About({ about }) {
  const { ref, isVisible } = useScrollReveal();
  if (!about) return null;
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-24 md:py-32 bg-bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        index: "01",
        eyebrow: about.eyebrow,
        heading: about.heading,
        description: "I'm a full-stack developer who cares about clean, dependable code."
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-10", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-5", children: about.paragraphs.map((p, i) => /* @__PURE__ */ jsx(
              "p",
              {
                className: i === 0 ? "text-xl md:text-2xl font-display leading-snug text-text text-pretty" : "text-text-muted leading-relaxed",
                children: p
              },
              i
            )) }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-border-strong pt-2", children: about.fields.map((field, i) => /* @__PURE__ */ jsx(FieldRow, { label: field.label, value: field.value }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5", children: [
            /* @__PURE__ */ jsx("p", { className: "font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted border-b border-border pb-3", children: "What I do" }),
            /* @__PURE__ */ jsx("div", { children: about.services.map((service, index) => {
              const Icon = ICONS$2[service?.icon] || Code;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "group flex gap-5 py-6 border-b border-border transition-colors duration-300",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs text-text-muted pt-1 shrink-0", children: String(index + 1).padStart(2, "0") }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Icon, { className: "text-accent shrink-0", size: 18 }),
                        /* @__PURE__ */ jsx("h4", { className: "text-text font-medium", children: service.title })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "mt-2 text-text-muted text-sm leading-relaxed", children: service.description })
                    ] })
                  ]
                },
                index
              );
            }) })
          ] })
        ]
      }
    )
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
function Skills({ categories }) {
  const { ref, isVisible } = useScrollReveal();
  if (!categories || categories.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { id: "skills", className: "py-24 md:py-32 bg-surface", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        index: "02",
        eyebrow: "Skills",
        heading: "Tech stack",
        description: "Technologies and tools I work with day to day."
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border-strong`,
        children: categories.map((category, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "border-b border-border sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 px-0 sm:px-6 lg:px-7 first:pl-0 py-8",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-7", children: [
                /* @__PURE__ */ jsx("h3", { className: "font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted", children: category.title }),
                /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent", children: String(index + 1).padStart(2, "0") })
              ] }),
              /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-5", children: category.skills.map((skill, skillIndex) => {
                const Icon = ICONS$1[skill.icon];
                return /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3", children: [
                  Icon && /* @__PURE__ */ jsx(Icon, { size: 18, className: "mt-0.5 shrink-0", style: { color: skill.color } }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-text text-sm font-medium leading-snug", children: skill.name }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono-ui text-text-muted tracking-[0.14em] uppercase mt-1", children: skill.level })
                  ] })
                ] }, skillIndex);
              }) })
            ]
          },
          index
        ))
      }
    )
  ] }) });
}
function Projects({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  if (!projects || projects.length === 0) return null;
  const currentProject = projects[currentIndex];
  const handlePrev = () => {
    setCurrentIndex((prev) => prev === 0 ? projects.length - 1 : prev - 1);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => prev === projects.length - 1 ? 0 : prev + 1);
  };
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-24 md:py-32 bg-bg", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        index: "03",
        eyebrow: "Portfolio",
        heading: "Featured projects",
        description: "Production systems and applications I've architected and engineered."
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `reveal ${isVisible ? "is-visible" : ""}`,
        children: [
          /* @__PURE__ */ jsxs(
            "article",
            {
              className: "grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 border-t border-border-strong pt-10",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "lg:col-span-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted", children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-status animate-pulse" }),
                    currentProject.architecture_tag || "System Architecture"
                  ] }),
                  currentProject.subtitle && /* @__PURE__ */ jsx("p", { className: "mt-4 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-accent", children: currentProject.subtitle }),
                  currentProject.stats && currentProject.stats.length > 0 && /* @__PURE__ */ jsx("dl", { className: "mt-8 divide-y divide-border border-t border-border", children: currentProject.stats.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-4 py-3", children: [
                    /* @__PURE__ */ jsx("dt", { className: "font-mono-ui text-[10px] uppercase tracking-[0.16em] text-text-muted", children: stat.label }),
                    /* @__PURE__ */ jsx("dd", { className: "font-display text-lg text-text leading-none", children: stat.value })
                  ] }, idx)) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.01em] text-text text-balance", children: currentProject.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-5 text-text-muted leading-relaxed max-w-2xl", children: currentProject.description }),
                  currentProject.highlights && currentProject.highlights.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted pb-3 border-b border-border", children: "Engineering highlights" }),
                    /* @__PURE__ */ jsx("ul", { className: "mt-1", children: currentProject.highlights.slice(0, 4).map((point, idx) => /* @__PURE__ */ jsxs(
                      "li",
                      {
                        className: "flex items-start gap-4 py-3.5 border-b border-border text-sm text-text-muted",
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent pt-0.5 shrink-0", children: String(idx + 1).padStart(2, "0") }),
                          /* @__PURE__ */ jsx("span", { className: "leading-snug", children: point })
                        ]
                      },
                      idx
                    )) })
                  ] }),
                  currentProject.tech_stack && currentProject.tech_stack.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-x-5 gap-y-2", children: currentProject.tech_stack.map((tech, idx) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted",
                      children: tech
                    },
                    idx
                  )) })
                ] })
              ]
            },
            currentProject.id
          ),
          projects.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-12 pt-6 border-t border-border", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: projects.map((_, idx) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setCurrentIndex(idx),
                className: `h-px transition-all duration-300 ${currentIndex === idx ? "w-10 bg-accent" : "w-5 bg-border hover:bg-text-muted"}`,
                "aria-label": `Go to project ${idx + 1}`
              },
              idx
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-mono-ui text-xs tracking-[0.16em] text-text-muted", children: [
                String(currentIndex + 1).padStart(2, "0"),
                " / ",
                String(projects.length).padStart(2, "0")
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handlePrev,
                    className: "p-2.5 border border-border-strong text-text hover:bg-text hover:text-bg transition-colors",
                    "aria-label": "Previous project",
                    children: /* @__PURE__ */ jsx(FiArrowLeft, { size: 16 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleNext,
                    className: "p-2.5 border border-border-strong text-text hover:bg-text hover:text-bg transition-colors",
                    "aria-label": "Next project",
                    children: /* @__PURE__ */ jsx(FiArrowRight, { size: 16 })
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
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
const inputClasses = "w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300";
function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-24 md:py-32 bg-surface relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(
      SectionHeader,
      {
        index: "04",
        eyebrow: "Contact",
        heading: "Get in touch",
        description: "Have a project in mind? Let's talk about what you need."
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-border-strong pt-12`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-text mb-8", children: "Send a message" }),
            submitted && /* @__PURE__ */ jsx("div", { className: "mb-6 py-3 border-l-2 border-status pl-4 bg-status/5 text-status text-sm", children: "Message sent — I'll get back to you soon." }),
            error && /* @__PURE__ */ jsx("div", { className: "mb-6 py-3 border-l-2 border-red-500 pl-4 bg-red-500/5 text-red-500 text-sm", children: error }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-7", children: [
              FIELDS.map((field) => /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: field.id,
                    className: "block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2",
                    children: field.label
                  }
                ),
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
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "message",
                    className: "block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2",
                    children: "Message"
                  }
                ),
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
              /* @__PURE__ */ jsx(Button, { type: "submit", variant: "primary", disabled: isSubmitting, className: "w-full", children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { size: 16, className: "animate-spin" }),
                "Sending..."
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Send, { size: 16 }),
                "Send message"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-text mb-8", children: "Contact information" }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: contactInfo?.map((info, index) => {
              const Icon = ICONS[info?.icon] || Mail;
              const content = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-4 border-b border-border group", children: [
                /* @__PURE__ */ jsx(Icon, { className: "text-accent shrink-0", size: 18 }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-text-muted text-[11px] font-mono-ui uppercase tracking-[0.14em]", children: info?.label }),
                  /* @__PURE__ */ jsx("p", { className: "text-text text-sm mt-0.5 group-hover:text-accent transition-colors duration-200", children: info?.value })
                ] })
              ] });
              return info?.href ? /* @__PURE__ */ jsx("a", { href: info.href, children: content }, index) : /* @__PURE__ */ jsx("div", { children: content }, index);
            }) }),
            socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
              /* @__PURE__ */ jsx("h4", { className: "font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-4", children: "Social links" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-6 gap-y-3", children: socialLinks.map((link, idx) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "font-mono-ui text-xs uppercase tracking-[0.12em] text-text-muted hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-1 decoration-border hover:decoration-accent",
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
  return /* @__PURE__ */ jsxs(Layout, { title: `${profile.name} - ${profile.title}`, description: pageDescription, profile, whatsapp, children: [
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
