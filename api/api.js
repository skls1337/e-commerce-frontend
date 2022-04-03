import axios from "axios";

const instance = axios.create({
  baseURL: "https://node-js-e-comm-backend.herokuapp.com"
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
