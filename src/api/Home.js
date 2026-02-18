import { api } from '../lib/api';

const MOOD_LIST = ['CHATTY', 'QUIET'];
const TYPE_LIST = ['CAFE', 'ZOOM', 'OTHER'];

export const getHomeData = async () => {
  const res = await api.get('/api/meetings');

  const payload = res.data?.data ?? res.data;
  const rawToday = payload?.todayData;

  let todayData = null;

  if (rawToday && rawToday.meetingId) {
    const tags = rawToday.hashtags || [];
    todayData = {
      podId: rawToday.meetingId,
      time: rawToday.groupTime?.split('T')?.[1] ?? null,
      place: rawToday.spot ?? null,
      name: rawToday.title ?? null,
      // 순서 상관없이 키워드 매칭으로 찾기
      mood: tags.find((tag) => MOOD_LIST.includes(tag)) ?? null,
      type: tags.find((tag) => TYPE_LIST.includes(tag)) ?? null,
    };
  }
  const totalGroupData = [...(payload?.totalGroupData ?? [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12)
    .map((item) => {
      const tags = item.hashtags || [];

      const moodVal = tags.find((tag) => MOOD_LIST.includes(tag));
      const typeVal = tags.find((tag) => TYPE_LIST.includes(tag));

      return {
        id: item.meetingId,
        title: item.title,
        mood: moodVal,
        type: typeVal,
        people: `${item.currentParticipants}/${item.maxParticipants}`,
        podImg: item.representativeImage,
        location: item.location,
      };
    });

  return { today: todayData, group: totalGroupData };
};

export const getPodGoal = async (meetingId, myId) => {
  const res = await api.get(`/api/meetings/${meetingId}`);
  const participants = res.data?.data?.participants?.list ?? [];
  const me = participants.find((p) => Number(p.memberId) === Number(myId));
  return me?.displayedGoal ?? null;
};
