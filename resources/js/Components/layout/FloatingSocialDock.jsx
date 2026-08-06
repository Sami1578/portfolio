// resources/js/Components/layout/FloatingSocialDock.jsx
import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

/**
 * Always-visible floating dock, bottom-left: GitHub, LinkedIn, then WhatsApp
 * as the primary (larger) action at the bottom of the stack. Replaces the
 * old ContactFab + SocialWidget pair — no hover-to-reveal, no rotation.
 */
export default function FloatingSocialDock({ socialLinks, whatsapp }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const findLink = (name) =>
    socialLinks?.find((l) => l?.name?.toLowerCase() === name)?.href;

  const github = findLink('github');
  const linkedin = findLink('linkedin');

  const whatsappUrl =
    whatsapp?.phoneNumber &&
    `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || 'Hello!')}`;

  const items = [
    github && { key: 'github', href: github, label: 'GitHub', Icon: FaGithub, size: 'sm' },
    linkedin && { key: 'linkedin', href: linkedin, label: 'LinkedIn', Icon: FaLinkedin, size: 'sm' },
    whatsappUrl && { key: 'whatsapp', href: whatsappUrl, label: 'Chat on WhatsApp', Icon: MessageCircle, size: 'lg' },
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col-reverse gap-3">
      {items.map(({ key, href, label, Icon, size }, idx) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`group relative flex items-center justify-center rounded-full shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-accent/30 ${
            size === 'lg' ? 'w-14 h-14 bg-text text-bg hover:bg-accent' : 'w-11 h-11 bg-surface border border-border text-text-muted hover:text-accent hover:border-accent/40'
          } ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
          style={{ transitionDelay: `${idx * 90}ms` }}
        >
          <Icon size={size === 'lg' ? 24 : 18} />

          {/* Tooltip — opens to the right since the dock lives on the left edge */}
          <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded bg-text px-2.5 py-1 font-mono-ui text-[11px] uppercase tracking-[0.1em] text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
