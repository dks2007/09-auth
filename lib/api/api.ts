import axios from "axios";

const normalizeOrigin = (value?: string) => {
  const fallback =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000";

  if (!value || value.trim() === "") {
    return fallback;
  }

  const trimmed = value.trim().replace(/\/+$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

const siteUrl = normalizeOrigin(process.env.NEXT_PUBLIC_API_URL);
const baseURL = `${siteUrl}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
