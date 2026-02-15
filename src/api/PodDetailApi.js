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
      // Date 포맷팅
      date: formatDateTime(rawData.date),
      participants: {
        ...rawData.participants,
        list: (rawData.participants.list || []).map((participant) => ({
          ...participant,
          // statusBadge 필드가 없는 경우 기본값으로 대체
          statusBadge: participant.statusBadge || 'hi',
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
export async function updateStatusBadge(myId, participantId, statusBadge) {
  try {
    const res = await api.patch(
      `/api/participants/${participantId}/reaction-emoji`,
      {
        statusBadge: statusBadge,
      },
      {
        headers: { 'X-User-Id': myId },
      },
    );
    console.log('배지 변경 API 응답: ', res.data);
    return res.data.statusBadge;
  } catch (error) {
    console.error('Error updating status badge:', error);
    throw error;
  }
}

// 팟 정보 수정
export async function updatePodInfo(podId, key, updatedValue) {
  // 팟장 멘션 수정
  if (key === 'hostAnnouncement') {
    try {
      const res = await api.patch(`/api/meetings/${podId}/host-announcement`, {
        hostAnnouncement: updatedValue,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating host announcement:', error);
      throw error;
    }
  } else if (key === 'date') {
    // 팟 날짜 수정
    try {
      const res = await api.patch(`/api/meetings/${podId}/date`, {
        date: updatedValue,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating pod date:', error);
      throw error;
    }
  } else if (key === 'locationDetail') {
    // 팟 장소 수정
    try {
      const res = await api.patch(`/api/meetings/${podId}/location-detail`, {
        locationDetail: updatedValue,
      });
      return res.data;
    } catch (error) {
      console.error('Error updating pod location detail:', error);
      throw error;
    }
  }
}
