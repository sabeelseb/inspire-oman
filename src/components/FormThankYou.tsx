"use client";

import { CheckCircle2 } from "lucide-react";

export default function FormThankYou({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: readonly string[];
}) {
  return (
    <div className="glass-card p-8 sm:p-10 text-center space-y-5">
      <div className="mx-auto w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
        <CheckCircle2 size={28} className="text-gold" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold text-white">{title}</h3>
      <div className="space-y-4 max-w-xl mx-auto">
        {paragraphs.map((p) => (
          <p key={p} className="text-white/55 text-sm sm:text-base leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
