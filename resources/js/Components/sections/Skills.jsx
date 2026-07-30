import React from 'react';
import {
  SiReact, SiVuedotjs, SiTailwindcss, SiJavascript,
  SiLaravel, SiPhp, SiNodedotjs, SiPython,
  SiMysql, SiPostgresql, SiMongodb, SiDocker, SiGit,
} from 'react-icons/si';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import BracketFrame from '../ui/BracketFrame';
import Tag from '../ui/Tag';
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
    <section id="skills" className="py-28 bg-surface">
      <Container>
        <SectionHeader
          eyebrow="Skills"
          heading="Tech stack"
          description="Technologies and tools I work with day to day."
        />

        {/* Outer Flex container: Centers any leftover cards (like 4th card) horizontally */}
        <div 
          ref={ref} 
          className={`reveal ${isVisible ? 'is-visible' : ''} flex flex-wrap justify-center gap-6 w-full max-w-7xl mx-auto`}
        >
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] min-w-[240px]"
            >
              <BracketFrame className="bg-bg border border-border p-6 h-full" size={8}>
                <h3 className="font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted text-center mb-6">
                  {category.title}
                </h3>

                <div className="flex flex-col gap-4 w-full">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = ICONS[skill.icon];
                    return (
                      <div
                        key={skillIndex}
                        className="flex items-start gap-3 w-full"
                      >
                        {/* Icon Box */}
                        <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                          {Icon && <Icon size={18} style={{ color: skill.color }} />}
                        </div>

                        {/* Name on line 1 + Subtext level on line 2 */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-text text-sm font-medium leading-snug">
                            {skill.name}
                          </span>
                          <span className="text-[11px] font-mono text-text-muted tracking-wider uppercase mt-0.5">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BracketFrame>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}