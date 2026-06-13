import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: "https://library-management-api-3om3.onrender.com/api",
});

API.interceptors.request.use(
  (req: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

export default API;