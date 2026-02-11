import axios from 'axios';

// 기본 설정
export const api = axios.create({
  baseURL: 'https://modakmodak-be.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
