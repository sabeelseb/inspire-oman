"use client";

import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
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
          {/* Contact Info */}
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
                lines: [siteConfig.venue, "Muscat, Oman"],
              },
              {
                icon: Phone,
                label: "India",
                lines: [siteConfig.contact.india.phone, siteConfig.contact.india.email],
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

          {/* Form */}
          <ScrollReveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: "name" as const, placeholder: "Your Name", type: "text" },
                  { name: "email" as const, placeholder: "Email Address", type: "email" },
                  { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
                  { name: "subject" as const, placeholder: "Subject", type: "text" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.name !== "phone"}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                ))}
              </div>
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Message
                <Send size={16} className="ml-2" />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
