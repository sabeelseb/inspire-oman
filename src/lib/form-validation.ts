/** Shared client-side form validation for Contact / Summit forms. */

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

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Name is required.";
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

export type FieldErrors = Record<string, string>;

export function validateContactFields(form: {
  name: string;
  email: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const nameErr = validateName(form.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(form.email);
  if (emailErr) errors.email = emailErr;
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
