import React, { useState } from 'react';
import {
  SiReact, SiVuedotjs, SiTailwindcss, SiJavascript,
  SiLaravel, SiPhp, SiNodedotjs, SiPython,
  SiMysql, SiPostgresql, SiMongodb, SiDocker, SiGit,
} from 'react-icons/si';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import useScrollReveal from '../../hooks/useScrollReveal';

const ICONS = {
  SiReact, SiVuedotjs, SiTailwindcss, SiJavascript,
  SiLaravel, SiPhp, SiNodedotjs, SiPython,
  SiMysql, SiPostgresql, SiMongodb, SiDocker, SiGit,
};

const LEVEL_WIDTH = {
  core: 95,
  'working knowledge': 65,
};

function levelToWidth(level) {
  return LEVEL_WIDTH[(level || '').toLowerCase()] ?? 75;
}

export default function Skills({ categories }) {
  const { ref, isVisible } = useScrollReveal();
  const [marqueePaused, setMarqueePaused] = useState(false);

  if (!categories || categories.length === 0) return null;

  const allSkills = categories.flatMap((c) => c.skills);
  const uniqueSkills = Array.from(new Map(allSkills.map((s) => [s.name, s])).values());
  const marqueeSkills = [...uniqueSkills, ...uniqueSkills];

  return (
    <section id="skills" className="py-24 md:py-32 bg-surface-2 border-y border-border overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Skills"
          heading="Tech stack"
          description="Technologies and tools I work with day to day."
        />
      </Container>

      <div
        className="relative mb-16 select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
      >
        <div
          className="flex w-max gap-14 py-2"
          style={{
            animation: 'skills-marquee 28s linear infinite',
            animationPlayState: marqueePaused ? 'paused' : 'running',
          }}
        >
          {marqueeSkills.map((skill, idx) => {
            const Icon = ICONS[skill.icon];
            return (
              <div
                key={`${skill.name}-${idx}`}
                className="flex items-center gap-2.5 shrink-0 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                {Icon && <Icon size={22} style={{ color: skill.color }} />}
                <span className="font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted whitespace-nowrap">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes skills-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="skills-marquee"] { animation: none !important; }
          }
        `}</style>
      </div>

      <Container>
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-baseline justify-between mb-7">
                <h3 className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted group-hover:text-accent transition-colors duration-300">
                  {category.title}
                </h3>
                <span className="font-mono-ui text-[11px] text-accent-deep bg-accent-soft px-1.5 py-0.5 rounded-full">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <ul className="flex flex-col gap-5">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = ICONS[skill.icon];
                  const width = levelToWidth(skill.level);
                  return (
                    <li key={skillIndex} className="group/skill">
                      <div className="flex items-center gap-3 mb-2">
                        {Icon && (
                          <Icon
                            size={17}
                            className="shrink-0 transition-transform duration-300 group-hover/skill:scale-125"
                            style={{ color: skill.color }}
                          />
                        )}
                        <span className="text-text text-sm font-medium leading-snug group-hover/skill:text-accent transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="ml-auto text-[10px] font-mono-ui text-text-muted tracking-[0.1em] uppercase">
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all ease-out"
                          style={{
                            width: isVisible ? `${width}%` : '0%',
                            transitionDuration: '900ms',
                            transitionDelay: `${300 + index * 100 + skillIndex * 80}ms`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
