import axios from "axios";

export const api = axios.create({
  baseURL: "https://jack-the-solo.vercel.app",
  headers: { "Content-Type": "application/json" },
});
