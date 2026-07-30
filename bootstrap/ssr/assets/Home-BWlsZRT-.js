import React, { useState, useEffect, useRef } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { X, Menu, MessageCircle, ArrowRight, Smartphone, Database, Server, Code, Loader2, Send, MapPin, Phone, Mail } from "lucide-react";
import { SiGit, SiDocker, SiMongodb, SiPostgresql, SiMysql, SiPython, SiNodedotjs, SiPhp, SiLaravel, SiJavascript, SiTailwindcss, SiVuedotjs, SiReact } from "react-icons/si";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
function Container({ children, className = "" }) {
  return /* @__PURE__ */ React.createElement("div", { className: `max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 ${className}` }, children);
}
const base = "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
const sizes = {
  md: "px-8 py-4 text-sm",
  sm: "px-5 py-2.5 text-sm"
};
const variants = {
  primary: "bg-accent text-bg hover:bg-white hover:-translate-y-0.5",
  ghost: "border-2 border-border-strong text-text hover:border-accent hover:text-accent hover:-translate-y-0.5",
  link: "text-text-muted hover:text-accent px-0 py-0"
};
function Button({ children, variant = "primary", size = "md", href, className = "", ...props }) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href) {
    return /* @__PURE__ */ React.createElement("a", { href, className: classes, ...props }, children);
  }
  return /* @__PURE__ */ React.createElement("button", { className: classes, ...props }, children);
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
  return /* @__PURE__ */ React.createElement(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-bg/95 backdrop-blur border-b border-border" : "bg-transparent"}`
    },
    /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center h-20" }, /* @__PURE__ */ React.createElement(Link, { href: "/", className: "font-display text-2xl font-semibold text-text" }, siteConfig.brandName), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex items-center gap-8" }, siteConfig.navLinks.map((link) => /* @__PURE__ */ React.createElement(
      "a",
      {
        key: link.name,
        href: link.href,
        className: "font-mono-ui text-xs uppercase tracking-[0.1em] text-text-muted hover:text-text transition-colors duration-200"
      },
      link.name
    )), /* @__PURE__ */ React.createElement(Button, { href: "#contact", variant: "primary", size: "sm" }, siteConfig.ctaLabel)), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "md:hidden text-text-muted hover:text-text",
        "aria-label": isOpen ? "Close menu" : "Open menu"
      },
      isOpen ? /* @__PURE__ */ React.createElement(X, { size: 22 }) : /* @__PURE__ */ React.createElement(Menu, { size: 22 })
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`
      },
      /* @__PURE__ */ React.createElement("div", { className: "py-4 space-y-4 border-t border-border" }, siteConfig.navLinks.map((link) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: link.name,
          href: link.href,
          className: "block font-mono-ui text-xs uppercase tracking-[0.1em] text-text-muted hover:text-text transition-colors duration-200",
          onClick: () => setIsOpen(false)
        },
        link.name
      )), /* @__PURE__ */ React.createElement(Button, { href: "#contact", variant: "primary", size: "sm", className: "w-full", onClick: () => setIsOpen(false) }, siteConfig.ctaLabel))
    ))
  );
}
function Footer({ profile }) {
  const name = profile?.name || "";
  const title = profile?.title || "";
  return /* @__PURE__ */ React.createElement("footer", { className: "bg-bg border-t border-border py-12" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "font-display text-lg font-semibold text-text" }, name), /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm mt-1" }, title)), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#home",
      className: "font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors duration-200"
    },
    "Back to top ↑"
  )), /* @__PURE__ */ React.createElement("div", { className: "mt-8 pt-8 border-t border-border text-center" }, /* @__PURE__ */ React.createElement("p", { className: "font-mono-ui text-xs text-text-muted" }, "© ", (/* @__PURE__ */ new Date()).getFullYear(), " ", name, ". All rights reserved."))));
}
function ContactFab({ whatsapp }) {
  if (!whatsapp || !whatsapp.phoneNumber) return null;
  const url = `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || "Hello!")}`;
  return /* @__PURE__ */ React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-accent text-bg hover:bg-accent/90 transition-all duration-200 transform hover:-translate-y-1 shadow-lg",
      "aria-label": "Message me on WhatsApp"
    },
    /* @__PURE__ */ React.createElement(MessageCircle, { size: 24 })
  );
}
function Layout({ children, title = "Portfolio", description = "Full-Stack Software Engineer Portfolio", profile, whatsapp }) {
  const pageTitle = title || "SA. | Full-Stack Software Engineer";
  const metaDescription = description || "Full-Stack Software Engineer Portfolio";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Head, null, /* @__PURE__ */ React.createElement("title", null, pageTitle), /* @__PURE__ */ React.createElement("meta", { name: "description", content: metaDescription }), /* @__PURE__ */ React.createElement("meta", { property: "og:title", content: pageTitle }), /* @__PURE__ */ React.createElement("meta", { property: "og:description", content: metaDescription }), /* @__PURE__ */ React.createElement("meta", { property: "og:type", content: "website" }), /* @__PURE__ */ React.createElement("meta", { property: "og:url", content: typeof window !== "undefined" ? window.location.href : "" }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:title", content: pageTitle }), /* @__PURE__ */ React.createElement("meta", { name: "twitter:description", content: metaDescription }), profile && /* @__PURE__ */ React.createElement("script", { type: "application/ld+json" }, JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.title,
    "url": typeof window !== "undefined" ? window.location.origin : "",
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
  }))), /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-bg" }, /* @__PURE__ */ React.createElement(Navbar, { profile }), /* @__PURE__ */ React.createElement("main", { className: "relative" }, children), /* @__PURE__ */ React.createElement(Footer, { profile }), /* @__PURE__ */ React.createElement(ContactFab, { whatsapp })));
}
function BracketFrame({ children, className = "", size = 18 }) {
  const corner = "absolute border-accent pointer-events-none";
  const s = `${size}px`;
  return /* @__PURE__ */ React.createElement("div", { className: `relative ${className}` }, /* @__PURE__ */ React.createElement("span", { className: `${corner} -top-[2px] -left-[2px] border-t-2 border-l-2`, style: { width: s, height: s } }), /* @__PURE__ */ React.createElement("span", { className: `${corner} -top-[2px] -right-[2px] border-t-2 border-r-2`, style: { width: s, height: s } }), /* @__PURE__ */ React.createElement("span", { className: `${corner} -bottom-[2px] -left-[2px] border-b-2 border-l-2`, style: { width: s, height: s } }), /* @__PURE__ */ React.createElement("span", { className: `${corner} -bottom-[2px] -right-[2px] border-b-2 border-r-2`, style: { width: s, height: s } }), children);
}
function StatusDot({ active = true }) {
  return /* @__PURE__ */ React.createElement("span", { className: "relative flex h-2 w-2" }, active && /* @__PURE__ */ React.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full bg-status opacity-60" }), /* @__PURE__ */ React.createElement("span", { className: `relative inline-flex h-2 w-2 ${active ? "bg-status" : "bg-text-muted"}` }));
}
function Hero({ profile }) {
  console.log("Hero.jsx profile prop:", profile);
  if (!profile) return null;
  return /* @__PURE__ */ React.createElement("section", { id: "home", className: "min-h-screen flex items-center pt-24 pb-16" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-16 items-center" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-3 space-y-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted" }, /* @__PURE__ */ React.createElement(StatusDot, { active: profile.status.available }), profile.status.label), /* @__PURE__ */ React.createElement("h1", { className: "font-display text-6xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] text-text" }, "Hi, I'm", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "text-accent" }, profile.name)), /* @__PURE__ */ React.createElement("p", { className: "text-lg text-text-muted max-w-lg leading-relaxed" }, profile.tagline), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-4 pt-2" }, /* @__PURE__ */ React.createElement(Button, { href: "#projects", variant: "primary" }, "View work", /* @__PURE__ */ React.createElement(ArrowRight, { size: 18 })), /* @__PURE__ */ React.createElement(Button, { href: "#contact", variant: "ghost" }, "Get in touch"))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement(BracketFrame, { className: "bg-surface border border-border", size: 20 }, /* @__PURE__ */ React.createElement("div", { className: "p-10 text-center border-b border-border" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-6xl font-semibold text-accent mb-3" }, profile.initials), /* @__PURE__ */ React.createElement("p", { className: "text-text font-medium" }, profile.title), /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm mt-1" }, profile.location)), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 divide-x divide-y divide-border" }, profile.stats.map((stat, index) => /* @__PURE__ */ React.createElement("div", { key: index, className: "px-4 py-6 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "font-display text-2xl font-semibold text-text" }, stat.value), /* @__PURE__ */ React.createElement("div", { className: "text-text-muted text-xs mt-1" }, stat.label)))), /* @__PURE__ */ React.createElement("div", { className: "px-6 py-4 border-t border-border font-mono-ui text-xs text-text-muted uppercase tracking-[0.1em]" }, /* @__PURE__ */ React.createElement("span", { className: "text-accent" }, "Stack ·"), " ", profile.stack.join(" · ")))))));
}
function Eyebrow({ children, className = "" }) {
  return /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-2 font-mono-ui text-xs tracking-[0.25em] uppercase text-accent ${className}` }, /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 bg-accent" }), children);
}
function SectionHeader({ eyebrow, heading, description, align = "center" }) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return /* @__PURE__ */ React.createElement("div", { className: `flex flex-col ${alignment} mb-16 gap-4` }, /* @__PURE__ */ React.createElement(Eyebrow, null, eyebrow), /* @__PURE__ */ React.createElement("h2", { className: "font-display text-4xl md:text-5xl font-semibold text-text" }, heading), description && /* @__PURE__ */ React.createElement("p", { className: `text-text-muted max-w-2xl ${align === "center" ? "mx-auto" : ""}` }, description));
}
function FieldRow({ label, value }) {
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-baseline justify-between gap-4 py-3 border-b border-border" }, /* @__PURE__ */ React.createElement("span", { className: "font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted" }, label), /* @__PURE__ */ React.createElement("span", { className: "text-text text-sm text-right" }, value));
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
  return /* @__PURE__ */ React.createElement("section", { id: "about", className: "py-28 bg-bg" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(
    SectionHeader,
    {
      eyebrow: about.eyebrow,
      heading: about.heading,
      description: "I'm a full-stack developer who cares about clean, dependable code."
    }
  ), /* @__PURE__ */ React.createElement("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 lg:grid-cols-2 gap-12` }, /* @__PURE__ */ React.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, about.paragraphs.map((p, i) => /* @__PURE__ */ React.createElement("p", { key: i, className: "text-text-muted leading-relaxed" }, p))), /* @__PURE__ */ React.createElement("div", { className: "border-t border-border pt-2" }, about.fields.map((field, i) => /* @__PURE__ */ React.createElement(FieldRow, { key: i, label: field.label, value: field.value })))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, about.services.map((service, index) => {
    const Icon = ICONS$2[service?.icon] || Code;
    return /* @__PURE__ */ React.createElement(
      BracketFrame,
      {
        key: index,
        className: "bg-surface border border-border p-6 hover:border-accent/60 transition-colors duration-300"
      },
      /* @__PURE__ */ React.createElement("div", { className: "w-11 h-11 border border-border flex items-center justify-center mb-4" }, /* @__PURE__ */ React.createElement(Icon, { className: "text-accent", size: 20 })),
      /* @__PURE__ */ React.createElement("h4", { className: "text-text font-semibold mb-2" }, service.title),
      /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-sm leading-relaxed" }, service.description)
    );
  })))));
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
  return /* @__PURE__ */ React.createElement("section", { id: "skills", className: "py-28 bg-surface" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(
    SectionHeader,
    {
      eyebrow: "Skills",
      heading: "Tech stack",
      description: "Technologies and tools I work with day to day."
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: `reveal ${isVisible ? "is-visible" : ""} flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto`
    },
    categories.map((category, index) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: index,
        className: "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] min-w-[240px]"
      },
      /* @__PURE__ */ React.createElement(BracketFrame, { className: "bg-bg border border-border p-6 h-full", size: 8 }, /* @__PURE__ */ React.createElement("h3", { className: "font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted text-center mb-6" }, category.title), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4 w-full" }, category.skills.map((skill, skillIndex) => {
        const Icon = ICONS$1[skill.icon];
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: skillIndex,
            className: "flex items-start gap-3 w-full"
          },
          /* @__PURE__ */ React.createElement("div", { className: "w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5" }, Icon && /* @__PURE__ */ React.createElement(Icon, { size: 18, style: { color: skill.color } })),
          /* @__PURE__ */ React.createElement("div", { className: "flex flex-col min-w-0 flex-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-text text-sm font-medium leading-snug" }, skill.name), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-mono text-text-muted tracking-wider uppercase mt-0.5" }, skill.level))
        );
      })))
    ))
  )));
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
  return /* @__PURE__ */ React.createElement("section", { id: "projects", className: "py-24 bg-bg" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(
    SectionHeader,
    {
      eyebrow: "Portfolio",
      heading: "Featured Projects",
      description: "Production systems and applications I've architected and engineered."
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: `reveal ${isVisible ? "is-visible" : ""} max-w-4xl mx-auto`
    },
    /* @__PURE__ */ React.createElement(
      BracketFrame,
      {
        key: currentProject.id,
        className: "bg-surface border border-border p-6 md:p-8 min-h-[520px] flex flex-col justify-between transition-all duration-300",
        size: 10
      },
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-border/40 font-mono text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 text-text-muted" }, /* @__PURE__ */ React.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ React.createElement("span", null, currentProject.architecture_tag || "System Architecture")), currentProject.subtitle && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase tracking-wider text-text-muted border border-border px-2.5 py-0.5 rounded bg-bg" }, currentProject.subtitle)), /* @__PURE__ */ React.createElement("h3", { className: "text-xl md:text-2xl font-bold text-text mb-2" }, currentProject.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs md:text-sm text-text-muted leading-relaxed mb-5" }, currentProject.description), currentProject.stats && currentProject.stats.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-3 gap-2.5 mb-5" }, currentProject.stats.map((stat, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "border border-border/50 bg-bg p-2.5 rounded text-center" }, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-mono font-bold text-text" }, stat.value), /* @__PURE__ */ React.createElement("div", { className: "text-[9px] uppercase font-mono tracking-wider text-text-muted mt-0.5" }, stat.label)))), currentProject.highlights && currentProject.highlights.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mb-5" }, /* @__PURE__ */ React.createElement("h4", { className: "font-mono text-[11px] uppercase tracking-widest text-text-muted mb-2" }, "// Engineering Highlights"), /* @__PURE__ */ React.createElement("ul", { className: "space-y-1.5 text-xs text-text-muted" }, currentProject.highlights.slice(0, 4).map((point, idx) => /* @__PURE__ */ React.createElement("li", { key: idx, className: "flex items-start gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-text font-mono mt-0.5 select-none" }, "›"), /* @__PURE__ */ React.createElement("span", { className: "leading-snug" }, point)))))),
      /* @__PURE__ */ React.createElement("div", { className: "pt-4 border-t border-border/40 flex flex-wrap gap-1.5" }, currentProject.tech_stack?.map((tech, idx) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: idx,
          className: "px-2 py-0.5 text-[10px] font-mono text-text-muted border border-border bg-bg rounded-sm"
        },
        tech
      )))
    ),
    projects.length > 1 && /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mt-6 px-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, projects.map((_, idx) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: idx,
        onClick: () => setCurrentIndex(idx),
        className: `h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-amber-500" : "w-2 bg-border hover:bg-text-muted"}`,
        "aria-label": `Go to slide ${idx + 1}`
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handlePrev,
        className: "p-2 border border-border rounded bg-surface hover:border-amber-500/50 text-text transition-colors",
        "aria-label": "Previous project"
      },
      /* @__PURE__ */ React.createElement(FiChevronLeft, { size: 18 })
    ), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs text-text-muted" }, "0", currentIndex + 1, " / 0", projects.length), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleNext,
        className: "p-2 border border-border rounded bg-surface hover:border-amber-500/50 text-text transition-colors",
        "aria-label": "Next project"
      },
      /* @__PURE__ */ React.createElement(FiChevronRight, { size: 18 })
    )))
  )));
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
const inputClasses = "w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/60 focus:outline-none focus:border-accent transition-colors duration-300";
function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();
  return /* @__PURE__ */ React.createElement("section", { id: "contact", className: "py-28 bg-surface relative" }, /* @__PURE__ */ React.createElement(Container, null, /* @__PURE__ */ React.createElement(
    SectionHeader,
    {
      eyebrow: "Contact",
      heading: "Get in touch",
      description: "Have a project in mind? Let's talk about what you need."
    }
  ), /* @__PURE__ */ React.createElement("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 lg:grid-cols-2 gap-12` }, /* @__PURE__ */ React.createElement(BracketFrame, { className: "bg-bg border border-border p-8" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-xl font-semibold text-text mb-6" }, "Send a message"), submitted && /* @__PURE__ */ React.createElement("div", { className: "mb-6 p-4 border border-status/30 bg-status/10 text-status text-sm" }, "Message sent — I'll get back to you soon."), error && /* @__PURE__ */ React.createElement("div", { className: "mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm" }, error), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, FIELDS.map((field) => /* @__PURE__ */ React.createElement("div", { key: field.id }, /* @__PURE__ */ React.createElement("label", { htmlFor: field.id, className: "block font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-2" }, field.label), /* @__PURE__ */ React.createElement(
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
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { htmlFor: "message", className: "block font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-2" }, "Message"), /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement(Button, { type: "submit", variant: "primary", disabled: isSubmitting, className: "w-full" }, isSubmitting ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Loader2, { size: 18, className: "animate-spin" }), "Sending...") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Send, { size: 18 }), "Send message")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement(BracketFrame, { className: "bg-bg border border-border p-8" }, /* @__PURE__ */ React.createElement("h3", { className: "font-display text-xl font-semibold text-text mb-6" }, "Contact information"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, contactInfo?.map((info, index) => {
    const Icon = ICONS[info?.icon] || Mail;
    const content = /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 py-4 border-b border-border last:border-0 group" }, /* @__PURE__ */ React.createElement("div", { className: "w-11 h-11 border border-border flex items-center justify-center flex-shrink-0" }, /* @__PURE__ */ React.createElement(Icon, { className: "text-accent", size: 18 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "text-text-muted text-xs font-mono-ui uppercase tracking-[0.1em]" }, info?.label), /* @__PURE__ */ React.createElement("p", { className: "text-text text-sm mt-0.5 group-hover:text-accent transition-colors duration-200" }, info?.value)));
    return info?.href ? /* @__PURE__ */ React.createElement("a", { key: index, href: info.href }, content) : /* @__PURE__ */ React.createElement("div", { key: index }, content);
  })), socialLinks && socialLinks.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "mt-8 pt-6 border-t border-border" }, /* @__PURE__ */ React.createElement("h4", { className: "font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-4" }, "Social Links"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-3" }, socialLinks.map((link, idx) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: idx,
      href: link.href,
      target: "_blank",
      rel: "noreferrer",
      className: "px-4 py-2 border border-border bg-surface text-text-muted hover:text-accent hover:border-accent transition-colors duration-200 font-mono-ui text-xs uppercase"
    },
    link.name
  )))))))));
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
  return /* @__PURE__ */ React.createElement(Layout, { title: `${profile.name} - ${profile.title}`, description: pageDescription, profile, whatsapp }, /* @__PURE__ */ React.createElement(Hero, { profile }), /* @__PURE__ */ React.createElement(About, { about }), /* @__PURE__ */ React.createElement(Skills, { categories: skillCategories }), /* @__PURE__ */ React.createElement(Projects, { projects }), /* @__PURE__ */ React.createElement(Contact, { contactInfo, socialLinks }));
}
export {
  Home as default
};
