import { api } from '../lib/api';

// 팟 상세 정보 조회
export async function fetchPodDetail(podId) {
  const { data } = await api.get(`/api/meetings/${podId}`);

  return data.data;
}

// 팟 멤버 출석 체크 상태 변경
export async function updateAttendance(podId, participantId, attended) {
  const { data } = await api.patch(`/api/meetings/${podId}/attendance`, {
    participantId: participantId,
    attended: attended,
  });

  return data.data;
}

// 팟 멤버 상태 배지 변경
export async function updateStatusBadge(podId, status) {
  const { data } = await api.patch(`/api/meetings/${podId}/status`, {
    statusBadge: status,
  });

  return data.data.statusBadge;
}
