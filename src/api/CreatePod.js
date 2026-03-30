import { api } from '../lib/api';

// step 1
export const postSetupPod1 = async ({
  mood,
  type,
  otherText,
  maxPeople,
  category,
}) => {
  const res = await api.post(
    '/api/meetings/setup',
    {
      atmosphere: mood,
      category: type,
      categoryEtc: otherText,
      maxParticipants: maxPeople,
      podCategory: category, // 팟카테고리 추가
    },
    {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    },
  );

  return res.data;
};

// step 2
export const postSetupPod2 = async ({
  meetingId,
  name,
  date,
  placeGeneral,
  placeDetail,
  detail,
  imageUrl,
}) => {
  const res = await api.post(
    `/api/meetings/${meetingId}/details`,
    {
      title: name,
      date,
      area: placeGeneral,
      locationDetail: placeDetail,
      description: detail,
      imageUrl,
    },
    {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    },
  );

  return res.data;
};
