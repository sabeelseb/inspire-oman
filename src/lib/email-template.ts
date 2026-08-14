/** Shared HTML email chrome matching Inspire Oman (black / gold). */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://inspireoman.findown.in"
).replace(/\/$/, "");

const LOGO_URL = `${SITE_URL}/images/logos/inspire-oman-hero-logo.png`;

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
  return `<strong style="font-weight:700;color:#0A0A0A;">${escapeHtml(value)}</strong>`;
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

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#0A0A0A;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${preview}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0A0A0A;margin:0;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid rgba(197,165,90,0.35);">
          <tr>
            <td style="background-color:#0A0A0A;background-image:linear-gradient(180deg,#0A0A0A 0%,#1A1A1A 100%);padding:28px 28px 22px;text-align:center;border-bottom:2px solid #C5A55A;">
              <img src="${LOGO_URL}" alt="Inspire Oman" width="168" style="display:block;margin:0 auto 14px;max-width:168px;height:auto;border:0;" />
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;letter-spacing:0.04em;color:#FFFFFF;">
                Inspire <span style="color:#C5A55A;">Oman</span>
              </p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(197,165,90,0.85);">
                Telling Oman&#39;s Growth Story Globally
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#C5A55A;font-weight:700;">
                ${eyebrow}
              </p>
              <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.3;color:#0A0A0A;font-weight:700;">
                ${title}
              </h1>
              <div style="font-size:15px;line-height:1.7;color:#3F3F46;">
                ${input.bodyHtml}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;font-family:Arial,Helvetica,sans-serif;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;border-top:1px solid rgba(197,165,90,0.28);">
                <tr>
                  <td style="padding-top:20px;">
                    <p style="margin:0 0 4px;font-size:14px;color:#0A0A0A;font-weight:700;">Inspire Oman Team</p>
                    <p style="margin:0 0 16px;font-size:13px;color:#71717A;">Telling Oman&#39;s Growth Story Globally</p>
                    <a href="${SITE_URL}" style="display:inline-block;padding:11px 20px;background-color:#C5A55A;color:#0A0A0A;text-decoration:none;font-size:13px;font-weight:700;border-radius:8px;">
                      Visit inspireoman.findown.in
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#050505;padding:16px 28px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:rgba(255,255,255,0.45);">
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
