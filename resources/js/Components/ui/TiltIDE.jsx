// resources/js/Components/ui/TiltIDE.jsx
import React, { useState, useRef } from 'react';

export default function TiltIDE({ children, className = '' }) {
  const [transform, setTransform] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  );
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor position relative to center of element (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Set max tilt angles (degrees)
    const maxTiltX = 10;
    const maxTiltY = 10;

    const rotateX = -mouseY * maxTiltX;
    const rotateY = mouseX * maxTiltY;

    setTransform(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );

    // Calculate glare gradient coordinates (%)
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;

    setGlare({
      opacity: 0.15,
      x: glareX,
      y: glareY,
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative group/tilt">
      {/* 3D Ambient Glowing Background Aura */}
      <div 
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/30 via-accent-deep/20 to-accent/30 blur-xl opacity-40 group-hover/tilt:opacity-80 transition-opacity duration-500"
        style={{ transform: 'translateZ(-20px)' }}
      />

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        }}
        className={`relative rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20 overflow-hidden text-left ${className}`}
      >
        {/* Dynamic Light Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
          }}
        />

        {children}
      </div>
    </div>
  );
}