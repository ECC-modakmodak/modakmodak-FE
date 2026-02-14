// ===================================================================================
// 로그인 계정을 기준으로 해당 계정이 host인지 participant인지 판단하여 권한 반환
// ===================================================================================
export default function usePodPermissions(myId, pod) {
  const participants = Array.isArray(pod?.participants?.list)
    ? pod.participants.list
    : [];

  const isHost =
    pod?.userStatus?.isHost === true &&
    participants.some(
      (participant) =>
        participant.memberId === myId && participant.isHost === true,
    );

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
  };
}
