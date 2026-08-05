"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import ScrollReveal from "./ScrollReveal";
import FormThankYou from "./FormThankYou";
import { submitToAdmin } from "@/lib/submit-form";
import {
  CONTACT_THANK_YOU,
  EMAIL_PATTERN,
  MIN_TEXT_LENGTH,
  NAME_PATTERN,
  PHONE_MAX_LENGTH,
  PHONE_PATTERN,
  sanitizePhoneInput,
  validateContactFields,
  type FieldErrors,
} from "@/lib/form-validation";

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors";

export default function ContactForm() {
  const siteConfig = useCmsSite();
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactFields(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    const result = await submitToAdmin("message", {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    });
    setSending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="relative section-padding bg-primary-light">
      <div className="site-container">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            We&apos;re Ready to{" "}
            <span className="gold-text">Help</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Reach out for inquiries, partnerships, sponsorships, or collaboration opportunities
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Phone,
                label: "Oman",
                lines: [siteConfig.contact.oman.phone1, siteConfig.contact.oman.phone2],
              },
              {
                icon: Mail,
                label: "Email",
                lines: [siteConfig.contact.oman.email],
              },
              {
                icon: MapPin,
                label: "Venue",
                lines: [siteConfig.venue, `${siteConfig.city}, Oman`],
              },
            ].map(({ icon: Icon, label, lines }, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="glass-card p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                    {lines.map((line, j) => (
                      <p key={j} className="text-white/70 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                    required
                    autoComplete="name"
                    minLength={MIN_TEXT_LENGTH}
                    pattern={NAME_PATTERN.source}
                    title={`Letters only (A–Z), at least ${MIN_TEXT_LENGTH} characters`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    className={inputClass}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    autoComplete="email"
                    pattern={EMAIL_PATTERN.source}
                    title="Valid email like name@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={inputClass}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={PHONE_MAX_LENGTH}
                    pattern={PHONE_PATTERN.source}
                    title="Digits only, optional leading +, max 15 characters"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        phone: sanitizePhoneInput(e.target.value),
                      });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={inputClass}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    minLength={MIN_TEXT_LENGTH}
                    title={`At least ${MIN_TEXT_LENGTH} characters`}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: "" });
                    }}
                    className={inputClass}
                    aria-invalid={Boolean(errors.subject)}
                  />
                  {errors.subject ? (
                    <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  required
                  minLength={MIN_TEXT_LENGTH}
                  title={`At least ${MIN_TEXT_LENGTH} characters`}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className={`${inputClass} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message ? (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                ) : null}
              </div>
                {errors.form ? (
                  <p className="text-sm text-red-400">{errors.form}</p>
                ) : null}
                <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                  <Send size={16} className="ml-2" />
                </button>
              </form>
          </ScrollReveal>
        </div>
      </div>

      <FormThankYou
        open={submitted}
        title={CONTACT_THANK_YOU.title}
        paragraphs={CONTACT_THANK_YOU.paragraphs}
        onClose={() => setSubmitted(false)}
      />
    </section>
  );
}
