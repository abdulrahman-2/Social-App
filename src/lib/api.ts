import axios from "axios";

export const api = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
