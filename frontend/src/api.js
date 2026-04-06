import axios from "axios";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9084";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Request failed. Please check if the backend is running.";

    return Promise.reject(
      new Error(status ? `HTTP ${status}: ${message}` : message),
    );
  },
);

export default api;
