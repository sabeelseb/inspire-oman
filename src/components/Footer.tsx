"use client";

import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/data";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import IslamicPattern from "./IslamicPattern";
import LogoImage from "./LogoImage";

export default function Footer() {
  return (
    <footer className="relative bg-primary-dark border-t border-gold/10">
      <IslamicPattern opacity={0.03} />

      <div className="relative site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center">
                <LogoImage
                  src={siteConfig.images.logo}
                  alt="Inspire Oman"
                  className="h-full w-full"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white">Inspire</span>
                <span className="text-lg font-light text-gold ml-1">Oman</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {siteConfig.description.slice(0, 140)}...
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: siteConfig.social.instagram },
                { icon: Facebook, href: siteConfig.social.facebook },
                { icon: Linkedin, href: siteConfig.social.linkedin },
                { icon: Twitter, href: siteConfig.social.twitter },
                { icon: Youtube, href: siteConfig.social.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-gold/20 hover:text-gold transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-gold text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Contact - Oman</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Phone size={16} className="text-gold/60 mt-0.5 shrink-0" />
                <div>
                  <p>{siteConfig.contact.oman.phone1}</p>
                  <p>{siteConfig.contact.oman.phone2}</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Mail size={16} className="text-gold/60 mt-0.5 shrink-0" />
                {siteConfig.contact.oman.email}
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <MapPin size={16} className="text-gold/60 mt-0.5 shrink-0" />
                Oman Convention & Exhibition Centre, Muscat
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-6">Contact - India</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Phone size={16} className="text-gold/60 mt-0.5 shrink-0" />
                {siteConfig.contact.india.phone}
              </li>
              <li className="flex items-start gap-3 text-sm text-white/50">
                <Mail size={16} className="text-gold/60 mt-0.5 shrink-0" />
                {siteConfig.contact.india.email}
              </li>
            </ul>

            <div className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/10">
              <p className="text-xs text-gold/80 font-medium mb-1">Strategic Partner</p>
              <p className="text-sm text-white/70">Oman Chamber of Commerce & Industry</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-white/30 text-xs text-center">
            &copy; {new Date().getFullYear()} Inspire Oman. All rights reserved. An initiative by Gulf Madhyamam.
          </p>
        </div>
      </div>
    </footer>
  );
}
