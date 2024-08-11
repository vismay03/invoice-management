import axios from "axios";
import { store } from '@/store';

var http = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});


http.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
