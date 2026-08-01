const { withPayload } = require("@payloadcms/next/withPayload");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
      images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Ensure Keystatic content YAML is available to serverless / standalone traces
  outputFileTracingIncludes: {
    "/api/keystatic/[...params]": ["./content/**/*", "./keystatic.config.*"],
    "/keystatic/[[...params]]": ["./content/**/*", "./keystatic.config.*"],
    "/*": ["./content/**/*"],
  },
};

module.exports = withPayload(nextConfig);
