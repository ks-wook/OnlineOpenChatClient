import axios from "axios";
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:7002", // API의 기본 URL
  timeout: 10000, // 요청 타임아웃 (밀리초)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

/**
 * 헤더값 자동 주입
 */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('onlineOpenChatAuth');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
