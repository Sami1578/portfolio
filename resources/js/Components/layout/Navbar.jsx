import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import useScrolled from '../../hooks/useScrolled';
import { siteConfig } from '../../config/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(50);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-bg/90 backdrop-blur border-b border-border'
          : 'bg-bg/90 backdrop-blur border-b border-border md:bg-transparent md:backdrop-blur-none md:border-transparent'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-20">
          <Link
            href="/"
            className="font-display text-2xl tracking-[-0.01em] text-text"
          >
            {siteConfig.brandName}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {siteConfig.navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-1.5 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-text transition-colors duration-200"
              >
                <span className="text-accent/70 group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.name}
              </a>
            ))}
            <Button href="#contact" variant="ghost" size="sm">
              {siteConfig.ctaLabel}
            </Button>
            <ThemeToggle />

          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text hover:text-accent transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 space-y-5 border-t border-border">
            {siteConfig.navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted hover:text-text transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                {link.name}
              </a>
            ))}
            <Button href="#contact" variant="ghost" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
              {siteConfig.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}