import styled from '@emotion/styled';
import PodPreview from '../components/pod/PodPreview';
import Button from '../components/common/Button';
import PodMemberCard from '../components/pod/PodMemberCard';
import MemberDetail from '../components/pod/MemberDetail';
import ApplyPopup from '../components/popup/Apply';
import { useEffect, useState } from 'react';
import ApplyConfirmPopup from '../components/popup/ApplyConfirm';
import PodClosePopup from '../components/popup/PodClose';
import { fetchPodDetail } from '../api/PodDetailApi';
import { BounceLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import usePodPermissions from '../hooks/usePodPermissions';
import { updateAttendance } from '../api/PodDetailApi';
import { updatePodInfo } from '../api/PodDetailApi';
import CloseConfirmPopup from '../components/popup/CloseConfirm';

export default function PodDetail() {
  const { podId } = useParams();
  const myId = 4; // (임시) 내 아이디

  // 팟 상세 정보
  const [pod, setPod] = useState(null);
  // 팟장이 수정 가능한 팟 정보
  const [editablePodInfo, setEditablePodInfo] = useState({
    date: '',
    locationDetail: '',
    hostAnnouncement: '',
  });

  // 권한
  const {
    canEditPodInfo,
    canEditMention,
    canCheckAttendance,
    canClosePod,
    canApplyPod,
    canChangeBadge,
  } = usePodPermissions(myId, pod);

  // 출석 체크 상태
  const [attendanceById, setAttendanceById] = useState({});

  // 팟 상세 정보 불러오기
  useEffect(() => {
    async function getPodDetail() {
      const podData = await fetchPodDetail(podId);
      console.log('Fetched pod detail:', podData.participants.list);
      setPod(podData);
      // 출석 체크 상태 초기화
      if (podData?.participants?.list) {
        const initialAttendance = Object.fromEntries(
          podData.participants.list.map((m) => [
            m.memberId,
            m.attended ?? false,
          ]),
        );
        setAttendanceById(initialAttendance);
      }
      // 팟장이 편집 가능한 정보 초기화
      setEditablePodInfo({
        date: podData.date,
        locationDetail: podData.locationDetail,
        hostAnnouncement: podData.hostAnnouncement,
      });
    }
    getPodDetail();
  }, [podId]);

  // 팟 정보 수정 (입력 중)
  const handlePodInfoChange = (e) => {
    const { name, value } = e.target;
    setEditablePodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 팟 정보 수정 (완료)
  const handleUpdatedPodInfo = async (name, value) => {
    try {
      await updatePodInfo(pod.meetingId, name, value);
      setPod((prev) => ({
        ...prev,
        [name]: value,
      }));
      setEditablePodInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.error('Failed to update pod info:', error);
      // 롤백
      setEditablePodInfo((prev) => ({ ...prev, [name]: prev[name] }));
    }
  };

  // 상태 배지 변경
  const handleBadgeUpdated = (memberId, nextBadge) => {
    setPod((prev) => {
      const updatedList = prev.participants.list.map((m) =>
        m.memberId === memberId ? { ...m, statusBadge: nextBadge } : m,
      );

      return {
        ...prev,
        participants: { ...prev.participants, list: updatedList },
      };
    });
  };

  // 팝업
  const [isClosePopupOpen, setIsClosePopupOpen] = useState(false);
  const [isCloseConfirmPopupOpen, setIsCloseConfirmPopupOpen] = useState(false);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  const [isApplyConfirmPopupOpen, setIsApplyConfirmPopupOpen] = useState(false);

  // 팝업 내 체크박스
  const [timeChecked, setTimeChecked] = useState(false);
  const [placeChecked, setPlaceChecked] = useState(false);

  // 출석 체크 토글
  const onToggleAttendance = async (memberId) => {
    const nextValue = !attendanceById[memberId];

    setAttendanceById((prev) => ({
      ...prev,
      [memberId]: nextValue,
    }));

    await updateAttendance(pod.meetingId, memberId, nextValue);
  };

  // 팝업 뜨면 스크롤 제어
  useEffect(() => {
    if (
      isApplyPopupOpen ||
      isApplyConfirmPopupOpen ||
      isClosePopupOpen ||
      isCloseConfirmPopupOpen
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [
    isApplyPopupOpen,
    isApplyConfirmPopupOpen,
    isClosePopupOpen,
    isCloseConfirmPopupOpen,
  ]);

  // 어떤 멤버를 클릭했는지 (null -> 리스트, 선택값o -> 상세페이지)
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const selectedMember =
    pod?.participants?.list.find((m) => m.memberId === selectedMemberId) ??
    null;

  // podGoal 갱신
  const updateMemberPodGoal = (memberId, nextPodGoal) => {
    setPod((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        list: prev.participants.list.map((m) =>
          m.memberId === memberId ? { ...m, podGoal: nextPodGoal } : m,
        ),
      },
    }));
  };

  // 로딩화면
  if (!pod) {
    return (
      <LoaderContainer>
        <BounceLoader color="#D9695C" loading={true} size={60} />
      </LoaderContainer>
    );
  }

  return (
    <>
      <PodDetailContainer>
        <PodPreviewContainer>
          <PodPreview
            podDetailInfo={pod}
            editablePodInfo={editablePodInfo}
            onChange={handlePodInfoChange}
            onUpdate={handleUpdatedPodInfo}
            canEditPodInfo={canEditPodInfo}
          />
          <ButtonWrapper>
            <Button
              shape="rect"
              size="slim"
              width="200px"
              onClick={() => {
                pod.userStatus.isHost && canClosePod
                  ? // 팟장이면 모집 종료 팝업
                    setIsClosePopupOpen(true)
                  : // 팟원이 아니면 참여 신청 팝업
                    setIsApplyPopupOpen(true);
              }}
            >
              {/* 로그인 유저가 팟장인 경우 */}
              {pod.userStatus.isHost && canClosePod
                ? '팟 모집 종료하기'
                : // 로그인 유저가 팟원이 아닌 경우
                  canApplyPod
                  ? '참여 신청하기'
                  : pod.userStatus.participantStatus === 'PENDING' &&
                      canApplyPod
                    ? '신청 완료'
                    : '참여 중'}
            </Button>
          </ButtonWrapper>
        </PodPreviewContainer>
        <PodDetailInfoContainer>
          {/* 팟원 카드 클릭 시 프로필로 이동 */}
          {selectedMember ? (
            <MemberDetail
              member={selectedMember}
              myId={myId}
              onClose={() => setSelectedMemberId(null)}
              onChangePodGoal={(nextPodGoal) =>
                updateMemberPodGoal(selectedMember.id, nextPodGoal)
              }
            />
          ) : (
            <>
              {/* 팟원 리스트 */}
              {pod.participants.list.map((member) => (
                <ClickableMemberWrapper
                  key={member.memberId}
                  onClick={() => setSelectedMemberId(member.memberId)}
                >
                  <PodMemberCard
                    myId={myId}
                    member={member}
                    // (팟장) 멘션
                    editablePodInfo={editablePodInfo}
                    onHostMentionChange={handlePodInfoChange}
                    onHostMentionUpdate={handleUpdatedPodInfo}
                    // 출석
                    attendanceChecked={!!attendanceById[member.memberId]}
                    onToggleAttendance={(e) => {
                      e.stopPropagation();
                      onToggleAttendance(member.memberId);
                    }}
                    // 배지
                    onBadgeUpdated={(nextBadge) =>
                      handleBadgeUpdated(member.memberId, nextBadge)
                    }
                    // 권한
                    canEditMention={canEditMention && member.isHost}
                    canCheckAttendance={canCheckAttendance}
                    canChangeBadge={canChangeBadge && myId === member.memberId}
                  />
                </ClickableMemberWrapper>
              ))}
            </>
          )}
        </PodDetailInfoContainer>
      </PodDetailContainer>
      {/* 참여 신청 팝업 */}
      {isApplyPopupOpen && (
        <>
          <Overlay onClick={() => setIsApplyPopupOpen(false)} />
          <ApplyPopup
            myId={myId}
            setIsApplyPopupOpen={setIsApplyPopupOpen}
            timeChecked={timeChecked}
            setTimeChecked={setTimeChecked}
            placeChecked={placeChecked}
            setPlaceChecked={setPlaceChecked}
            podInfo={pod}
            onConfirm={() => setIsApplyConfirmPopupOpen(true)}
          />
        </>
      )}
      {/* 신청 확인 팝업 */}
      {isApplyConfirmPopupOpen && (
        <>
          <Overlay onClick={() => setIsApplyConfirmPopupOpen(false)} />
          <ApplyConfirmPopup
            setIsApplyConfirmPopupOpen={setIsApplyConfirmPopupOpen}
            isOpen={isApplyConfirmPopupOpen}
            onClose={() => setIsApplyConfirmPopupOpen(false)}
          />
        </>
      )}
      {/* 팟 종료 팝업 */}
      {isClosePopupOpen && (
        <>
          <Overlay onClick={() => setIsClosePopupOpen(false)} />
          <PodClosePopup
            podId={podId}
            setIsClosePopupOpen={setIsClosePopupOpen}
            isOpen={isClosePopupOpen}
            onClose={() => setIsClosePopupOpen(false)}
            onCompleted={() => {
              setIsCloseConfirmPopupOpen(true);
            }}
          />
        </>
      )}
      {/* 팟 종료 확인 팝업 */}
      {isCloseConfirmPopupOpen && (
        <>
          <Overlay onClick={() => setIsCloseConfirmPopupOpen(false)} />
          <CloseConfirmPopup
            setIsCloseConfirmPopupOpen={setIsCloseConfirmPopupOpen}
            isOpen={isCloseConfirmPopupOpen}
            onClose={() => setIsCloseConfirmPopupOpen(false)}
          />
        </>
      )}
    </>
  );
}

const PodDetailContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 70px;
  margin-inline: 100px;
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

const PodPreviewContainer = styled.div`
  width: 200px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 200px;
`;

const PodDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 30px;
  gap: 20px;
  padding: 18px;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
  z-index: 999;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ClickableMemberWrapper = styled.div`
  cursor: pointer;
`;
