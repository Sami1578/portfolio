// resources/js/Components/sections/Contact.jsx
import React from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import TiltIDE from '../ui/TiltIDE'; // Import your 3D tilt component
import useContactForm from '../../hooks/useContactForm';
import useScrollReveal from '../../hooks/useScrollReveal';

const ICONS = { Mail, Phone, MapPin };

const FIELDS = [
  { id: 'name', label: 'Your name', type: 'text', placeholder: 'John Doe' },
  { id: 'email', label: 'Your email', type: 'email', placeholder: 'john@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project discussion' },
];

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent focus:bg-white/[0.07] transition-colors duration-300';

export default function Contact({ contactInfo, socialLinks }) {
  const { formData, handleChange, handleSubmit, isSubmitting, submitted, error } = useContactForm();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg">
      <Container>
        <SectionHeader
          eyebrow="Contact"
          heading="Get in touch"
          description="Have a project in mind? Let's talk about what you need."
        />

        <div
          ref={ref}
          className={`reveal ${isVisible ? 'is-visible' : ''} rounded-3xl bg-[#12131A] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12`}
        >
          {/* Form (Stays flat for optimal UX during typing) */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl font-bold text-white mb-8">Send a message</h3>

            {submitted && (
              <div className="mb-6 py-3 border-l-2 border-status pl-4 bg-status/10 text-status text-sm rounded-r">
                Message sent — I&apos;ll get back to you soon.
              </div>
            )}
            {error && (
              <div className="mb-6 py-3 border-l-2 border-red-500 pl-4 bg-red-500/10 text-red-400 text-sm rounded-r">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {FIELDS.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/50 mb-2">
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
                <label htmlFor="message" className="block font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/50 mb-2">
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

              <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full !bg-accent !text-white hover:!bg-accent-deep">
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

          {/* Info + Socials wrapped in 3D Tilt Card */}
          <div className="lg:col-span-5">
            <TiltIDE className="p-8 border border-white/10 bg-white/[0.02] h-full">
              <h3 
                className="font-display text-2xl font-bold text-white mb-8"
                style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
              >
                Contact information
              </h3>

              {/* Contact Information Items (Layer Z: 10px) */}
              <div 
                className="space-y-1"
                style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}
              >
                {contactInfo?.map((info, index) => {
                  const Icon = ICONS[info?.icon] || Mail;
                  const content = (
                    <div className="flex items-center gap-4 py-4 border-b border-white/10 group">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 shadow-inner">
                        <Icon className="text-accent" size={17} />
                      </div>
                      <div>
                        <p className="text-white/40 text-[11px] font-mono-ui uppercase tracking-[0.12em]">{info?.label}</p>
                        <p className="text-white text-sm mt-0.5 group-hover:text-accent transition-colors duration-200">{info?.value}</p>
                      </div>
                    </div>
                  );
                  return info?.href ? (
                    <a key={index} href={info.href}>{content}</a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* Social Links (Layer Z: 15px) */}
              {socialLinks && socialLinks.length > 0 && (
                <div 
                  className="mt-10"
                  style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                >
                  <h4 className="font-mono-ui text-[11px] uppercase tracking-[0.16em] text-white/40 mb-4">Social links</h4>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono-ui text-xs uppercase tracking-[0.1em] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </TiltIDE>
          </div>
        </div>
      </Container>
    </section>
  );
}