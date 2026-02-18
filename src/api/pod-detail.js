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

// Date 포맷팅 함수 - 서버 전송용
function toServerDateTime(input) {
  // input 예: "2/16 22:00"
  const m = String(input)
    .trim()
    .match(/^(\d{1,2})\/(\d{1,2})\s+(\d{1,2}):(\d{2})$/);
  if (!m) throw new Error('날짜 형식이 올바르지 않아요. 예) 2/16 22:00');

  const month = Number(m[1]);
  const day = Number(m[2]);
  const hour = Number(m[3]);
  const minute = Number(m[4]);

  const year = new Date().getFullYear();

  const pad2 = (n) => String(n).padStart(2, '0');

  return `${year}-${pad2(month)}-${pad2(day)}T${pad2(hour)}:${pad2(minute)}:00.000000`;
}

// 팟 상세 정보 조회
export async function fetchPodDetail(podId) {
  try {
    const res = await api.get(`/api/meetings/${podId}`, {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    });
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
    const res = await api.patch(
      `/api/meetings/${podId}/attendance`,
      {
        participantId: participantId,
        attended: attended,
      },
      {
        headers: { 'X-User-Id': localStorage.getItem('myId') },
      },
    );
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
      const res = await api.patch(
        `/api/meetings/${podId}/host-announcement`,
        {
          hostAnnouncement: updatedValue,
        },
        {
          headers: { 'X-User-Id': localStorage.getItem('myId') },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error updating host announcement:', error);
      throw error;
    }
  } else if (key === 'date') {
    // 팟 날짜 수정
    try {
      const res = await api.patch(
        `/api/meetings/${podId}/date`,
        {
          date: toServerDateTime(updatedValue),
        },
        {
          headers: { 'X-User-Id': localStorage.getItem('myId') },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error updating pod date:', error);
      throw error;
    }
  } else if (key === 'locationDetail') {
    // 팟 장소 수정
    try {
      const res = await api.patch(
        `/api/meetings/${podId}/location-detail`,
        {
          locationDetail: updatedValue,
        },
        {
          headers: { 'X-User-Id': localStorage.getItem('myId') },
        },
      );
      return res.data;
    } catch (error) {
      console.error('Error updating pod location detail:', error);
      throw error;
    }
  }
}

// 팟 모집 종료
export async function closePod(podId) {
  try {
    const res = await api.patch(`/api/meetings/${podId}/complete`, {
      headers: { 'X-User-Id': localStorage.getItem('myId') },
    });
    return res.data;
  } catch (error) {
    console.error('Error closing pod:', error);
    throw error;
  }
}

// 팟 참여 신청
export async function applyToPod(podId, myId) {
  try {
    const res = await api.post(
      `/api/meetings/${podId}/apply`,
      {
        agreedToRules: true,
        agreedToNoShow: true,
        agreedToPrivacy: true,
      },
      {
        headers: { 'X-User-Id': myId },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error applying to pod:', error);
    throw error;
  }
}

// 팟 참여 신청 수락/거절
export async function respondToApplication(myId, podId, applicationId, status) {
  try {
    const res = await api.patch(
      `/api/meetings/${podId}/approve/${applicationId}`,
      {
        status: status,
      },
      {
        headers: { 'X-User-Id': myId },
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error responding to application:', error);
    throw error;
  }
}
