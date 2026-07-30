import React, { useState } from 'react';
import { ExternalLink, Code } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import BracketFrame from '../ui/BracketFrame';
import Tag from '../ui/Tag';
import useScrollReveal from '../../hooks/useScrollReveal';

const DEFAULT_CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Full Stack', value: 'fullstack' },
  { name: 'Frontend', value: 'frontend' },
  { name: 'Backend', value: 'backend' },
  { name: 'Mobile', value: 'mobile' },
];

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const { ref, isVisible } = useScrollReveal();

  if (!projects) return null;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-28 bg-bg">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          heading="Featured projects"
          description="A selection of recent work and personal projects."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {DEFAULT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-5 py-2 text-xs font-mono-ui uppercase tracking-[0.1em] border transition-colors duration-200 ${
                filter === cat.value
                  ? 'bg-accent text-bg border-accent'
                  : 'border-border text-text-muted hover:text-text hover:border-border-strong'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
          {filteredProjects.map((project) => (
            <BracketFrame
              key={project.id}
              className="bg-surface border border-border overflow-hidden hover:border-accent/60 transition-colors duration-300"
            >
              <div className="h-44 bg-surface-2 flex items-center justify-center text-6xl border-b border-border">
                {project.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-text font-semibold mb-2">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Tag key={i}>{tag}</Tag>
                  ))}
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-4">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                    >
                      <ExternalLink size={15} />
                      Live demo
                    </a>
                  )}
                  {project.codeUrl && project.codeUrl !== '#' && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                    >
                      <Code size={15} />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </BracketFrame>
          ))}
        </div>
      </Container>
    </section>
  );
}