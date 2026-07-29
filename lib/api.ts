import axios from "axios";

//https://campers-api.goit.study/docs#/
const API_URL =
  process.env.NEXT_PUBLIC_CAMPERS_API_URL ??
  "https://campers-api.goit.study";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
  },
});
