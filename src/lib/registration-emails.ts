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

function fields(doc: RegistrationMailFields) {
  return {
    name: participantName(doc.name),
    organisation: organisationLabel(doc.organization),
    category: categoryLabel(doc.category),
  };
}

export function buildUnderReviewEmail(doc: RegistrationMailFields) {
  const { name, organisation, category } = fields(doc);

  const subject = "Your Inspire Oman Registration is Under Review";
  const textBody = `Dear ${name},

Thank you for registering for the ${EVENT_NAME}, taking place on ${EVENT_DATE}.

We confirm that your registration on behalf of ${organisation}, under ${category}, has been received successfully.

Your registration is currently under review by the Inspire Oman team. We will write to you once the review is complete with an update on your participation.

We appreciate your interest in being part of Inspire Oman.

Team 'Inspire Oman'
Telling Oman's Growth Story Globally`;

  const htmlBody = renderInspireEmailShell({
    previewText: `Your registration for ${EVENT_NAME} has been received and is under review.`,
    eyebrow: "Registration received",
    title: "Your registration is under review",
    bodyHtml: [
      p(`Dear ${bold(name)},`),
      p(
        `Thank you for registering for the ${bold(EVENT_NAME)}, taking place on ${bold(EVENT_DATE)}.`,
      ),
      p(
        `We confirm that your registration on behalf of ${bold(organisation)}, under ${bold(category)}, has been received successfully.`,
      ),
      p(
        "Your registration is currently under review by the Inspire Oman team. We will write to you once the review is complete with an update on your participation.",
      ),
      p("We appreciate your interest in being part of Inspire Oman."),
    ].join(""),
  });

  return { subject, textBody, htmlBody };
}

export function buildApprovedEmail(doc: RegistrationMailFields) {
  const { name, organisation, category } = fields(doc);

  const subject = "Your Inspire Oman Registration Has Been Approved";
  const textBody = `Dear ${name},

We are pleased to inform you that your registration for the ${EVENT_NAME}, taking place on ${EVENT_DATE}, has been approved.

Your registration on behalf of ${organisation}, under ${category}, has been successfully verified.

Further details regarding the Summit, including the venue, programme and participation arrangements, will be shared with you shortly.

We look forward to welcoming you to ${EVENT_NAME}.

Team 'Inspire Oman'
Telling Oman's Growth Story Globally`;

  const htmlBody = renderInspireEmailShell({
    previewText: `Your registration for ${EVENT_NAME} has been approved.`,
    eyebrow: "Registration approved",
    title: "Your registration has been approved",
    bodyHtml: [
      p(`Dear ${bold(name)},`),
      p(
        `We are pleased to inform you that your registration for the ${bold(EVENT_NAME)}, taking place on ${bold(EVENT_DATE)}, has been <strong style="font-weight:700;color:#0A0A0A;">approved</strong>.`,
      ),
      p(
        `Your registration on behalf of ${bold(organisation)}, under ${bold(category)}, has been successfully verified.`,
      ),
      p(
        "Further details regarding the Summit, including the venue, programme and participation arrangements, will be shared with you shortly.",
      ),
      p(
        `We look forward to welcoming you to ${bold(EVENT_NAME)}.`,
      ),
    ].join(""),
  });

  return { subject, textBody, htmlBody };
}

export function buildRejectedEmail(doc: RegistrationMailFields) {
  const { name, organisation, category } = fields(doc);

  const subject = "Update on Your Inspire Oman Registration";
  const textBody = `Dear ${name},

Thank you for registering for the ${EVENT_NAME}, taking place on ${EVENT_DATE}.

Following a review of your registration submitted on behalf of ${organisation}, under ${category}, we regret to inform you that we are unable to confirm your participation in this edition of the Summit.

We appreciate your interest in Inspire Oman and thank you for taking the time to register.

Team Inspire Oman
Telling Oman's Growth Story Globally`;

  const htmlBody = renderInspireEmailShell({
    previewText: `An update on your registration for ${EVENT_NAME}.`,
    eyebrow: "Registration update",
    title: "Update on your registration",
    bodyHtml: [
      p(`Dear ${bold(name)},`),
      p(
        `Thank you for registering for the ${bold(EVENT_NAME)}, taking place on ${bold(EVENT_DATE)}.`,
      ),
      p(
        `Following a review of your registration submitted on behalf of ${bold(organisation)}, under ${bold(category)}, we regret to inform you that we are unable to confirm your participation in this edition of the Summit.`,
      ),
      p(
        "We appreciate your interest in Inspire Oman and thank you for taking the time to register.",
      ),
    ].join(""),
  });

  return { subject, textBody, htmlBody };
}

async function sendRegistrationMail(
  doc: RegistrationMailFields,
  built: { subject: string; textBody: string; htmlBody: string },
  tag: string,
) {
  if (!doc.email) return { ok: false as const, error: "Missing email" };
  return sendPostmarkEmail({
    to: doc.email,
    replyTo: doc.email,
    subject: built.subject,
    textBody: built.textBody,
    htmlBody: built.htmlBody,
    tag,
  });
}

export async function sendRegistrationUnderReviewEmail(
  doc: RegistrationMailFields,
) {
  return sendRegistrationMail(
    doc,
    buildUnderReviewEmail(doc),
    "summit-registration-under-review",
  );
}

export async function sendRegistrationApprovedEmail(
  doc: RegistrationMailFields,
) {
  return sendRegistrationMail(
    doc,
    buildApprovedEmail(doc),
    "summit-registration-approved",
  );
}

export async function sendRegistrationRejectedEmail(
  doc: RegistrationMailFields,
) {
  return sendRegistrationMail(
    doc,
    buildRejectedEmail(doc),
    "summit-registration-rejected",
  );
}
