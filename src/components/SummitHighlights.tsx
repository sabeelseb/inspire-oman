"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users, ArrowRight, Star } from "lucide-react";
import { siteConfig, speakers } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function SummitHighlights() {
  return (
    <section className="relative section-padding bg-primary-light">
      <div className="site-container">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Flagship Event
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Investors Summit{" "}
            <span className="gold-text">2026</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Discover, Connect &amp; Prosper - bringing together leaders, investors, and visionaries
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-4 mb-16 items-stretch">
            {[
              { icon: CalendarDays, label: "Date", value: siteConfig.summitDate },
              { icon: MapPin, label: "Venue", value: siteConfig.venue },
              { icon: Users, label: "Expected", value: "500+ Delegates" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-white font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass-card overflow-hidden mb-12">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-semibold w-fit mb-6">
                  <Star size={12} />
                  FEATURED SPEAKER
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {speakers[0].name}
                </h3>
                <p className="text-gold/80 text-sm font-medium mb-4">{speakers[0].role}</p>
                <p className="text-white/50 leading-relaxed mb-6">{speakers[0].description}</p>
                <Link href="/summit" className="btn-primary w-fit text-sm">
                  View Full Agenda <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
              <div className="relative min-h-[300px]">
                <Image
                  src={siteConfig.images.summit}
                  alt="Inspire Oman Investors Summit"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-primary/50" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <div>
                    <p className="text-white/80 text-sm">Special Transformational Session</p>
                    <p className="text-gold font-bold text-lg mt-2">{siteConfig.summitDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* One reveal for the row so cards stay top/bottom aligned */}
        <ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 items-stretch">
            {speakers.slice(1).map((speaker, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="glass-card-hover p-6 h-full flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Users size={24} className="text-gold/60" />
                </div>
                <h4 className="text-lg font-semibold text-white">{speaker.name}</h4>
                <p className="text-gold/70 text-sm mb-3">{speaker.role}</p>
                <p className="text-white/40 text-sm flex-1">{speaker.description}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
