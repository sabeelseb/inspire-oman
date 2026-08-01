import ContactClient from "./ContactClient";
import { getCmsPageContact } from "@/lib/cms";

export default async function ContactPage() {
  const page = await getCmsPageContact();
  return <ContactClient page={page} />;
}
