// resources/js/Components/layout/Footer.jsx
import React from 'react';
import Container from '../ui/Container';

export default function Footer({ profile }) {
  const name = profile?.name || '';
  const title = profile?.title || '';

  return (
    <footer className="bg-bg border-t border-border-strong pt-16 pb-10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="max-w-xl">
            <p className="font-display text-4xl md:text-5xl leading-[1.02] tracking-[-0.01em] text-text text-balance">
              {name}
            </p>
            <p className="mt-3 text-text-muted">{title}</p>
          </div>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-accent transition-colors duration-200"
          >
            Back to top
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted">
            © {new Date().getFullYear()} {name}
          </p>
          <p className="font-mono-ui text-[11px] uppercase tracking-[0.14em] text-text-muted">
            All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}