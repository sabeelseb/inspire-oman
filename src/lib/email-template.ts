/** Shared HTML email chrome matching Inspire Oman (black / gold, Inter). */

/**
 * Public origin used for "Visit site" links.
 * Prefer env; default is the findown deploy hostname.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://inspireoman.findown.in"
).replace(/\/$/, "");

/**
 * Host for remote images in HTML email.
 * Gmail (esp. mobile) often fails CID attachments and shows them as broken
 * paperclip chips — use a public HTTPS URL instead.
 * Prefer EMAIL_ASSET_BASE_URL when the primary site host is down or private.
 */
const ASSET_BASE_URL = (
  process.env.EMAIL_ASSET_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://inspireoman.com"
).replace(/\/$/, "");

const LOGO_URL = `${ASSET_BASE_URL}/images/logos/inspire-oman-hero-logo.png`;

/** Matches site font stack (Inter). */
const FONT =
  "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const STRATEGIC_INITIATIVE =
  "A Strategic initiative of Oman Chamber of Commerce and Industries";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Bold highlight for dynamic values in HTML emails. */
export function bold(value: string): string {
  return `<strong style="font-weight:700;color:#0A0A0A;font-family:${FONT};">${escapeHtml(value)}</strong>`;
}

type EmailShellInput = {
  previewText: string;
  eyebrow: string;
  title: string;
  bodyHtml: string;
};

export function renderInspireEmailShell(input: EmailShellInput): string {
  const preview = escapeHtml(input.previewText);
  const eyebrow = escapeHtml(input.eyebrow);
  const title = escapeHtml(input.title);
  const initiative = escapeHtml(STRATEGIC_INITIATIVE);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <!--[if mso]>
  <style type="text/css">
    body, table, td, p, a, h1 { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#050505;-webkit-text-size-adjust:100%;font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preview}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050505;margin:0;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#0A0A0A;border-radius:14px;overflow:hidden;border:1px solid rgba(197,165,90,0.42);box-shadow:0 18px 50px rgba(0,0,0,0.45);">
          <!-- Header -->
          <tr>
            <td style="background-color:#0A0A0A;background-image:linear-gradient(165deg,#121212 0%,#0A0A0A 55%,#050505 100%);padding:26px 28px 22px;text-align:center;border-bottom:1px solid rgba(197,165,90,0.55);">
              <img src="${LOGO_URL}" alt="Inspire Oman" width="118" style="display:block;margin:0 auto 12px;max-width:118px;width:118px;height:auto;border:0;" />
              <p style="margin:0;font-family:${FONT};font-size:11px;line-height:1.55;font-weight:500;letter-spacing:0.04em;color:rgba(197,165,90,0.95);">
                ${initiative}
              </p>
            </td>
          </tr>
          <!-- Gold rule -->
          <tr>
            <td style="height:3px;line-height:3px;font-size:0;background:linear-gradient(90deg,transparent 0%,#A08940 15%,#C5A55A 50%,#D4AF37 70%,#A08940 85%,transparent 100%);">&nbsp;</td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:30px 28px 10px;background-color:#FFFFFF;font-family:${FONT};">
              <p style="margin:0 0 12px;font-family:${FONT};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C5A55A;font-weight:700;">
                ${eyebrow}
              </p>
              <h1 style="margin:0 0 22px;font-family:${FONT};font-size:22px;line-height:1.35;color:#0A0A0A;font-weight:700;letter-spacing:-0.01em;">
                ${title}
              </h1>
              <div style="font-family:${FONT};font-size:15px;line-height:1.7;color:#3F3F46;font-weight:400;">
                ${input.bodyHtml}
              </div>
            </td>
          </tr>
          <!-- Sign-off -->
          <tr>
            <td style="padding:8px 28px 28px;background-color:#FFFFFF;font-family:${FONT};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-top:1px solid rgba(197,165,90,0.28);">
                <tr>
                  <td style="padding-top:22px;">
                    <p style="margin:0 0 4px;font-family:${FONT};font-size:14px;color:#0A0A0A;font-weight:700;">Team &#39;Inspire Oman&#39;</p>
                    <p style="margin:0 0 18px;font-family:${FONT};font-size:12px;color:#71717A;line-height:1.5;">${initiative}</p>
                    <a href="${SITE_URL}" style="display:inline-block;padding:12px 22px;background-color:#C5A55A;color:#0A0A0A;text-decoration:none;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:0.02em;border-radius:8px;">
                      Visit inspireoman.findown.in
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#050505;padding:18px 28px;text-align:center;font-family:${FONT};font-size:11px;line-height:1.55;color:rgba(255,255,255,0.42);border-top:1px solid rgba(197,165,90,0.2);">
              Investors Summit &middot; 14 October 2026 &middot; Oman Convention &amp; Exhibition Centre
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
