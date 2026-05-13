import { api } from '../lib/api';

// 채팅방 정보 조회
export async function fetchChats(podId) {
  try {
    const res = await api.get(`/api/meetings/${podId}/chats`, {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
}
