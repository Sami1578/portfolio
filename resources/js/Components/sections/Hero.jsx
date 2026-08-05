// resources/js/Components/sections/Hero.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import StatusDot from '../ui/StatusDot';

export default function Hero({ profile }) {
  if (!profile) return null;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20">
      <Container>
        {/* Masthead rule */}
        <div className="flex items-center justify-between border-t border-border-strong pt-4">
          <span className="flex items-center gap-2.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted">
            <StatusDot active={profile.status.available} />
            {profile.status.label}
          </span>
          <span className="hidden sm:block font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted">
            {profile.location}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-end mt-16 lg:mt-24">
          {/* Left: editorial headline */}
          <div className="lg:col-span-8">
            <p className="font-mono-ui text-xs uppercase tracking-[0.24em] text-text-muted mb-6">
              {profile.title}
            </p>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-[8.5rem] leading-[0.92] tracking-[-0.02em] text-text text-balance">
              {profile.name}
            </h1>

            <p className="mt-10 max-w-xl text-lg text-text-muted leading-relaxed">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#projects" variant="primary">
                View work
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
              <Button href="#contact" variant="ghost">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Right: editorial index / spec column */}
          <div className="lg:col-span-4">
            <div className="border-t border-border-strong pt-5">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-5xl text-accent leading-none">
                  {profile.initials}
                </span>
                <span className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted">
                  Index
                </span>
              </div>

              <dl className="mt-8 divide-y divide-border">
                {profile.stats.map((stat, index) => (
                  <div key={index} className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-text-muted">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-2xl text-text leading-none">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted leading-relaxed">
                  <span className="text-accent">Stack — </span>
                  {profile.stack.join(' / ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}