import axios from "axios";

export const api = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
  headers: {
    Accept: "application/json",
  },
  timeout: 5000,
});
