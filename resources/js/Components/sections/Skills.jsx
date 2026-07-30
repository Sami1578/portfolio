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

// Maps string icon names from Laravel database to React Icons
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

        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
          {categories.map((category, index) => (
            <BracketFrame key={index} className="bg-bg border border-border p-6" size={8}>
              <h3 className="font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted text-center mb-6">
                {category.title}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = ICONS[skill.icon];
                  return (
                    <div key={skillIndex} className="flex items-center gap-3">
                      <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                        {Icon && <Icon size={18} style={{ color: skill.color }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-text text-sm truncate">{skill.name}</div>
                      </div>
                      <Tag>{skill.level}</Tag>
                    </div>
                  );
                })}
              </div>
            </BracketFrame>
          ))}
        </div>
      </Container>
    </section>
  );
}