"use client";

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export default function IslamicPattern({ className = "", opacity = 0.05 }: IslamicPatternProps) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M40 0 L80 20 L80 60 L40 80 L0 60 L0 20 Z"
            fill="none"
            stroke="#C5A55A"
            strokeWidth="0.5"
          />
          <path
            d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z"
            fill="none"
            stroke="#C5A55A"
            strokeWidth="0.3"
          />
          <circle cx="40" cy="40" r="8" fill="none" stroke="#C5A55A" strokeWidth="0.3" />
          <circle cx="40" cy="40" r="3" fill="none" stroke="#C5A55A" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-geo)" />
    </svg>
  );
}
