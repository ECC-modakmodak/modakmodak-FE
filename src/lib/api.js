import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 기본 설정
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
