import axios from "axios";

let url = process.env.API_PROD_URL;

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
