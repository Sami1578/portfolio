import React from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageCircle } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import BracketFrame from '../ui/BracketFrame';
import Button from '../ui/Button';
import useContactForm from '../../hooks/useContactForm';
import useScrollReveal from '../../hooks/useScrollReveal';

const ICONS = { Mail, Phone, MapPin };

const FIELDS = [
  { id: 'name', label: 'Your name', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Your email', type: 'email', placeholder: 'john@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project discussion' },
];

const inputClasses =
  'w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/60 focus:outline-none focus:border-accent transition-colors duration-300';

export default function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-28 bg-surface relative">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          heading="Get in touch"
          description="Have a project in mind? Let's talk about what you need."
        />

        <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-2 gap-12`}>
          {/* Form */}
          <BracketFrame className="bg-bg border border-border p-8">
            <h3 className="font-display text-xl font-semibold text-text mb-6">Send a message</h3>

            {submitted && (
              <div className="mb-6 p-4 border border-status/30 bg-status/10 text-status text-sm">
                Message sent — I&apos;ll get back to you soon.
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </BracketFrame>

          {/* Info + Social Links */}
          <div className="space-y-6">
            <BracketFrame className="bg-bg border border-border p-8">
              <h3 className="font-display text-xl font-semibold text-text mb-6">Contact information</h3>
              <div className="space-y-2">
                {contactInfo?.map((info, index) => {
                  const Icon = ICONS[info?.icon] || Mail;
                  const content = (
                    <div className="flex items-center gap-4 py-4 border-b border-border last:border-0 group">
                      <div className="w-11 h-11 border border-border flex items-center justify-center flex-shrink-0">
                        <Icon className="text-accent" size={18} />
                      </div>
                      <div>
                        <p className="text-text-muted text-xs font-mono-ui uppercase tracking-[0.1em]">{info?.label}</p>
                        <p className="text-text text-sm mt-0.5 group-hover:text-accent transition-colors duration-200">
                          {info?.value}
                        </p>
                      </div>
                    </div>
                  );

                  return info?.href ? (
                    <a key={index} href={info.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Profiles */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-mono-ui text-xs uppercase tracking-[0.15em] text-text-muted mb-4">
                    Social Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-border bg-surface text-text-muted hover:text-accent hover:border-accent transition-colors duration-200 font-mono-ui text-xs uppercase"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </BracketFrame>
          </div>
        </div>
      </Container>

      {/* Floating WhatsApp Button */}
      {/* {whatsapp?.phoneNumber && (
        <a
          href={`https://wa.me/${whatsapp.phoneNumber}?text=${encodeURIComponent(whatsapp.defaultMessage || 'Hello!')}`}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      )} */}
    </section>
  );
}