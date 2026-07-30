import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import useScrolled from '../../hooks/useScrolled';
import { siteConfig } from '../../config/site';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled(50);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/95 backdrop-blur border-b border-border' : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-display text-2xl font-semibold text-text">
            {siteConfig.brandName}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono-ui text-xs uppercase tracking-[0.1em] text-text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Button href="#contact" variant="primary" size="sm">
              {siteConfig.ctaLabel}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-muted hover:text-text"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-border">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block font-mono-ui text-xs uppercase tracking-[0.1em] text-text-muted hover:text-text transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button href="#contact" variant="primary" size="sm" className="w-full" onClick={() => setIsOpen(false)}>
              {siteConfig.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
