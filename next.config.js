const { withPayload } = require("@payloadcms/next/withPayload");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Ensure Keystatic content YAML is available to Vercel serverless functions
  outputFileTracingIncludes: {
    "/api/keystatic/[...params]": ["./content/**/*", "./keystatic.config.*"],
    "/keystatic/[[...params]]": ["./content/**/*", "./keystatic.config.*"],
    "/*": ["./content/**/*"],
  },
};

module.exports = withPayload(nextConfig);
