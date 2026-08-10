import React, { useState } from 'react';
import { 
  FaShareAlt, 
  FaCopy, 
  FaCheck, 
  FaWhatsapp, 
  FaLinkedin, 
  FaFacebook, 
  FaTwitter 
} from 'react-icons/fa';

export default function ShareButton({ title, url }) {
  const [copied, setCopied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const shareData = {
    title: title,
    url: url || (typeof window !== 'undefined' ? window.location.href : ''),
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error sharing:', err);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + shareData.url)}`,
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'X (Twitter)',
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareData.url)}`,
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-black/5 dark:bg-white/5 px-3 py-1.5 text-xs font-mono-ui uppercase tracking-wider text-text hover:border-accent transition-colors"
      >
        <FaShareAlt size={13} />
        Share
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-bg/95 backdrop-blur-md p-2 shadow-xl z-50">
          <button
            onClick={handleCopyLink}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {copied ? <FaCheck size={13} className="text-green-500" /> : <FaCopy size={13} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          
          <div className="my-1 border-t border-border" />

          {shareLinks.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <Icon size={13} />
                {platform.name}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}