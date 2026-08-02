/**
 * Keystatic stays in the repo for local/git workflows.
 * On production with CMS_SOURCE=payload it is off unless ENABLE_KEYSTATIC=true.
 */
export function isKeystaticEnabled(): boolean {
  if (process.env.ENABLE_KEYSTATIC === "true") return true;
  if (process.env.ENABLE_KEYSTATIC === "false") return false;
  if (process.env.NODE_ENV === "production" && process.env.CMS_SOURCE === "payload") {
    return false;
  }
  return true;
}
