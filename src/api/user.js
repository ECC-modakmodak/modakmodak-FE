import { api } from '../lib/api';

const MOOD_LIST = ['CHATTY', 'QUIET'];
const TYPE_LIST = ['대면', '비대면'];

export const getProfileByUsername = async (username) => {
  const res = await api.get(`/api/users/profile/${username}`);
  return res.data;
};
// 내 프로필 조회
export const getMyProfile = async () => {
  const username = localStorage.getItem('username');
  const res = await getProfileByUsername(username);

  const data = res.data;

  if (!data) return null;


  return {
    id: data.id,
    targetMessage: data.targetMessage,

  };
};

//[추가] 특정 멤버 프로필 조회
export const getMemberProfile = async (username) => {
  if (!username) return null;

  try {
    const res = await api.get(`/api/users/profile/${username}`);
    const data = res.data
    const tags = res.hashtags || [];

    return {
      id: data.id,
      nickname: data.nickname,
      targetMessage: data.targetMessage,
      // 배열 순서 상관없이 키워드로 찾아내기
      mood: tags.find((tag) => MOOD_LIST.includes(tag)) ?? null,
      type: tags.find((tag) => TYPE_LIST.includes(tag)) ?? null,
      mainArea: data.activityArea,
      profileImage: data.profileImage,
    }
  } catch (e) {
    console.error("멤버 프로필 조회 실패:", e);
    return null;
  }
 
};