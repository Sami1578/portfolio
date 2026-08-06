// resources/js/Components/sections/About.jsx
import React from 'react';
import { Code, Server, Database, Smartphone } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import FieldRow from '../ui/FieldRow';
import TiltIDE from '../ui/TiltIDE'; // Import your 3D tilt wrapper
import useScrollReveal from '../../hooks/useScrollReveal';

const ICONS = { Code, Server, Database, Smartphone };

export default function About({ about }) {
  const { ref, isVisible } = useScrollReveal();

  if (!about) return null;

  return (
    <section id="about" className="py-24 md:py-32 bg-bg">
      <Container>
        <SectionHeader
          eyebrow={about.eyebrow}
          heading={about.heading}
          description="I'm a full-stack developer who cares about clean, dependable code."
        />

        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12`}>
          {/* Lead copy + spec list */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`${
                    i === 0 ? 'text-xl font-display font-semibold leading-snug text-text text-pretty' : 'text-text-muted leading-relaxed'
                  } transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              {about.fields.map((field, i) => (
                <FieldRow key={i} label={field.label} value={field.value} />
              ))}
            </div>
          </div>

          {/* Services grid with 3D Tilt */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {about.services.map((service, index) => {
                const Icon = ICONS[service?.icon] || Code;
                return (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <TiltIDE className="p-6 h-full hover:border-accent/40 transition-colors duration-300">
                      {/* Floating Icon Box (Pushed 15px forward in 3D space) */}
                      <div 
                        className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-6 shadow-sm"
                        style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                      >
                        <Icon size={20} className="text-accent-deep transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Service Title (Pushed 10px forward) */}
                      <h4 
                        className="text-text font-semibold group-hover:text-accent transition-colors duration-300"
                        style={{ transform: 'translateZ(10px)' }}
                      >
                        {service.title}
                      </h4>

                      {/* Description (Pushed 5px forward) */}
                      <p 
                        className="mt-2 text-text-muted text-sm leading-relaxed"
                        style={{ transform: 'translateZ(5px)' }}
                      >
                        {service.description}
                      </p>
                    </TiltIDE>
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