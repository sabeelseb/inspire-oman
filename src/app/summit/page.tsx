"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays, MapPin, Users, Clock, Mic, Coffee, Star,
  ArrowRight, Send, ChevronDown,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { siteConfig, speakers, agenda } from "@/lib/data";

const typeColors: Record<string, string> = {
  keynote: "border-l-gold",
  featured: "border-l-gold bg-gold/5",
  session: "border-l-white/20",
  break: "border-l-white/10",
  general: "border-l-white/10",
};

const typeIcons: Record<string, React.ElementType> = {
  keynote: Mic,
  featured: Star,
  session: Users,
  break: Coffee,
  general: Clock,
};

export default function SummitPage() {
  const [regForm, setRegForm] = useState({
    name: "", email: "", phone: "", organization: "", role: "CEO",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for registering! You will receive a confirmation email shortly.");
    setRegForm({ name: "", email: "", phone: "", organization: "", role: "CEO" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.04] blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
          >
            <CalendarDays size={16} />
            {siteConfig.summitDate}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Investors Summit{" "}
            <span className="gold-text">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mb-8"
          >
            Discover, Connect &amp; Prosper — a flagship gathering of business leaders,
            investors, and government officials shaping Oman&apos;s future
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-white/40 text-sm"
          >
            <MapPin size={16} className="text-gold/60" />
            {siteConfig.venue}
          </motion.div>
        </div>
      </section>

      {/* Agenda */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Programme</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Summit <span className="gold-text">Agenda</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {agenda.map((item, i) => {
              const Icon = typeIcons[item.type];
              return (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className={`glass-card p-5 border-l-4 ${typeColors[item.type]} flex items-center gap-4`}>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.title}</p>
                    </div>
                    <p className="text-gold/70 text-sm font-medium shrink-0">{item.time}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="section-padding bg-primary-light relative">
        <IslamicPattern opacity={0.03} />
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Speakers</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Inspiring <span className="gold-text">Voices</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`glass-card-hover p-6 text-center ${speaker.featured ? "border-gold/30 gold-glow" : ""}`}
                >
                  {speaker.featured && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold mb-4">
                      <Star size={10} /> FEATURED
                    </div>
                  )}
                  <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Mic size={28} className="text-gold/40" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{speaker.name}</h3>
                  <p className="text-gold/70 text-sm mb-3">{speaker.role}</p>
                  <p className="text-white/40 text-sm">{speaker.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="section-padding" id="register">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Register</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Secure Your <span className="gold-text">Spot</span>
            </h2>
            <p className="text-white/50">Join 500+ delegates at the Inspire Oman Investors Summit</p>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleRegister} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: "name" as const, placeholder: "Full Name", type: "text" },
                  { name: "email" as const, placeholder: "Email Address", type: "email" },
                  { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
                  { name: "organization" as const, placeholder: "Organization", type: "text" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={regForm[field.name]}
                    onChange={(e) => setRegForm({ ...regForm, [field.name]: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                ))}
              </div>
              <div className="relative">
                <select
                  value={regForm.role}
                  onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
                >
                  {["CEO / Business Owner", "Investor", "Government Official", "Corporate Executive", "SME Leader", "Media", "Delegate"].map((r) => (
                    <option key={r} value={r} className="bg-primary text-white">{r}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Register Now
                <Send size={16} className="ml-2" />
              </button>
              <p className="text-white/30 text-xs text-center">
                By registering, you agree to receive communications regarding Inspire Oman.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
