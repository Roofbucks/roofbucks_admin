/**
 * ROUTES
 *
 * ===============================================
 *
 * This object depicts the component url structure.
 * It contains a key-value pair of components and their respective URLs
 *
 */

export const Routes = {
  // Authentication
  home: "/",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // Dashboard
  overview: "/overview",
  users: "/users",
  user: (id) => `/user/${id}`,
  properties: "/properties",
  property: (id) => `/property/${id}`,
  finance: "/finance",
  team: "/team",
  settings: "/settings",
};
