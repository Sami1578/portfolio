// resources/js/Components/sections/Hero.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import BracketFrame from '../ui/BracketFrame';
import StatusDot from '../ui/StatusDot';

export default function Hero({ profile }) {
  console.log('Hero.jsx profile prop:', profile); // Debugging line to check the profile prop
  // If profile prop is temporarily missing or loading
  if (!profile) return null;

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left: intro */}
          <div className="lg:col-span-3 space-y-10">
            <div className="flex items-center gap-2.5 font-mono-ui text-xs uppercase tracking-[0.2em] text-text-muted">
              <StatusDot active={profile.status.available} />
              {profile.status.label}
            </div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] text-text">
              Hi, I&apos;m
              <br />
              <span className="text-accent">{profile.name}</span>
            </h1>

            <p className="text-lg text-text-muted max-w-lg leading-relaxed">{profile.tagline}</p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="#projects" variant="primary">
                View work
                <ArrowRight size={18} />
              </Button>
              <Button href="#contact" variant="ghost">
                Get in touch
              </Button>
            </div>
          </div>

          {/* Right: identity card */}
          <div className="lg:col-span-2">
            <BracketFrame className="bg-surface border border-border" size={20}>
              <div className="p-10 text-center border-b border-border">
                <div className="font-display text-6xl font-semibold text-accent mb-3">
                  {profile.initials}
                </div>
                <p className="text-text font-medium">{profile.title}</p>
                <p className="text-text-muted text-sm mt-1">{profile.location}</p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-y divide-border">
                {profile.stats.map((stat, index) => (
                  <div key={index} className="px-4 py-6 text-center">
                    <div className="font-display text-2xl font-semibold text-text">{stat.value}</div>
                    <div className="text-text-muted text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-border font-mono-ui text-xs text-text-muted uppercase tracking-[0.1em]">
                <span className="text-accent">Stack ·</span> {profile.stack.join(' · ')}
              </div>
            </BracketFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}