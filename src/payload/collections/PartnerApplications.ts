import type { CollectionConfig } from "payload";

const statusField: CollectionConfig["fields"][number] = {
  name: "status",
  type: "select",
  defaultValue: "new",
  options: [
    { label: "New", value: "new" },
    { label: "In progress", value: "in-progress" },
    { label: "Closed", value: "closed" },
  ],
  admin: { position: "sidebar" },
};

export const PartnerApplications: CollectionConfig = {
  slug: "partner-applications",
  labels: {
    singular: "Partner Application",
    plural: "Partner Applications",
  },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: [
      "name",
      "email",
      "companyName",
      "tier",
      "status",
      "createdAt",
    ],
    description: "Partnership applications from the website.",
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "companyName", type: "text", label: "Company name" },
    { name: "contactPerson", type: "text", label: "Contact person" },
    { name: "designation", type: "text" },
    { name: "address", type: "textarea" },
    { name: "tier", type: "text", label: "Partnership tier" },
    { name: "paymentMethod", type: "text", label: "Payment method" },
    { name: "message", type: "textarea" },
    statusField,
  ],
};
