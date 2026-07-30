"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Contact <span className="gold-text">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Reach out for inquiries, partnerships, sponsorships, or collaboration opportunities
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
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
                lines: [siteConfig.venue, "Muscat, Sultanate of Oman"],
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
            ].map(({ icon: Icon, title, lines }, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{title}</h3>
                  {lines.map((line, j) => (
                    <p key={j} className="text-white/50 text-sm">{line}</p>
                  ))}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Form */}
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
                    <a href="/partner" className="text-gold hover:underline">Partner With Us</a>{" "}
                    page or contact us directly.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal className="lg:col-span-3" delay={0.1}>
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
                      value={form[field.name]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                    />
                  ))}
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
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

      {/* Map placeholder */}
      <section className="relative h-[400px] bg-primary-light">
        <IslamicPattern opacity={0.04} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="text-gold/20 mx-auto mb-4" />
            <p className="text-white/30 text-lg font-medium">Oman Convention & Exhibition Centre</p>
            <p className="text-white/20 text-sm mt-2">Muscat, Sultanate of Oman</p>
          </div>
        </div>
      </section>
    </>
  );
}
