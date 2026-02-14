// ===================================================================================
// 로그인 계정을 기준으로 해당 계정이 host인지 participant인지 판단하여 권한 반환
// ===================================================================================
export default function usePodPermissions(myId, pod) {
  const participants = Array.isArray(pod?.participants?.list)
    ? pod.participants.list
    : [];

  // 팟장 여부 판단: 팟의 userStatus가 isHost이고, 참가자 목록에서 내 아이디가 팟장으로 등록되어 있는지
  const isHost =
    pod?.userStatus?.isHost === true &&
    participants.some(
      (participant) =>
        participant.memberId === myId && participant.isHost === true,
    );

  // 팟원 여부 판단: 참가자 목록에서 내 아이디가 있는지
  const isParticipant = participants.some(
    (participant) => participant.memberId === myId,
  );

  return {
    isHost,
    isParticipant,

    // Permissions
    canEditPodInfo: isHost,
    canEditMention: isHost,
    canCheckAttendance: isHost,
    canClosePod: isHost,
    canApplyPod: !isHost && !isParticipant,
    canChangeBadge: isParticipant,
  };
}
