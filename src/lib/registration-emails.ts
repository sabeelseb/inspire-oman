import { sendPostmarkEmail } from "@/lib/postmark";

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

export function buildUnderReviewEmail(doc: RegistrationMailFields) {
  const name = participantName(doc.name);
  const organisation = organisationLabel(doc.organization);
  const category = categoryLabel(doc.category);

  const subject = "Your Inspire Oman Registration is Under Review";
  const textBody = `Dear ${name},

Thank you for registering for the Inspire Oman Investors Summit, taking place on 14 October 2026.

We have received your registration for ${organisation} under ${category} successfully. Your details are currently under review and verification by the Inspire Oman team.

We will notify you once the verification process is complete.

Thank you for your interest in Inspire Oman.

Inspire Oman Team
Telling Oman's Growth Story Globally`;

  return { subject, textBody };
}

export function buildApprovedEmail(doc: RegistrationMailFields) {
  const name = participantName(doc.name);
  const organisation = organisationLabel(doc.organization);
  const category = categoryLabel(doc.category);

  const subject = "Update on Your Inspire Oman Registration";
  const textBody = `Dear ${name},

Thank you for your interest in the Inspire Oman Investors Summit, taking place on 14 October 2026.

Following the review of your registration for ${organisation} under ${category}, we are pleased to inform you that your registration has been approved.

Further details regarding the Summit, participation and venue will be shared with you shortly.

We look forward to welcoming you to Inspire Oman Investors Summit.

Inspire Oman Team
Telling Oman's Growth Story Globally`;

  return { subject, textBody };
}

export async function sendRegistrationUnderReviewEmail(
  doc: RegistrationMailFields,
) {
  if (!doc.email) return { ok: false as const, error: "Missing email" };
  const { subject, textBody } = buildUnderReviewEmail(doc);
  return sendPostmarkEmail({
    to: doc.email,
    subject,
    textBody,
    tag: "summit-registration-under-review",
  });
}

export async function sendRegistrationApprovedEmail(
  doc: RegistrationMailFields,
) {
  if (!doc.email) return { ok: false as const, error: "Missing email" };
  const { subject, textBody } = buildApprovedEmail(doc);
  return sendPostmarkEmail({
    to: doc.email,
    subject,
    textBody,
    tag: "summit-registration-approved",
  });
}
