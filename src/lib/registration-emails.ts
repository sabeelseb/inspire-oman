import { sendPostmarkEmail } from "@/lib/postmark";
import { bold, renderInspireEmailShell } from "@/lib/email-template";

export type RegistrationMailFields = {
  name?: string | null;
  email?: string | null;
  organization?: string | null;
  category?: string | null;
};

const CATEGORY_LABELS: Record<string, string> = {
  vvip: "VVIP — Investors Inside Oman",
  vip: "VIP — Investors Outside Oman",
  media: "Media — Media Partners",
};

const EVENT_NAME = "Inspire Oman Investors Summit";
const EVENT_DATE = "14 October 2026";

function categoryLabel(category?: string | null): string {
  if (!category) return "your selected category";
  return CATEGORY_LABELS[category] ?? category;
}

function organisationLabel(organization?: string | null): string {
  const value = organization?.trim();
  return value || "your organisation";
}

function participantName(name?: string | null): string {
  const value = name?.trim();
  return value || "Participant";
}

function p(html: string): string {
  return `<p style="margin:0 0 16px;">${html}</p>`;
}

export function buildUnderReviewEmail(doc: RegistrationMailFields) {
  const name = participantName(doc.name);
  const organisation = organisationLabel(doc.organization);
  const category = categoryLabel(doc.category);

  const subject = "Your Inspire Oman Registration is Under Review";
  const textBody = `Dear ${name},

Thank you for registering for the ${EVENT_NAME}, taking place on ${EVENT_DATE}.

We have received your registration for ${organisation} under ${category} successfully. Your details are currently under review and verification by the Inspire Oman team.

We will notify you once the verification process is complete.

Thank you for your interest in Inspire Oman.

Inspire Oman Team
Telling Oman's Growth Story Globally`;

  const htmlBody = renderInspireEmailShell({
    previewText: `Your registration for ${EVENT_NAME} is under review.`,
    eyebrow: "Registration update",
    title: "Your registration is under review",
    bodyHtml: [
      p(`Dear ${bold(name)},`),
      p(
        `Thank you for registering for the ${bold(EVENT_NAME)}, taking place on ${bold(EVENT_DATE)}.`,
      ),
      p(
        `We have received your registration for ${bold(organisation)} under ${bold(category)} successfully. Your details are currently under review and verification by the Inspire Oman team.`,
      ),
      p(
        "We will notify you once the verification process is complete.",
      ),
      p("Thank you for your interest in Inspire Oman."),
    ].join(""),
  });

  return { subject, textBody, htmlBody };
}

export function buildApprovedEmail(doc: RegistrationMailFields) {
  const name = participantName(doc.name);
  const organisation = organisationLabel(doc.organization);
  const category = categoryLabel(doc.category);

  const subject = "Update on Your Inspire Oman Registration";
  const textBody = `Dear ${name},

Thank you for your interest in the ${EVENT_NAME}, taking place on ${EVENT_DATE}.

Following the review of your registration for ${organisation} under ${category}, we are pleased to inform you that your registration has been approved.

Further details regarding the Summit, participation and venue will be shared with you shortly.

We look forward to welcoming you to ${EVENT_NAME}.

Inspire Oman Team
Telling Oman's Growth Story Globally`;

  const htmlBody = renderInspireEmailShell({
    previewText: `Your registration for ${EVENT_NAME} has been approved.`,
    eyebrow: "Registration approved",
    title: "Your registration has been approved",
    bodyHtml: [
      p(`Dear ${bold(name)},`),
      p(
        `Thank you for your interest in the ${bold(EVENT_NAME)}, taking place on ${bold(EVENT_DATE)}.`,
      ),
      p(
        `Following the review of your registration for ${bold(organisation)} under ${bold(category)}, we are pleased to inform you that your registration has been <strong style="font-weight:700;color:#0A0A0A;">approved</strong>.`,
      ),
      p(
        "Further details regarding the Summit, participation and venue will be shared with you shortly.",
      ),
      p(
        `We look forward to welcoming you to ${bold(EVENT_NAME)}.`,
      ),
    ].join(""),
  });

  return { subject, textBody, htmlBody };
}

export async function sendRegistrationUnderReviewEmail(
  doc: RegistrationMailFields,
) {
  if (!doc.email) return { ok: false as const, error: "Missing email" };
  const { subject, textBody, htmlBody } = buildUnderReviewEmail(doc);
  return sendPostmarkEmail({
    to: doc.email,
    replyTo: doc.email,
    subject,
    textBody,
    htmlBody,
    tag: "summit-registration-under-review",
  });
}

export async function sendRegistrationApprovedEmail(
  doc: RegistrationMailFields,
) {
  if (!doc.email) return { ok: false as const, error: "Missing email" };
  const { subject, textBody, htmlBody } = buildApprovedEmail(doc);
  return sendPostmarkEmail({
    to: doc.email,
    replyTo: doc.email,
    subject,
    textBody,
    htmlBody,
    tag: "summit-registration-approved",
  });
}
