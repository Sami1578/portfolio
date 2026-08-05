import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function Projects({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  if (!projects || projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-bg">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Portfolio"
          heading="Featured projects"
          description="Production systems and applications I've architected and engineered."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''}`}
        >
          {/* Case study — editorial article layout */}
          <article
            key={currentProject.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-8 border-t border-border-strong pt-10"
          >
            {/* Left rail: meta */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-status animate-pulse" />
                {currentProject.architecture_tag || 'System Architecture'}
              </div>

              {currentProject.subtitle && (
                <p className="mt-4 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-accent">
                  {currentProject.subtitle}
                </p>
              )}

              {/* Stats as a spec list */}
              {currentProject.stats && currentProject.stats.length > 0 && (
                <dl className="mt-8 divide-y divide-border border-t border-border">
                  {currentProject.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        {stat.label}
                      </dt>
                      <dd className="font-display text-lg text-text leading-none">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            {/* Right: title, description, highlights */}
            <div className="lg:col-span-8">
              <h3 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-[-0.01em] text-text text-balance">
                {currentProject.title}
              </h3>
              <p className="mt-5 text-text-muted leading-relaxed max-w-2xl">
                {currentProject.description}
              </p>

              {currentProject.highlights && currentProject.highlights.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-text-muted pb-3 border-b border-border">
                    Engineering highlights
                  </h4>
                  <ul className="mt-1">
                    {currentProject.highlights.slice(0, 4).map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 py-3.5 border-b border-border text-sm text-text-muted"
                      >
                        <span className="font-mono-ui text-[11px] text-accent pt-0.5 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              {currentProject.tech_stack && currentProject.tech_stack.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                  {currentProject.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono-ui text-[11px] uppercase tracking-[0.1em] text-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Carousel controls */}
          {projects.length > 1 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-px transition-all duration-300 ${
                      currentIndex === idx ? 'w-10 bg-accent' : 'w-5 bg-border hover:bg-text-muted'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-6">
                <span className="font-mono-ui text-xs tracking-[0.16em] text-text-muted">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 border border-border-strong text-text hover:bg-text hover:text-bg transition-colors"
                    aria-label="Previous project"
                  >
                    <FiArrowLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 border border-border-strong text-text hover:bg-text hover:text-bg transition-colors"
                    aria-label="Next project"
                  >
                    <FiArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}