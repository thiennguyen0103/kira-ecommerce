import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: process.env.NEXT_PUBLIC_TIMEOUT
    ? Number(process.env.NEXT_PUBLIC_TIMEOUT)
    : 30000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    switch (status) {
      case 400:
        break;
      case 401:
        // TODO: Define what to do on 401
        break;
      case 403:
        // TODO: Define what to do on 403
        // window.location.href = "/403";
        break;
      case 405:
        // TODO: Define what to do on 405
        break;
      case 408:
        break;
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
