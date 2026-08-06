import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

/**
 * Floating social links widget positioned at bottom-right corner.
 * Displays social icons in a rotating carousel that animates on hover.
 * Positioned above WhatsApp FAB when both are present.
 */
export default function SocialWidget({ socialLinks }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotationIndex, setRotationIndex] = useState(0);

  if (!socialLinks || socialLinks.length === 0) return null;

  // Map social link names to icons
  const ICON_MAP = {
    linkedin: FaLinkedin,
    github: FaGithub,
    email: Mail,
    mail: Mail,
  };

  // Get the current icon to display (rotates through available icons)
  const currentLink = socialLinks[rotationIndex];
  const IconComponent = ICON_MAP[currentLink?.name?.toLowerCase()] || Mail;

  // Handle carousel rotation on hover
  const handleHoverEnter = () => {
    setIsHovered(true);
  };

  const handleHoverLeave = () => {
    setIsHovered(false);
    setRotationIndex(0);
  };

  const rotateCarousel = () => {
    setRotationIndex((prev) => (prev + 1) % socialLinks.length);
  };

  return (
    <div
      className="fixed bottom-24 right-8 z-40"
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
    >
      {/* Social links carousel container */}
      <div className="relative">
        {/* Main button that rotates */}
        <button
          onClick={rotateCarousel}
          className={`
            flex items-center justify-center
            w-14 h-14 rounded-full
            bg-gradient-to-br from-accent to-accent/80
            text-bg shadow-lg
            transition-all duration-300 transform
            hover:-translate-y-1
            border border-accent/50
            backdrop-blur-md
            group
          `}
          aria-label="Social links"
        >
          <IconComponent
            size={24}
            className={`transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`}
          />
        </button>

        {/* Hover indicator ring animation */}
        <div
          className={`
            absolute inset-0 rounded-full
            border-2 border-accent/30
            pointer-events-none
            transition-all duration-300
            ${isHovered ? 'scale-125 opacity-0 animate-pulse' : 'scale-100 opacity-0'}
          `}
          aria-hidden="true"
        />

        {/* Stacked secondary icons visible on hover */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-3">
            {socialLinks.map((link, idx) => {
              if (idx === rotationIndex) return null; // Don't show the main one
              const Icon = ICON_MAP[link?.name?.toLowerCase()] || Mail;
              return (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    bg-surface border border-border
                    text-accent shadow-md
                    transition-all duration-300 transform
                    hover:bg-accent hover:text-bg hover:-translate-y-1
                    hover:scale-110
                    animate-fade-in-up
                  `}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                  aria-label={`Visit ${link.name}`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        )}

        {/* Tooltip showing current link name */}
        {isHovered && (
          <div
            className={`
              absolute bottom-full right-full mr-4 mb-2
              px-3 py-1 rounded bg-text text-bg text-xs font-mono-ui uppercase
              tracking-[0.1em] whitespace-nowrap
              animate-fade-in-up pointer-events-none
            `}
          >
            {currentLink?.name}
          </div>
        )}
      </div>
    </div>
  );
}
