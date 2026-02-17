import { api } from '../lib/api';

// 프로필 가져오기
export async function getProfile() {
  const username = localStorage.getItem('username');

  try {
    const res = await api.get(`/api/users/profile/${username}`);
    return res.data.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}
