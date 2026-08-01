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

export const SummitRegistrations: CollectionConfig = {
  slug: "summit-registrations",
  labels: {
    singular: "Summit Registration",
    plural: "Summit Registrations",
  },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: ["name", "email", "organization", "role", "status", "createdAt"],
    description: "Summit registration submissions from the website.",
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
    { name: "organization", type: "text", label: "Organisation" },
    { name: "role", type: "text", label: "Role / title" },
    { name: "message", type: "textarea" },
    statusField,
  ],
};
