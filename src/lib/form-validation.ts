/** Shared client-side form validation for Contact / Summit forms. */

/** Minimum length for name and other free-text fields (rejects 1–2 characters). */
export const MIN_TEXT_LENGTH = 3;

/** Letters only (A–Z, a–z), with spaces between words. */
export const NAME_PATTERN = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

/**
 * Email: local@domain.tld
 * - Local: letters, numbers, . _ % + -
 * - Domain: letters, numbers, . -
 * - TLD: letters only, length ≥ 2 (no digits in final extension)
 */
export const EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Phone: digits only, optional single leading +.
 * Max 15 characters total (e.g. +971501234567 or 96899168230).
 * - With +: + plus up to 14 digits
 * - Without +: up to 15 digits
 */
export const PHONE_PATTERN = /^(?:\+[0-9]{1,14}|[0-9]{1,15})$/;
export const PHONE_MAX_LENGTH = 15;

/** Strip letters/symbols; allow one leading + and digits only, max 15 chars. */
export function sanitizePhoneInput(raw: string): string {
  let out = "";
  for (const ch of raw) {
    if (ch >= "0" && ch <= "9") {
      out += ch;
    } else if (ch === "+" && out.length === 0) {
      out += "+";
    }
    if (out.length >= PHONE_MAX_LENGTH) break;
  }
  return out;
}

function tooShort(trimmed: string): boolean {
  return trimmed.length > 0 && trimmed.length < MIN_TEXT_LENGTH;
}

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < MIN_TEXT_LENGTH) {
    return `Name must be at least ${MIN_TEXT_LENGTH} characters.`;
  }
  if (!NAME_PATTERN.test(trimmed)) {
    return "Name can contain letters only (A–Z).";
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Please enter a valid email (e.g. name@example.com).";
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Phone number is required.";
  if (!PHONE_PATTERN.test(trimmed)) {
    return "Phone must be digits only, optional leading +, max 15 characters.";
  }
  return null;
}

export function validateTextField(
  value: string,
  label: string,
  required = true,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return required ? `${label} is required.` : null;
  }
  if (tooShort(trimmed)) {
    return `${label} must be at least ${MIN_TEXT_LENGTH} characters.`;
  }
  return null;
}

export type FieldErrors = Record<string, string>;

export function validateContactFields(form: {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  organization?: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(form.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;
  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (form.subject !== undefined) {
    const err = validateTextField(form.subject, "Subject");
    if (err) errors.subject = err;
  }
  if (form.message !== undefined) {
    const err = validateTextField(form.message, "Message");
    if (err) errors.message = err;
  }
  if (form.organization !== undefined) {
    const err = validateTextField(form.organization, "Organization");
    if (err) errors.organization = err;
  }

  return errors;
}

/** Letters-only text with custom label (Contact Person, Designation, etc.). */
export function validateLettersField(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length < MIN_TEXT_LENGTH) {
    return `${label} must be at least ${MIN_TEXT_LENGTH} characters.`;
  }
  if (!NAME_PATTERN.test(trimmed)) {
    return `${label} can contain letters only (A–Z).`;
  }
  return null;
}

export function validatePartnerFields(form: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  designation: string;
  address: string;
  agreeTerms: boolean;
}): FieldErrors {
  const errors: FieldErrors = {};

  const companyErr = validateTextField(form.companyName, "Company / Brand Name");
  if (companyErr) errors.companyName = companyErr;

  const personErr = validateLettersField(form.contactPerson, "Contact Person");
  if (personErr) errors.contactPerson = personErr;

  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(form.phone);
  if (phoneErr) errors.phone = phoneErr;

  const designationErr = validateLettersField(form.designation, "Designation");
  if (designationErr) errors.designation = designationErr;

  const addressErr = validateTextField(form.address, "Address");
  if (addressErr) errors.address = addressErr;

  if (!form.agreeTerms) {
    errors.agreeTerms = "Please agree to the terms and conditions.";
  }

  return errors;
}

export const CONTACT_THANK_YOU = {
  title: "Thank You for Connecting with Us",
  paragraphs: [
    "We sincerely appreciate your interest in this prestigious initiative aligned with Inspire Oman 2026",
    "Your enquiry has been received successfully. A member of our team will contact you via phone call, WhatsApp, or email to assist you and provide the information you need.",
    "Thank you for reaching out. We look forward to connecting with you.",
  ],
} as const;

export const SUMMIT_THANK_YOU = {
  title: "Thank You for Registering!",
  paragraphs: [
    "Your registration has been received successfully.",
    "Our team will review and process your registration details. Once the verification is complete, we will contact you via phone call, WhatsApp, or email with the next steps.",
    "Thank you for your interest. We look forward to connecting with you soon.",
  ],
} as const;

export const PARTNER_THANK_YOU = {
  title: "Thank You for Applying to Partner",
  paragraphs: [
    "We sincerely appreciate your interest in partnering with Inspire Oman 2026.",
    "Your sponsorship application has been received successfully. A member of our team will contact you via phone call, WhatsApp, or email to finalize the partnership and share the next steps.",
    "Thank you for your interest. We look forward to collaborating with you.",
  ],
} as const;
