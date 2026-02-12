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
