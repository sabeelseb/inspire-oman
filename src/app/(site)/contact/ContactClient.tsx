"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import TitleHighlight from "@/components/TitleHighlight";
import FormThankYou from "@/components/FormThankYou";
import { useCmsSite } from "@/components/CmsProvider";
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

type PageData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
};

const inputClass =
  "w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors";

export default function ContactClient({ page }: { page: PageData | null }) {
  const siteConfig = useCmsSite();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateContactFields(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    const result = await submitToAdmin("contact", {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    });
    setSending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const title = page?.title || "Contact Us";
  const highlight = page?.highlight || "Us";

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            {page?.eyebrow || "Get In Touch"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <TitleHighlight title={title} highlight={highlight} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            {page?.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: "Oman Office",
                lines: [siteConfig.contact.oman.phone1, siteConfig.contact.oman.phone2],
              },
              {
                icon: Mail,
                title: "Email Us",
                lines: [siteConfig.contact.oman.email, siteConfig.contact.india.email],
              },
              {
                icon: MapPin,
                title: "Summit Venue",
                lines: [siteConfig.venue, `${siteConfig.city}, Sultanate of Oman`],
              },
              {
                icon: Phone,
                title: "India Office",
                lines: [siteConfig.contact.india.phone, siteConfig.contact.india.email],
              },
              {
                icon: Clock,
                title: "Office Hours",
                lines: ["Sunday - Thursday", "9:00 AM - 6:00 PM (GST)"],
              },
              {
                icon: Globe,
                title: "Coverage",
                lines: ["Oman • India • UAE", "International Delegates Welcome"],
              },
            ].map(({ icon: Icon, title: cardTitle, lines }, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{cardTitle}</h3>
                  {lines.map((line, j) => (
                    <p key={j} className="text-white/50 text-sm">
                      {line}
                    </p>
                  ))}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Send Us a <span className="gold-text">Message</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-8">
                  Whether you&apos;re interested in partnership opportunities, summit registration,
                  media inquiries, or general questions - we&apos;re here to help.
                </p>

                <div className="glass-card p-6 border-l-2 border-l-gold">
                  <h4 className="text-white font-semibold mb-2">Partnership Inquiries</h4>
                  <p className="text-white/40 text-sm leading-relaxed">
                    For sponsorship and partnership discussions, please visit our{" "}
                    <a href="/partner" className="text-gold hover:underline">
                      Partner With Us
                    </a>{" "}
                    page or contact us directly.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal className="lg:col-span-3" delay={0.1}>
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
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
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
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
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
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: sanitizePhoneInput(e.target.value) });
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
                        value={form.subject}
                        onChange={(e) => {
                          setForm({ ...form, subject: e.target.value });
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
                      rows={6}
                      required
                      minLength={MIN_TEXT_LENGTH}
                      title={`At least ${MIN_TEXT_LENGTH} characters`}
                      value={form.message}
                      onChange={(e) => {
                        setForm({ ...form, message: e.target.value });
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
      </section>

      <FormThankYou
        open={submitted}
        title={CONTACT_THANK_YOU.title}
        paragraphs={CONTACT_THANK_YOU.paragraphs}
        onClose={() => setSubmitted(false)}
      />

      <section className="relative h-[400px] bg-primary-light">
        <IslamicPattern opacity={0.04} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-gold/20 mx-auto mb-4" />
            <p className="text-white/30 text-lg font-medium">{siteConfig.venue}</p>
            <p className="text-white/20 text-sm mt-2">{siteConfig.city}, Sultanate of Oman</p>
          </div>
        </div>
      </section>
    </>
  );
}
