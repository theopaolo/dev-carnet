export const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const pageUrl = (page: string, hash = "") =>
  `${base}/${page}/${hash ? `#${encodeURIComponent(hash)}` : ""}`;
