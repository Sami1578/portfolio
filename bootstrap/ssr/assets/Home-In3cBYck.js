import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { C as Container, B as Button, L as Layout } from "./Layout-CzD4VZjZ.js";
import { ArrowRight, Smartphone, Database, Server, Code, ArrowLeft, Loader2, Send, MapPin, Phone, Mail } from "lucide-react";
import { S as SectionHeader } from "./SectionHeader-DR3FZHAX.js";
import { SiGit, SiDocker, SiMongodb, SiPostgresql, SiMysql, SiPython, SiNodedotjs, SiPhp, SiLaravel, SiJavascript, SiTailwindcss, SiVuedotjs, SiReact } from "react-icons/si";
import { useForm } from "@inertiajs/react";
import "./ThemeToggle-D0Maapqw.js";
import "react-icons/fa";
function StatusDot({ active = true }) {
  return /* @__PURE__ */ jsxs("span", { className: "relative flex h-2 w-2", children: [
    active && /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-status opacity-60" }),
    /* @__PURE__ */ jsx("span", { className: `relative inline-flex h-2 w-2 rounded-full ${active ? "bg-status" : "bg-text-muted"}` })
  ] });
}
function TiltIDE({ children, className = "" }) {
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  );
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const containerRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    const maxTiltX = 10;
    const maxTiltY = 10;
    const rotateX = -mouseY * maxTiltX;
    const rotateY = mouseX * maxTiltY;
    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
    const glareX = (e.clientX - rect.left) / width * 100;
    const glareY = (e.clientY - rect.top) / height * 100;
    setGlare({
      opacity: 0.15,
      x: glareX,
      y: glareY
    });
  };
  const handleMouseLeave = () => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group/tilt", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/30 via-accent-deep/20 to-accent/30 blur-xl opacity-40 group-hover/tilt:opacity-80 transition-opacity duration-500",
        style: { transform: "translateZ(-20px)" }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: containerRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
          transform,
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease"
        },
        className: `relative rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20 overflow-hidden text-left ${className}`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-0 z-20 transition-opacity duration-300",
              style: {
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`
              }
            }
          ),
          children
        ]
      }
    )
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
    /* @__PURE__ */ jsx("div", { className: `${show()} mt-16 max-w-3xl mx-auto`, style: delayStyle(420), children: /* @__PURE__ */ jsxs(TiltIDE, { children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-2 px-5 py-3 border-b border-border bg-surface relative z-10",
          style: { transform: "translateZ(10px)", transformStyle: "preserve-3d" },
          children: [
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-border-strong" }),
            /* @__PURE__ */ jsxs("span", { className: "ml-3 font-mono-ui text-xs text-text-muted", children: [
              "app/Services/",
              profile.initials,
              "Service.php"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "grid grid-cols-[40px_1fr] gap-x-2 bg-[#0D0E14] px-5 py-6 font-mono-ui text-[13px] leading-8 shadow-inner",
          style: { transform: "translateZ(20px)", transformStyle: "preserve-3d" },
          children: [
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
          ]
        }
      )
    ] }) }),
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
        return /* @__PURE__ */ jsx(
          "div",
          {
            className: `transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`,
            style: { transitionDelay: `${300 + index * 100}ms` },
            children: /* @__PURE__ */ jsxs(TiltIDE, { className: "p-6 h-full hover:border-accent/40 transition-colors duration-300", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-6 shadow-sm",
                  style: { transform: "translateZ(15px)", transformStyle: "preserve-3d" },
                  children: /* @__PURE__ */ jsx(Icon, { size: 20, className: "text-accent-deep transition-transform duration-300 group-hover:scale-110" })
                }
              ),
              /* @__PURE__ */ jsx(
                "h4",
                {
                  className: "text-text font-semibold group-hover:text-accent transition-colors duration-300",
                  style: { transform: "translateZ(10px)" },
                  children: service.title
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "mt-2 text-text-muted text-sm leading-relaxed",
                  style: { transform: "translateZ(5px)" },
                  children: service.description
                }
              )
            ] })
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
        className: "relative mb-16 select-none py-4",
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
              className: "flex w-max gap-8 py-2",
              style: {
                animation: "skills-marquee 28s linear infinite",
                animationPlayState: marqueePaused ? "paused" : "running"
              },
              children: marqueeSkills.map((skill, idx) => {
                const Icon = ICONS$1[skill.icon];
                return /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "group/badge shrink-0 cursor-pointer transition-transform duration-300 hover:scale-110",
                    children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 shadow-md transition-all duration-300 group-hover/badge:border-accent/40 group-hover/badge:shadow-lg group-hover/badge:shadow-accent/10",
                        style: { transformStyle: "preserve-3d" },
                        children: [
                          Icon && /* @__PURE__ */ jsx(
                            Icon,
                            {
                              size: 20,
                              className: "transition-transform duration-300 group-hover/badge:scale-125 group-hover/badge:rotate-6",
                              style: { color: skill.color }
                            }
                          ),
                          /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-xs font-semibold uppercase tracking-[0.14em] text-text-muted group-hover/badge:text-text transition-colors duration-200 whitespace-nowrap", children: skill.name })
                        ]
                      }
                    )
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
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { ref, className: `reveal ${isVisible ? "is-visible" : ""} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`, children: categories.map((category, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: `transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
        style: { transitionDelay: `${index * 100}ms` },
        children: /* @__PURE__ */ jsxs(TiltIDE, { className: "p-6 h-full border border-border bg-surface hover:border-accent/40 transition-colors duration-300", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-baseline justify-between mb-7",
              style: { transform: "translateZ(15px)", transformStyle: "preserve-3d" },
              children: [
                /* @__PURE__ */ jsx("h3", { className: "font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted group-hover:text-accent transition-colors duration-300", children: category.title }),
                /* @__PURE__ */ jsx("span", { className: "font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-1.5 py-0.5 rounded-full shadow-sm", children: String(index + 1).padStart(2, "0") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "ul",
            {
              className: "flex flex-col gap-5",
              style: { transform: "translateZ(10px)", transformStyle: "preserve-3d" },
              children: category.skills.map((skill, skillIndex) => {
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
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "h-1 w-full rounded-full bg-border overflow-hidden shadow-inner",
                      style: { transform: "translateZ(5px)" },
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "h-full rounded-full bg-accent transition-all ease-out",
                          style: {
                            width: isVisible ? `${width}%` : "0%",
                            transitionDuration: "900ms",
                            transitionDelay: `${300 + index * 100 + skillIndex * 80}ms`
                          }
                        }
                      )
                    }
                  )
                ] }, skillIndex);
              })
            }
          )
        ] })
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
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/5", onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd, children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex transition-transform duration-500 ease-out",
          style: { transform: `translateX(-${currentIndex * 100}%)` },
          children: projects.map((project) => /* @__PURE__ */ jsxs("article", { className: "w-full shrink-0 bg-surface grid grid-cols-1 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-accent-soft via-surface-2 to-surface-2 p-8 lg:p-12 flex items-center justify-center", children: /* @__PURE__ */ jsxs(TiltIDE, { className: "w-full max-w-sm border border-border bg-surface p-6", children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted mb-5",
                  style: { transform: "translateZ(15px)" },
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-status animate-pulse" }),
                    project.architecture_tag || "System Architecture"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "space-y-1",
                  style: { transform: "translateZ(10px)", transformStyle: "preserve-3d" },
                  children: project.stats?.map((stat, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border last:border-none text-sm", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-text-muted", children: stat.label }),
                    /* @__PURE__ */ jsx("span", { className: "font-display font-bold text-accent-deep", children: stat.value })
                  ] }, idx))
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "p-10 lg:p-12 flex flex-col justify-center", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                project.subtitle && /* @__PURE__ */ jsx("span", { className: "inline-block font-mono-ui text-[11px] font-semibold text-accent-deep bg-accent-soft px-2.5 py-1 rounded-full mb-5 shadow-sm", children: project.subtitle }),
                /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text text-balance", children: project.title }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 text-text-muted leading-relaxed", children: project.description })
              ] }),
              project.highlights && project.highlights.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2.5", children: project.highlights.slice(0, 4).map((point, idx) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-text", children: [
                /* @__PURE__ */ jsx("span", { className: "text-accent mt-0.5", children: "→" }),
                /* @__PURE__ */ jsx("span", { className: "leading-snug", children: point })
              ] }, idx)) }),
              project.tech_stack && project.tech_stack.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: project.tech_stack.map((tech, idx) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "font-mono-ui text-[11px] uppercase tracking-[0.08em] text-text-muted bg-surface-2 border border-border px-3 py-1.5 rounded-md shadow-sm transition-all duration-200 hover:scale-105 hover:border-accent/40 hover:text-text cursor-default",
                  children: tech
                },
                idx
              )) })
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
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxs(TiltIDE, { className: "p-8 border border-white/10 bg-white/[0.02] h-full", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                className: "font-display text-2xl font-bold text-white mb-8",
                style: { transform: "translateZ(15px)", transformStyle: "preserve-3d" },
                children: "Contact information"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "space-y-1",
                style: { transform: "translateZ(10px)", transformStyle: "preserve-3d" },
                children: contactInfo?.map((info, index) => {
                  const Icon = ICONS[info?.icon] || Mail;
                  const content = /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 py-4 border-b border-white/10 group", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 shadow-inner", children: /* @__PURE__ */ jsx(Icon, { className: "text-accent", size: 17 }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-white/40 text-[11px] font-mono-ui uppercase tracking-[0.12em]", children: info?.label }),
                      /* @__PURE__ */ jsx("p", { className: "text-white text-sm mt-0.5 group-hover:text-accent transition-colors duration-200", children: info?.value })
                    ] })
                  ] });
                  return info?.href ? /* @__PURE__ */ jsx("a", { href: info.href, children: content }, index) : /* @__PURE__ */ jsx("div", { children: content }, index);
                })
              }
            ),
            socialLinks && socialLinks.length > 0 && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "mt-10",
                style: { transform: "translateZ(15px)", transformStyle: "preserve-3d" },
                children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/40 mb-4", children: "Social links" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: socialLinks.map((link, idx) => /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: link.href,
                      target: "_blank",
                      rel: "noreferrer",
                      className: "font-mono-ui text-xs uppercase tracking-[0.1em] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105",
                      children: link.name
                    },
                    idx
                  )) })
                ]
              }
            )
          ] }) })
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
