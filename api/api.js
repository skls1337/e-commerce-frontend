import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_PROD_URL
});

instance.interceptors.request.use(
  async config => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

export default instance;
