import styled from '@emotion/styled';
import PodPreview from '../components/pod/PodPreview';
import Button from '../components/common/Button';
import PodMember from '../components/pod/PodMemberCard';
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

export default function PodDetail() {
  const { podId } = useParams();
  const myId = 1; // (임시) 내 아이디

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
  } = usePodPermissions(myId, pod);

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

  // 출석 체크 상태
  const [attendanceById, setAttendanceById] = useState({});

  // 팟 상세 정보 불러오기
  useEffect(() => {
    async function getPodDetail() {
      const podData = await fetchPodDetail(podId);
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
        date: formatDateTime(podData.date),
        locationDetail: podData.locationDetail,
        hostAnnouncement: podData.hostAnnouncement,
      });
    }
    getPodDetail();
  }, [podId]);

  // 팟 정보 편집
  const handleUpdatedPodInfo = (e) => {
    const { name, value } = e.target;
    setEditablePodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
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
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

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
    if (isApplyPopupOpen || isConfirmPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isApplyPopupOpen, isConfirmPopupOpen]);

  // [추가] 어떤 멤버를 클릭했는지 (null -> 리스트, 선택값o -> 상세페이지)
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const selectedMember =
    pod?.participants?.list.find((m) => m.memberId === selectedMemberId) ??
    null;

  // [추가] podGoal 갱신
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
            onInputChange={handleUpdatedPodInfo}
          />
          <ButtonWrapper>
            <Button
              shape="rect"
              size="slim"
              width="200px"
              onClick={() => {
                pod.userStatus.isHost
                  ? setIsClosePopupOpen(true)
                  : setIsApplyPopupOpen(true);
              }}
            >
              {pod.userStatus.isHost ? '팟 모집 종료하기' : '참여 신청하기'}
            </Button>
          </ButtonWrapper>
        </PodPreviewContainer>
        <PodDetailInfoContainer>
          {/* [추가] 선택 o -> 멤버 상세페이지*/}
          {/* [추가] 선택 x -> 멤버 리스트 페이지*/}
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
              {pod.participants.list.map((member) => (
                <ClickableMemberWrapper
                  key={member.memberId}
                  onClick={() => setSelectedMemberId(member.memberId)}
                >
                  <PodMember
                    pod={pod}
                    member={member}
                    hostMention={member.isHost ? pod.hostMention : ''}
                    onHostMentionChange={handleUpdatedPodInfo}
                    canCheckAttendance={canCheckAttendance}
                    attendanceChecked={!!attendanceById[member.memberId]}
                    onToggleAttendance={(e) => {
                      e.stopPropagation(); // [추가] 출석체크 클릭할 때, 상세 페이지로 x
                      onToggleAttendance(member.memberId);
                    }}
                    canChangeBadge={myId === member.memberId}
                    onBadgeUpdated={handleBadgeUpdated}
                  />
                </ClickableMemberWrapper>
              ))}
            </>
          )}
        </PodDetailInfoContainer>
      </PodDetailContainer>
      {isApplyPopupOpen && (
        <>
          <Overlay onClick={() => setIsApplyPopupOpen(false)} />
          <ApplyPopup
            setIsApplyPopupOpen={setIsApplyPopupOpen}
            timeChecked={timeChecked}
            setTimeChecked={setTimeChecked}
            placeChecked={placeChecked}
            setPlaceChecked={setPlaceChecked}
            podInfo={{ ...pod, ...editablePodInfo }}
            onConfirm={() => setIsConfirmPopupOpen(true)}
          />
        </>
      )}
      {isConfirmPopupOpen && (
        <>
          <Overlay onClick={() => setIsConfirmPopupOpen(false)} />
          <ApplyConfirmPopup
            setIsConfirmPopupOpen={setIsConfirmPopupOpen}
            isOpen={isConfirmPopupOpen}
            onClose={() => setIsConfirmPopupOpen(false)}
          />
        </>
      )}
      {isClosePopupOpen && (
        <>
          <Overlay onClick={() => setIsClosePopupOpen(false)} />
          <PodClosePopup
            setIsClosePopupOpen={setIsClosePopupOpen}
            isOpen={isClosePopupOpen}
            onClose={() => setIsClosePopupOpen(false)}
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

// [추가]
const ClickableMemberWrapper = styled.div`
  cursor: pointer;
`;
