// resources/js/Components/sections/About.jsx
import React from 'react';
import { Code, Server, Database, Smartphone } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import FieldRow from '../ui/FieldRow';
import useScrollReveal from '../../hooks/useScrollReveal';

// Maps string icon names from Laravel to Lucide React components
const ICONS = { Code, Server, Database, Smartphone };

export default function About({ about }) {
  const { ref, isVisible } = useScrollReveal();

  if (!about) return null;

  return (
    <section id="about" className="py-24 md:py-32 bg-bg">
      <Container>
        <SectionHeader
          index="01"
          eyebrow={about.eyebrow}
          heading={about.heading}
          description="I'm a full-stack developer who cares about clean, dependable code."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16`}
        >
          {/* Left: lead copy + spec list */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-xl md:text-2xl font-display leading-snug text-text text-pretty'
                      : 'text-text-muted leading-relaxed'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-border-strong pt-2">
              {about.fields.map((field, i) => (
                <FieldRow key={i} label={field.label} value={field.value} />
              ))}
            </div>
          </div>

          {/* Right: services as an editorial index list */}
          <div className="lg:col-span-5">
            <p className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted border-b border-border pb-3">
              What I do
            </p>
            <div>
              {about.services.map((service, index) => {
                const Icon = ICONS[service?.icon] || Code;
                return (
                  <div
                    key={index}
                    className="group flex gap-5 py-6 border-b border-border transition-colors duration-300"
                  >
                    <span className="font-mono-ui text-xs text-text-muted pt-1 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="text-accent shrink-0" size={18} />
                        <h4 className="text-text font-medium">{service.title}</h4>
                      </div>
                      <p className="mt-2 text-text-muted text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}