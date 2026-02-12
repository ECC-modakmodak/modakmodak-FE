import { api } from '../lib/api';

// [todo] pod에 합치기

// step 1
export const postSetupPod1 = async ({ mood, type, otherText, maxPeople }) => {
  const res = await api.post('/api/meetings/setup', {
    atmosphere: mood,
    category: type,
    categoryEtc: otherText,
    maxParticipants: maxPeople,
  });

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
  const res = await api.post(`/api/meetings/${meetingId}/details`, {
    title: name,
    date,
    area: placeGeneral,
    locationDetail: placeDetail,
    description: detail,
    imageUrl, // [TODO] 이미지 링크 확인
  });

  return res.data;
};
