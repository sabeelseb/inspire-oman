import { getPayload as getPayloadBase } from "payload";
import config from "@payload-config";

type PayloadClient = Awaited<ReturnType<typeof getPayloadBase>>;

let cached: PayloadClient | null = null;

export async function getPayloadClient(): Promise<PayloadClient> {
  if (cached) return cached;
  cached = await getPayloadBase({ config });
  return cached;
}
