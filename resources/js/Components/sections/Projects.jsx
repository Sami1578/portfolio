// resources/js/Components/sections/Projects.jsx
import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import TiltIDE from '../ui/TiltIDE'; // Import your 3D tilt component
import FlipCard3D from '../ui/FlipCard3D'; // Tap-to-flip 3D card
import useScrollReveal from '../../hooks/useScrollReveal';

const SWIPE_THRESHOLD = 50; // px

export default function Projects({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal();
  const touchStartX = useRef(null);

  if (!projects || projects.length === 0) return null;

  const goTo = (idx) => {
    const total = projects.length;
    setCurrentIndex(((idx % total) + total) % total);
  };
  const handlePrev = () => goTo(currentIndex - 1);
  const handleNext = () => goTo(currentIndex + 1);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) handlePrev();
    else if (delta < -SWIPE_THRESHOLD) handleNext();
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-bg">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          heading="Featured projects"
          description="Production systems and applications I've architected and engineered."
        />

        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          {/* Main Slider Shell */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/5" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <article key={project.id} className="w-full shrink-0 bg-surface grid grid-cols-1 lg:grid-cols-2">
                  
                  {/* Left Column: Gradient Panel with 3D Floating Stat Card */}
                  <div className="bg-gradient-to-br from-accent-soft via-surface-2 to-surface-2 p-8 lg:p-12 flex items-center justify-center">
                    <FlipCard3D
                      className="w-full max-w-sm"
                      front={
                        <div className="p-6">
                          <div className="flex items-center gap-2 font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-status animate-pulse" />
                            {project.architecture_tag || 'System Architecture'}
                          </div>

                          <div className="space-y-1">
                            {project.stats?.map((stat, idx) => (
                              <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-none text-sm">
                                <span className="text-text-muted">{stat.label}</span>
                                <span className="font-display font-bold text-accent-deep">{stat.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      }
                      back={
                        <div className="p-6 h-full flex flex-col justify-center">
                          <p className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-accent-deep mb-3">
                            Why it mattered
                          </p>
                          <p className="text-text text-sm leading-relaxed">
                            {project.highlights?.[0] || project.description}
                          </p>
                        </div>
                      }
                    />
                  </div>

                  {/* Right Column: Project Details with Micro-3D Interactions */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div>
                      {project.subtitle && (
                        <span className="inline-block font-mono-ui text-[11px] font-semibold text-accent-deep bg-accent-soft px-2.5 py-1 rounded-full mb-5 shadow-sm">
                          {project.subtitle}
                        </span>
                      )}
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-text text-balance">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-text-muted leading-relaxed">{project.description}</p>
                    </div>

                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mt-6 space-y-2.5">
                        {project.highlights.slice(0, 4).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-text">
                            <span className="text-accent mt-0.5">→</span>
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Badges with 3D Hover Pop */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.tech_stack.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="font-mono-ui text-[11px] uppercase tracking-[0.08em] text-text-muted bg-surface-2 border border-border px-3 py-1.5 rounded-md shadow-sm transition-all duration-200 hover:scale-105 hover:border-accent/40 hover:text-text cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          {projects.length > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2.5">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-accent' : 'w-1.5 bg-border hover:bg-border-strong'
                    }`}
                    aria-label={`Go to project ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono-ui text-xs tracking-[0.12em] text-text-muted">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-300"
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-text hover:bg-text hover:text-bg hover:border-text transition-all duration-300"
                    aria-label="Next project"
                  >
                    <ArrowRight size={16} />
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