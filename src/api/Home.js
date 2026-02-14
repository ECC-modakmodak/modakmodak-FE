import { api } from '../lib/api';

// === home.jsx에서 사용 ===
export const getHomeData = async () => {
  const res = await api.get('/api/meetings');

  const todayData = {
    time: res.data.todayData.groupTime.split('T')[1], // "2026-02-20T19:00"기준 시간만
    place: res.data.todayData.spot,
    name: res.data.todayData.title,
    mood: res.data.todayData.hashtags?.[0] ?? null, // 0번째
    type: res.data.todayData.hashtags?.[1] ?? null, // 1번째
    // goal: BE 없음
  };
  const totalGroupData = [...res.data.totalGroupData]
    // "2026-02-10T14:25:49.345496" 기준
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12) // 최신순 12개 자르기
    .map((item) => ({
      id: item.meetingId,
      title: item.title,
      mood: item.hashtags?.[0] ?? null, // 0번째
      type: item.hashtags?.[1] ?? null, // 1번째
      people: `${item.currentParticipants}/${item.maxParticipants}`,
      podImg: item.representativeImage,
    }));

  return {
    today: todayData,
    group: totalGroupData,
  };
};