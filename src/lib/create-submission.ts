import { getPayloadClient } from "@/lib/payload";
import { validateEmail, validateName } from "@/lib/form-validation";

export function asString(value: unknown, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function requireNameEmail(body: Record<string, unknown>): {
  name: string;
  email: string;
  error?: string;
} {
  const email = asString(body.email, 320);
  const name =
    asString(body.name, 200) ||
    asString(body.contactPerson, 200) ||
    asString(body.companyName, 200);

  const nameErr = validateName(name);
  if (nameErr) return { name, email, error: nameErr };
  const emailErr = validateEmail(email);
  if (emailErr) return { name, email, error: emailErr };
  return { name, email };
}

export async function createInCollection(
  collection:
    | "get-in-touch"
    | "summit-registrations"
    | "partner-applications",
  data: Record<string, unknown>,
  options?: { notifyRegistrant?: boolean },
) {
  const payload = await getPayloadClient();
  return payload.create({
    collection,
    data,
    overrideAccess: true,
    context: {
      /** Only website form routes set this — blocks raw REST open-relay mail. */
      notifyRegistrant: options?.notifyRegistrant === true,
      viaWebsiteForm: true,
    },
  });
}
