import type { CollectionConfig } from "payload";
import {
  sendRegistrationApprovedEmail,
  sendRegistrationRejectedEmail,
  sendRegistrationUnderReviewEmail,
} from "@/lib/registration-emails";

const statusField: CollectionConfig["fields"][number] = {
  name: "status",
  type: "select",
  defaultValue: "new",
  options: [
    { label: "New", value: "new" },
    { label: "In progress", value: "in-progress" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
    { label: "Closed", value: "closed" },
  ],
  admin: {
    position: "sidebar",
    description:
      "New → registration email on submit. In progress → no email. Approved / Rejected → status email. Closed → no email.",
  },
};

export const SummitRegistrations: CollectionConfig = {
  slug: "summit-registrations",
  labels: {
    singular: "Summit Registration",
    plural: "Summit Registrations",
  },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: [
      "name",
      "email",
      "category",
      "organization",
      "role",
      "status",
      "createdAt",
    ],
    description: "Summit registration submissions from the website.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        try {
          if (operation === "create") {
            await sendRegistrationUnderReviewEmail(doc);
            return;
          }

          const prevStatus = previousDoc?.status;
          const nextStatus = doc.status;

          if (nextStatus === "approved" && prevStatus !== "approved") {
            await sendRegistrationApprovedEmail(doc);
            return;
          }

          if (nextStatus === "rejected" && prevStatus !== "rejected") {
            await sendRegistrationRejectedEmail(doc);
          }
        } catch (err) {
          console.error("[summit-registrations] email hook failed:", err);
        }
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "organization", type: "text", label: "Organisation" },
    {
      name: "category",
      type: "select",
      label: "Registration category",
      options: [
        { label: "VVIP — Investors Inside Oman", value: "vvip" },
        { label: "VIP — Investors Outside Oman", value: "vip" },
        { label: "Media — Media Partners", value: "media" },
      ],
      admin: {
        description: "Selected on the public registration flow before the form.",
      },
    },
    { name: "role", type: "text", label: "Role / title" },
    { name: "message", type: "textarea" },
    statusField,
  ],
};
