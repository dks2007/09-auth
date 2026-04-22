import axios from "axios";

const siteUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
const baseURL = `${siteUrl}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
