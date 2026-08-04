"use client";

import LogoImage from "./LogoImage";
import TitleHighlight from "./TitleHighlight";
import { siteConfig as fallbackSite } from "@/lib/data";

type Partner = (typeof fallbackSite.partnerLogos)[number];

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="glass-card-hover p-5 h-full flex flex-col items-center justify-center text-center w-full sm:w-[260px] shrink-0">
      <p className="text-gold/70 text-xs font-semibold uppercase tracking-wider mb-4">
        {partner.role}
      </p>
      <div
        className={`w-full h-28 mb-4 rounded-xl flex items-center justify-center overflow-hidden p-4 ${
          partner.bg === "light" ? "bg-white" : "bg-black border border-white/10"
        }`}
      >
        <LogoImage src={partner.src} alt={partner.fullName} className="h-full w-auto" />
      </div>
      <p className="text-white/70 text-sm font-medium">{partner.fullName}</p>
    </div>
  );
}

export default function PartnersSection({
  partners = fallbackSite.partnerLogos,
  eyebrow,
  title,
  titleHighlight,
  subtitle,
}: {
  partners?: Partner[];
  eyebrow?: string | null;
  title?: string | null;
  titleHighlight?: string | null;
  subtitle?: string | null;
}) {
  const scroll = partners.length >= 4;
  const loop = scroll ? [...partners, ...partners] : partners;

  return (
    <section className="relative py-10 sm:py-12">
      <div className="site-container">
        <div className="text-center mb-8">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {eyebrow || "Our Partners"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            <TitleHighlight
              title={title || "Trusted by Leaders"}
              highlight={titleHighlight || "Leaders"}
            />
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle ||
              "Inspire Oman is powered by strategic collaboration between OCCI, Gulf Madhyamam, and mefriend"}
          </p>
        </div>

        {scroll ? (
          <div className="partners-marquee overflow-hidden mask-fade-x">
            <div className="partners-marquee-track flex gap-4 w-max hover:[animation-play-state:paused]">
              {loop.map((partner, i) => (
                <PartnerCard key={`${partner.name}-${i}`} partner={partner} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 items-stretch">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
