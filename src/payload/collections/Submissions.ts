import type { CollectionConfig } from "payload";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: {
    singular: "Submission",
    plural: "Submissions",
  },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: ["type", "name", "email", "createdAt"],
    description: "Contact, partner applications, and summit registrations from the website.",
  },
  access: {
    // Public site forms create rows; only logged-in admins can read/manage.
    create: () => true,
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
      admin: { position: "sidebar" },
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
      admin: { position: "sidebar" },
    },
  ],
};
