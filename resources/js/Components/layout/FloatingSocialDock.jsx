// resources/js/Components/layout/FloatingSocialDock.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle, Plus, X } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function FloatingSocialDock({ socialLinks, whatsapp }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transform, setTransform] = useState('perspective(600px) rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const cardRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Close dock if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const findLink = (name) =>
    socialLinks?.find((l) => l?.name?.toLowerCase() === name)?.href;

  const github = findLink('github');
  const linkedin = findLink('linkedin');

  const whatsappUrl =
    whatsapp?.phoneNumber &&
    `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || 'Hello!')}`;

  const items = [
    whatsappUrl && { key: 'whatsapp', href: whatsappUrl, label: 'WhatsApp', Icon: MessageCircle, color: '#25D366' },
    linkedin && { key: 'linkedin', href: linkedin, label: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2' },
    github && { key: 'github', href: github, label: 'GitHub', Icon: FaGithub, color: '#ffffff' },
  ].filter(Boolean);

  if (items.length === 0) return null;

  // 3D Parallax Tilt Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    setTransform(`perspective(600px) rotateX(${(-y * 15).toFixed(2)}deg) rotateY(${(x * 15).toFixed(2)}deg) scale3d(1.05, 1.05, 1.05)`);
    setGlare({
      opacity: 0.3,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef}
      className={`fixed bottom-8 left-8 z-50 flex flex-col items-center transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* 3D Glassmorphic Icon Box */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, opacity 0.3s ease, visibility 0.3s',
        }}
        className={`relative mb-4 rounded-2xl border border-white/10 bg-[#12131A]/90 p-3 shadow-2xl backdrop-blur-xl ${
          isOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Ambient Backlight Glow */}
        <div 
          className="absolute -inset-1 rounded-2xl bg-accent/20 blur-lg opacity-50" 
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* Dynamic Light Reflection */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.25) 0%, transparent 70%)`,
          }}
        />

        {/* Icon Stack */}
        <div className="relative z-10 flex flex-col gap-3" style={{ transformStyle: 'preserve-3d' }}>
          {items.map(({ key, href, label, Icon, color }, idx) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                transform: `translateZ(${15 + idx * 5}px)`,
                transitionDelay: `${isOpen ? idx * 50 : 0}ms`,
              }}
              className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] shadow-inner transition-all duration-300 hover:scale-110 hover:border-accent/40 hover:bg-white/[0.1]"
            >
              <Icon size={20} style={{ color }} className="transition-transform duration-300 group-hover:scale-110" />
              
              {/* Hover Tooltip (Appears to the right) */}
              <span className="pointer-events-none absolute left-full ml-4 whitespace-nowrap rounded bg-text px-2.5 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-bg opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Single Floating Action Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Social Links"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-text text-bg shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-white"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Button Ambient Glow */}
        <span className="absolute -inset-1 rounded-full bg-accent/40 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Dynamic Icon Transition */}
        <div 
          className="relative z-10 transition-transform duration-500 ease-out"
          style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)' }}
        >
          {isOpen ? <X size={22} /> : <Plus size={22} />}
        </div>
      </button>
    </div>
  );
}