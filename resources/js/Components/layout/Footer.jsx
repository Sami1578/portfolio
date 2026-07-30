// resources/js/Components/Footer.jsx
import React from 'react';
import Container from '../ui/Container';

export default function Footer({ profile }) {
  const name = profile?.name || '';
  const title = profile?.title || '';

  return (
    <footer className="bg-bg border-t border-border py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-display text-lg font-semibold text-text">{name}</p>
            <p className="text-text-muted text-sm mt-1">{title}</p>
          </div>
          <a
            href="#home"
            className="font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted hover:text-accent transition-colors duration-200"
          >
            Back to top ↑
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="font-mono-ui text-xs text-text-muted">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}