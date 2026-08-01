import type { CollectionConfig } from "payload";

/**
 * Legacy unified inbox — kept only so existing rows can be migrated.
 * Hidden from admin; new posts go to get-in-touch / summit-registrations / partner-applications.
 */
export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Legacy Submission",
    plural: "Legacy Submissions",
  },
  admin: {
    hidden: true,
    useAsTitle: "name",
    group: "Inbox",
  },
  access: {
    create: () => false,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Contact / Enquiry", value: "contact" },
        { label: "Partner Application", value: "partner" },
        { label: "Summit Registration", value: "summit" },
        { label: "Message", value: "message" },
      ],
    },
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea" },
    { name: "organization", type: "text", label: "Organisation" },
    { name: "companyName", type: "text", label: "Company name" },
    { name: "contactPerson", type: "text", label: "Contact person" },
    { name: "designation", type: "text" },
    { name: "address", type: "textarea" },
    { name: "tier", type: "text", label: "Partnership tier" },
    { name: "paymentMethod", type: "text", label: "Payment method" },
    { name: "role", type: "text", label: "Role / title" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in-progress" },
        { label: "Closed", value: "closed" },
      ],
    },
  ],
};
