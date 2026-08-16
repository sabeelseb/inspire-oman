import type { CollectionConfig } from "payload";
import { usersAccess } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "Settings",
  },
  auth: true,
  access: usersAccess,
  fields: [],
};
