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

export const GetInTouch: CollectionConfig = {
  slug: "get-in-touch",
  labels: {
    singular: "Get in Touch",
    plural: "Get in Touch",
  },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: ["name", "email", "subject", "status", "createdAt"],
    description: "Contact and enquiry messages from the website.",
  },
  access: {
    // Block anonymous REST create; website uses /api/forms/get-in-touch.
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea" },
    statusField,
  ],
};
