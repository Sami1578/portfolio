import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import BracketFrame from '../ui/BracketFrame';
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
    <section id="projects" className="py-24 bg-bg">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          heading="Featured Projects"
          description="Production systems and applications I've architected and engineered."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} max-w-4xl mx-auto`}
        >
          {/* Main Carousel Card */}
          <BracketFrame
            key={currentProject.id}
            className="bg-surface border border-border p-6 md:p-8 min-h-[520px] flex flex-col justify-between transition-all duration-300"
            size={10}
          >
            <div>
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-border/40 font-mono text-xs">
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{currentProject.architecture_tag || 'System Architecture'}</span>
                </div>
                {currentProject.subtitle && (
                  <span className="text-[10px] uppercase tracking-wider text-text-muted border border-border px-2.5 py-0.5 rounded bg-bg">
                    {currentProject.subtitle}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl md:text-2xl font-bold text-text mb-2">
                {currentProject.title}
              </h3>
              <p className="text-xs md:text-sm text-text-muted leading-relaxed mb-5">
                {currentProject.description}
              </p>

              {/* Stats Grid */}
              {currentProject.stats && currentProject.stats.length > 0 && (
                <div className="grid grid-cols-3 gap-2.5 mb-5">
                  {currentProject.stats.map((stat, idx) => (
                    <div key={idx} className="border border-border/50 bg-bg p-2.5 rounded text-center">
                      <div className="text-xs font-mono font-bold text-text">{stat.value}</div>
                      <div className="text-[9px] uppercase font-mono tracking-wider text-text-muted mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              {currentProject.highlights && currentProject.highlights.length > 0 && (
                <div className="mb-5">
                  <h4 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-2">
                    // Engineering Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-muted">
                    {currentProject.highlights.slice(0, 4).map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-text font-mono mt-0.5 select-none">›</span>
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer & Tech Stack */}
            <div className="pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
              {currentProject.tech_stack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono text-text-muted border border-border bg-bg rounded-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BracketFrame>

          {/* Carousel Controls (Only rendered if more than 1 project) */}
          {projects.length > 1 && (
            <div className="flex items-center justify-between mt-6 px-2">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-6 bg-amber-500'
                        : 'w-2 bg-border hover:bg-text-muted'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next/Prev Navigation Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-border rounded bg-surface hover:border-amber-500/50 text-text transition-colors"
                  aria-label="Previous project"
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="font-mono text-xs text-text-muted">
                  0{currentIndex + 1} / 0{projects.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 border border-border rounded bg-surface hover:border-amber-500/50 text-text transition-colors"
                  aria-label="Next project"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}