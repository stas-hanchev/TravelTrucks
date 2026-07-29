import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_CAMPERS_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});
