import React from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
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
  'w-full bg-transparent border-0 border-b border-border py-3 text-text placeholder-text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300';

export default function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 md:py-32 bg-surface relative">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Contact"
          heading="Get in touch"
          description="Have a project in mind? Let's talk about what you need."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-border-strong pt-12`}
        >
          {/* Form */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl text-text mb-8">Send a message</h3>

            {submitted && (
              <div className="mb-6 py-3 border-l-2 border-status pl-4 bg-status/5 text-status text-sm">
                Message sent — I&apos;ll get back to you soon.
              </div>
            )}
            {error && (
              <div className="mb-6 py-3 border-l-2 border-red-500 pl-4 bg-red-500/5 text-red-500 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2"
                  >
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
                <label
                  htmlFor="message"
                  className="block font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-2"
                >
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
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Info + social */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl text-text mb-8">Contact information</h3>

            <div className="border-t border-border">
              {contactInfo?.map((info, index) => {
                const Icon = ICONS[info?.icon] || Mail;
                const content = (
                  <div className="flex items-center gap-4 py-4 border-b border-border group">
                    <Icon className="text-accent shrink-0" size={18} />
                    <div>
                      <p className="text-text-muted text-[11px] font-mono-ui uppercase tracking-[0.14em]">
                        {info?.label}
                      </p>
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

            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-10">
                <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-text-muted mb-4">
                  Social links
                </h4>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono-ui text-xs uppercase tracking-[0.12em] text-text-muted hover:text-accent transition-colors duration-200 underline underline-offset-4 decoration-1 decoration-border hover:decoration-accent"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}