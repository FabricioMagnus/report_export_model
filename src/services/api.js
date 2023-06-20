import Axios from "axios";

export const baseURL = "https://www.liasys.net/api";

const api = Axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  if (window.localStorage.getItem("token")) {
    const token = window.localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
