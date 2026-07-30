"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, ArrowRight, Send, ChevronDown, FileText, Shield } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { packages } from "@/lib/data";

export default function PartnerPage() {
  const [form, setForm] = useState({
    companyName: "", contactPerson: "", email: "", phone: "",
    designation: "", address: "", tier: "Leadership Partnership",
    paymentMethod: "Bank Transfer", agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    alert("Thank you! Your sponsorship application has been submitted. Our team will contact you shortly.");
    setForm({
      companyName: "", contactPerson: "", email: "", phone: "",
      designation: "", address: "", tier: "Leadership Partnership",
      paymentMethod: "Bank Transfer", agreeTerms: false,
    });
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
            Partnership Opportunities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Partner With{" "}
            <span className="gold-text">Inspire Oman</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Position your brand alongside Oman&apos;s most prestigious business initiative
            and connect with leaders shaping the nation&apos;s future
          </motion.p>
        </div>
      </section>

      {/* Packages Comparison */}
      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your <span className="gold-text">Package</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-20">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.tier} delay={i * 0.15} className="h-full">
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`relative glass-card-hover p-8 flex flex-col h-full ${
                    pkg.highlight ? "border-gold/40 gold-glow" : ""
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold text-primary-dark text-xs font-bold flex items-center gap-1.5">
                      <Crown size={12} /> MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.tier}</h3>
                  <p className="text-white/40 text-sm mb-6">Partnership</p>
                  <div className="mb-8">
                    <span className="text-4xl font-black gold-text">{pkg.price}</span>
                    <span className="text-white/50 text-sm ml-2">{pkg.currency}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check size={16} className="text-gold shrink-0 mt-0.5" />
                        <span className="text-white/60">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#apply"
                    className={`${pkg.highlight ? "btn-primary" : "btn-outline"} w-full text-center mt-auto`}
                  >
                    Select Package <ArrowRight size={16} className="ml-2" />
                  </a>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison Table */}
          <ScrollReveal>
            <div className="glass-card overflow-hidden overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/50 font-medium p-5">Feature</th>
                    <th className="text-center text-white/70 font-semibold p-5">Associate</th>
                    <th className="text-center text-gold font-semibold p-5 bg-gold/5">Leadership</th>
                    <th className="text-center text-white/70 font-semibold p-5">Premier</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Publication Pages", "1 page", "2 pages", "3 pages"],
                    ["Brand Video", "45 sec", "90 sec", "3-5 min"],
                    ["Summit Entries", "2 officials", "5 officials", "8 officials"],
                    ["Logo Placement", "Basic", "Premium", "Title Sponsor"],
                    ["Networking Access", "Standard", "Priority", "VIP & Lounge"],
                    ["Stage Mention", "-", "-", "Keynote"],
                    ["Media Package", "-", "Included", "Full Package"],
                  ].map(([feature, ...values], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-5 text-white/60">{feature}</td>
                      {values.map((v, j) => (
                        <td key={j} className={`p-5 text-center ${j === 1 ? "bg-gold/5" : ""} ${v === "-" ? "text-white/20" : "text-white/70"}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-5 text-white/60 font-semibold">Investment</td>
                    <td className="p-5 text-center text-white/70 font-bold">1,000 OMR</td>
                    <td className="p-5 text-center text-gold font-bold bg-gold/5">2,000 OMR</td>
                    <td className="p-5 text-center text-white/70 font-bold">3,000 OMR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-primary-light relative" id="apply">
        <IslamicPattern opacity={0.03} />
        <div className="relative site-container">
          <div className="mx-auto w-full max-w-3xl">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-6">
              <FileText size={16} /> DIGITAL SPONSORSHIP AGREEMENT
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Apply to <span className="gold-text">Partner</span>
            </h2>
            <p className="text-white/50">
              Complete the form below and our team will contact you to finalize the partnership
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: "companyName" as const, placeholder: "Company / Brand Name", type: "text" },
                  { name: "contactPerson" as const, placeholder: "Contact Person", type: "text" },
                  { name: "email" as const, placeholder: "Email Address", type: "email" },
                  { name: "phone" as const, placeholder: "Phone Number", type: "tel" },
                  { name: "designation" as const, placeholder: "Designation", type: "text" },
                  { name: "address" as const, placeholder: "Address", type: "text" },
                ].map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="relative">
                  <select
                    value={form.tier}
                    onChange={(e) => setForm({ ...form, tier: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
                  >
                    {["Associate Partnership - 1,000 OMR", "Leadership Partnership - 2,000 OMR", "Premier Partnership - 3,000 OMR"].map((t) => (
                      <option key={t} value={t} className="bg-primary text-white">{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
                <div className="relative">
                  <select
                    value={form.paymentMethod}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none"
                  >
                    {["Bank Transfer", "Cheque"].map((m) => (
                      <option key={m} value={m} className="bg-primary text-white">{m}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                </div>
              </div>

              {/* Terms */}
              <div className="glass-card p-5 text-sm text-white/40 space-y-2">
                <div className="flex items-center gap-2 text-gold/70 font-medium">
                  <Shield size={16} /> Terms & Conditions
                </div>
                <p>Payment is to be made in advance via cheque or bank transfer to Gulf Madhyamam L.L.C. (Bank Muscat). The partnership includes all deliverables specified in the selected tier. Content and schedules are subject to editorial guidelines.</p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-1 accent-gold-DEFAULT"
                />
                <span className="text-white/50 text-sm">
                  I acknowledge and agree to the terms and conditions of the Inspire Oman Sponsorship Agreement.
                </span>
              </label>

              <button type="submit" className="btn-primary w-full">
                Submit Application
                <Send size={16} className="ml-2" />
              </button>
            </form>
          </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
