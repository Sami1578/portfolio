// resources/js/Components/layout/ContactFab.jsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ContactFab({ whatsapp }) {
  if (!whatsapp || !whatsapp.phoneNumber) return null;

  const url = `https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || 'Hello!')}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-text text-bg hover:bg-accent transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover-lift"
      aria-label="Message me on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}