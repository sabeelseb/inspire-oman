"use client";

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** Use native img for logos — Next/Image often fails on complex SVGs. */
export default function LogoImage({ src, alt, className = "", priority = false }: LogoImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`max-w-full max-h-full object-contain ${className}`}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
