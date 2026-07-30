// resources/js/Components/sections/About.jsx
import React from 'react';
import { Code, Server, Database, Smartphone } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import BracketFrame from '../ui/BracketFrame';
import FieldRow from '../ui/FieldRow';
import useScrollReveal from '../../hooks/useScrollReveal';

// Maps string icon names from Laravel to Lucide React components
const ICONS = { Code, Server, Database, Smartphone };

export default function About({ about }) {
  const { ref, isVisible } = useScrollReveal();

  if (!about) return null;

  return (
    <section id="about" className="py-28 bg-bg">
      <Container>
        <SectionHeader
          eyebrow={about.eyebrow}
          heading={about.heading}
          description="I'm a full-stack developer who cares about clean, dependable code."
        />

        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-2 gap-12`}>
          {/* Left: copy + field list */}
          <div className="space-y-8">
            <div className="space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="border-t border-border pt-2">
              {about.fields.map((field, i) => (
                <FieldRow key={i} label={field.label} value={field.value} />
              ))}
            </div>
          </div>

          {/* Right: services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {about.services.map((service, index) => {
              const Icon = ICONS[service?.icon] || Code;
              return (
                <BracketFrame
                  key={index}
                  className="bg-surface border border-border p-6 hover:border-accent/60 transition-colors duration-300"
                >
                  <div className="w-11 h-11 border border-border flex items-center justify-center mb-4">
                    <Icon className="text-accent" size={20} />
                  </div>
                  <h4 className="text-text font-semibold mb-2">{service.title}</h4>
                  <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
                </BracketFrame>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}