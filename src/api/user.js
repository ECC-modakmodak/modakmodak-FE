import { api } from '../lib/api';

// [추가] 프로필 조회
export const getProfileByUsername = async (username) => {
  const res = await api.get(`/api/users/profile/${username}`);
  return res.data;
};

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

// export const getMyGoal = async () => {
//   const username = localStorage.getItem('username');
//   const res = await getProfileByUsername(username);

//   return res.data?.targetMessage ?? null;
// };

// export const getMyId = async () => {
//   const username = localStorage.getItem('username');
//   const res = await getProfileByUsername(username);

//   return res.data?.id ?? null;
// }