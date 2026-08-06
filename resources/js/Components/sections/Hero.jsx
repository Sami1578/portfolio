// resources/js/Components/sections/Hero.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import StatusDot from '../ui/StatusDot';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function Hero({ profile }) {
  if (!profile) return null;

  const { ref, isVisible } = useScrollReveal();
  const show = (delay) =>
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;
  const delayStyle = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <section id="home" className="relative pt-40 pb-24 text-center" ref={ref}>
      <Container>
        <div className={show()} style={delayStyle(0)}>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 font-mono-ui text-xs font-medium text-accent-deep">
            <StatusDot active={profile.status.available} />
            {profile.status.label}
            <span className="text-text-muted">— {profile.location}</span>
          </span>
        </div>

        <h1
          className={`${show()} mt-8 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-text max-w-4xl mx-auto text-balance`}
          style={delayStyle(100)}
        >
          {profile.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-accent">{profile.title.split(' ').slice(-1)}</span>
        </h1>

        <p className={`${show()} mt-6 max-w-xl mx-auto text-lg text-text-muted leading-relaxed`} style={delayStyle(200)}>
          {profile.tagline}
        </p>

        <div className={`${show()} mt-10 flex flex-wrap items-center justify-center gap-4`} style={delayStyle(300)}>
          <Button href="#projects" variant="primary">
            View my work
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
          <Button href="#contact" variant="ghost">
            Get in touch
          </Button>
        </div>

        {/* Signature element: a floating "editor" mockup, always dark regardless of site theme */}
        <div
          className={`${show()} mt-16 max-w-3xl mx-auto rounded-2xl border border-border bg-surface shadow-2xl shadow-black/10 overflow-hidden text-left`}
          style={delayStyle(420)}
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
            <span className="ml-3 font-mono-ui text-xs text-text-muted">app/Services/{profile.initials}Service.php</span>
          </div>
          <div className="grid grid-cols-[40px_1fr] gap-x-2 bg-[#0D0E14] px-5 py-6 font-mono-ui text-[13px] leading-8">
            <div className="text-right text-[#4A4C5C] select-none">
              1<br />2<br />3<br />4<br />5<br />6<br />7
            </div>
            <div className="text-[#D8D9E3] whitespace-pre">
              <span className="text-[#C792EA]">class</span> <span className="text-[#FFCB6B]">{profile.initials}Service</span>{'\n'}
              {'{'}
              {'\n'}
              &nbsp;&nbsp;<span className="text-[#C792EA]">public function</span> <span className="text-[#82AAFF]">handle</span>(Request $request): Response{'\n'}
              &nbsp;&nbsp;{'{'}
              {'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#5A5C6B]">// validate, persist, respond</span>{'\n'}
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#C792EA]">return</span> $this-&gt;<span className="text-[#82AAFF]">respond</span>($request);{'\n'}
              &nbsp;&nbsp;{'}'}
              {'\n'}
              {'}'}
            </div>
          </div>
        </div>

        {/* Trust strip built from the real stack */}
        <div className={`${show()} mt-14 border-t border-border pt-8`} style={delayStyle(550)}>
          <p className="font-mono-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted mb-5">
            Working daily with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {profile.stack.map((tech, i) => (
              <span key={i} className="font-display font-bold text-lg text-text-muted/70 hover:text-text transition-colors duration-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <dl className={`${show()} mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto`} style={delayStyle(650)}>
          {profile.stats.map((stat, index) => (
            <div key={index}>
              <dd className="font-display text-3xl font-extrabold text-text">{stat.value}</dd>
              <dt className="mt-1 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
