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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled || isOpen ? 'bg-bg/85 backdrop-blur-md border-border' : 'bg-bg/85 backdrop-blur-md border-transparent md:bg-transparent md:backdrop-blur-none'
        }`}
    >
      <Container>
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-text">
            {siteConfig.brandName}
          </Link>

          <div className="hidden md:flex items-center gap-9">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-sm text-text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Button href="/#contact" variant="primary" size="sm">
              {siteConfig.ctaLabel}
            </Button>
            <ThemeToggle />
          </div>

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

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col items-start py-6 gap-5 border-t border-border">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full font-medium text-sm text-text-muted hover:text-text transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Button href="/#contact" variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              {siteConfig.ctaLabel}
            </Button>
          </div>
        </div>
      </Container>
    </nav>
  );
}