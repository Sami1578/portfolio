// resources/js/Components/layout/Footer.jsx
import React from 'react';
import Container from '../ui/Container';

export default function Footer({ profile }) {
  const name = profile?.name || '';
  const title = profile?.title || '';

  return (
    <footer className="bg-bg border-t border-border pt-14 pb-8">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-display text-xl font-bold text-text">{name}</p>
            <p className="mt-1 text-sm text-text-muted">{title}</p>
          </div>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 font-mono-ui text-xs uppercase tracking-[0.14em] text-text-muted hover:text-accent transition-colors duration-200"
          >
            Back to top
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
