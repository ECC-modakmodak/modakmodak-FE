// ===================================================================================
// 팟 상세페이지 API
// ===================================================================================
import { api } from '../lib/api';

// Date 포맷팅 함수
function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  const date = new Date(dateTimeStr);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day} ${hour}:${minute}`;
}

// 팟 상세 정보 조회
export async function fetchPodDetail(podId) {
  try {
    const res = await api.get(`/api/meetings/${podId}`);
    const rawData = res.data.data;
    const processedData = {
      ...rawData,
      // 현재 이미지 출력이 없어 기본 이미지로 대체 (추후 API에서 이미지 URL 제공 시 수정 필요)
      representativeImage: '/images/pod-1.png',
      // Date 포맷팅
      date: formatDateTime(rawData.date),
      participants: {
        ...rawData.participants,
        list: (rawData.participants.list || []).map((participant) => ({
          ...participant,
          // 현재 이미지 출력이 없어 기본 이미지로 대체 (추후 API에서 이미지 URL 제공 시 수정 필요)
          profileImage: '/images/profile-default.png',
          // reactionEmoji 필드가 없는 경우 기본값으로 대체
          reactionEmoji: participant.reactionEmoji || 'hi',
          displayedGoal:
            participant.displayedGoal === null ? '' : participant.displayedGoal,
        })),
      },
    };
    return processedData;
  } catch (error) {
    console.error('Error fetching pod detail:', error);
    throw error;
  }
}

// 팟 멤버 출석 체크 상태 변경
export async function updateAttendance(podId, participantId, attended) {
  try {
    const res = await api.patch(`/api/meetings/${podId}/attendance`, {
      participantId: participantId,
      attended: attended,
    });
    return res.data;
  } catch (error) {
    console.error('Error updating attendance:', error);
    throw error;
  }
}

// 팟 멤버 상태 배지 변경
export async function updateStatusBadge(podId, reactionEmoji) {
  try {
    const res = await api.patch(`/api/meetings/${podId}/status`, {
      statusBadge: reactionEmoji,
    });
    console.log('배지 변경 API 응답: ', res.data);
    return res.data.statusBadge;
  } catch (error) {
    console.error('Error updating status badge:', error);
    throw error;
  }
}
