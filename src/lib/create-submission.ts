import { getPayloadClient } from "@/lib/payload";

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

  if (!name || !email || !email.includes("@")) {
    return {
      name,
      email,
      error: "Name and a valid email are required.",
    };
  }
  return { name, email };
}

export async function createInCollection(
  collection:
    | "get-in-touch"
    | "summit-registrations"
    | "partner-applications",
  data: Record<string, unknown>
) {
  const payload = await getPayloadClient();
  return payload.create({
    collection,
    data,
    overrideAccess: true,
  });
}
