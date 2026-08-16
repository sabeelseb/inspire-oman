import type { Access } from "payload";

/** Only signed-in CMS users can create, update, or delete. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user);

/** Public can read published docs; drafts stay admin-only. */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true;
  return {
    _status: {
      equals: "published",
    },
  };
};

export const contentAccess = {
  read: publishedOrAuthenticated,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
};

export const globalAccess = {
  read: publishedOrAuthenticated,
  update: authenticated,
};

export const mediaAccess = {
  read: () => true,
  create: authenticated,
  update: authenticated,
  delete: authenticated,
};

export const usersAccess = {
  admin: ({ req: { user } }: { req: { user: unknown } }) => Boolean(user),
  create: authenticated,
  read: authenticated,
  update: authenticated,
  delete: authenticated,
};
