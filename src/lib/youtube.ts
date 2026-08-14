/** Build a YouTube hqdefault thumbnail URL from a watch / youtu.be / shorts link. */
export function youtubeThumbnailUrl(raw?: string | null): string {
  const href = (raw || "").trim();
  if (!href) return "";

  try {
    const withProtocol = /^(https?:\/\/)/i.test(href) ? href : `https://${href}`;
    const url = new URL(withProtocol);
    const host = url.hostname.replace(/^www\./, "");
    let id = "";

    if (host === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/shorts/")) {
        id = url.pathname.split("/").filter(Boolean)[1] || "";
      } else if (url.pathname.startsWith("/embed/")) {
        id = url.pathname.split("/").filter(Boolean)[1] || "";
      } else {
        id = url.searchParams.get("v") || "";
      }
    }

    if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  } catch {
    return "";
  }

  return "";
}
