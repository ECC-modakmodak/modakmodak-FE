// ===================================================================================
// 팟 상세페이지 API
// ===================================================================================
import { api } from '../lib/api';

// 팟 상세 정보 조회
export async function fetchPodDetail(podId) {
  try {
    const res = await api.get(`/api/meetings/${podId}`);
    const rawData = res.data.data;
    const processedData = {
      ...rawData,
      // 현재 이미지 출력이 없어 기본 이미지로 대체 (추후 API에서 이미지 URL 제공 시 수정 필요)
      representativeImage: '/images/pod-1.png',
      participants: {
        ...rawData.participants,
        list: (rawData.participants.list || []).map((participant) => ({
          ...participant,
          // 현재 이미지 출력이 없어 기본 이미지로 대체 (추후 API에서 이미지 URL 제공 시 수정 필요)
          profileImage: '/images/profile-default.png',
          // reactionEmoji 필드가 없는 경우 기본값으로 대체
          reactionEmoji: participant.reactionEmoji || 'hi',
          displayedGoal:
            participant.displayedGoal === '어떤 목표를 이루어볼까요?'
              ? null
              : participant.displayedGoal,
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
export async function updateStatusBadge(podId, status) {
  try {
    const res = await api.patch(`/api/meetings/${podId}/status`, {
      statusBadge: status,
    });
    return res.data.statusBadge;
  } catch (error) {
    console.error('Error updating status badge:', error);
    throw error;
  }
}
