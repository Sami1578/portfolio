import React from 'react';
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

export default function Skills({ categories }) {
  const { ref, isVisible } = useScrollReveal();

  if (!categories || categories.length === 0) return null;

  return (
    <section id="skills" className="py-24 md:py-32 bg-surface">
      <Container>
        <SectionHeader
          index="02"
          eyebrow="Skills"
          heading="Tech stack"
          description="Technologies and tools I work with day to day."
        />

        {/* Editorial column grid separated by hairlines */}
        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border-strong`}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="border-b border-border sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 px-0 sm:px-6 lg:px-7 first:pl-0 py-8"
            >
              <div className="flex items-baseline justify-between mb-7">
                <h3 className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {category.title}
                </h3>
                <span className="font-mono-ui text-[11px] text-accent">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <ul className="flex flex-col gap-5">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = ICONS[skill.icon];
                  return (
                    <li key={skillIndex} className="flex items-start gap-3">
                      {Icon && (
                        <Icon size={18} className="mt-0.5 shrink-0" style={{ color: skill.color }} />
                      )}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-text text-sm font-medium leading-snug">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono-ui text-text-muted tracking-[0.14em] uppercase mt-1">
                          {skill.level}
                        </span>
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