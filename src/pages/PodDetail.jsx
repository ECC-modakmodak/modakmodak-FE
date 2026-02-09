import styled from '@emotion/styled';
import PodPreview from '../components/pod/PodPreview';
import Button from '../components/common/Button';
import PodMember from '../components/pod/PodMember';
import MemberDetail from '../components/pod/MemberDetail';
import ApplyPopup from '../components/popup/Apply';
import { useEffect, useState } from 'react';
import ApplyConfirmPopup from '../components/popup/ApplyConfirm';
import PodClosePopup from '../components/popup/PodClose';

export default function PodDetail() {
  const myId = 1; // (임시) 내 아이디
  const isHost = true; // (임시) 팟장 모드 전환

  // 팟장이 수정 가능한 팟 정보
  const [podInfo, setPodInfo] = useState({
    time: '1/23 23:00',
    place: '꽃피다 이화다방',
    hostMention: '',
  });

  const handleUpdatedPodInfo = (e) => {
    const { name, value } = e.target;
    setPodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 참여 신청 팝업
  const [isClosePopupOpen, setIsClosePopupOpen] = useState(false);
  const [isApplyPopupOpen, setIsApplyPopupOpen] = useState(false);
  const [timeChecked, setTimeChecked] = useState(false);
  const [placeChecked, setPlaceChecked] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

  // [추가] goal(메인 목표), podGoal(팟 목표), mainArea, studyMood/Type
  // 서버에서 받아올 땐 소속 팟 안에 podGoal 위치
  const [members, setMembers] = useState([
    {
      id: 1,
      profileImage: '/images/img-placeholder.png',
      name: '모다기',
      goal: '웹 개발 마스터하기!!!',
      podGoal: 'Thread 클론 코딩',
      mainArea: '이화여자대학교',
      studyMood: 'chatty',
      studyType: 'cafe',
      isHost: true,
      status: 'hi',
    },
    {
      id: 2,
      profileImage: '/images/img-placeholder.png',
      name: '감자',
      goal: '웹 개발 마스터하기!!!',
      podGoal: '소플의 리액트 7장 공부',
      mainArea: '이화여자대학교',
      studyMood: 'chatty',
      studyType: 'zoom',
      isHost: false,
      status: 'niceToMeet',
    },
    {
      id: 3,
      profileImage: '/images/img-placeholder.png',
      name: '자고싶어요',
      goal: '웹 개발 마스터하기!!!',
      podGoal: null,
      mainArea: '이화여자대학교',
      studyMood: 'quiet',
      studyType: 'cafe',
      isHost: false,
      status: 'cheerUp',
    },
  ]);

  const [attendenceById, setAttendenceById] = useState(() => {
    return Object.fromEntries(members.map((member) => [member.id, false]));
  });

  const onToggleAttendance = (memberId) => {
    setAttendenceById((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
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
  const selectedMember = members.find((m) => m.id === selectedMemberId) ?? null;

  // [추가] podGoal 갱신
  const updateMemberPodGoal = (memberId, nextPodGoal) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, podGoal: nextPodGoal } : m)),
    );
  };

  return (
    <>
      <PodDetailContainer>
        <PodPreviewContainer>
          <PodPreview
            podImage="/images/img-placeholder.png"
            podName="모닥모닥코"
            location="이대"
            currentPeople={3}
            maxPeople={5}
            description="혼자서는 아무것도 못하는 감자예요🥔 같이 코드 쓸 사람?"
            studyMood="chatty"
            studyType="cafe"
            time={podInfo.time}
            place={podInfo.place}
            isHost={isHost}
            hostMention={podInfo.hostMention}
            onInputChange={handleUpdatedPodInfo}
          />
          <ButtonWrapper>
            <Button
              shape="rect"
              size="slim"
              width="200px"
              onClick={() => {
                isHost ? setIsClosePopupOpen(true) : setIsApplyPopupOpen(true);
              }}
            >
              {isHost ? '팟 모집 종료하기' : '참여 신청하기'}
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
              {members.map((member) => (
                <ClickableMemberWrapper
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                >
                  <PodMember
                    key={member.id}
                    id={member.id}
                    isMe={member.id === myId}
                    profileImage={member.profileImage}
                    name={member.name}
                    goal={member.goal}
                    podGoal={member.podGoal}
                    mainArea={member.mainArea}
                    studyMood={member.studyMood}
                    studyType={member.studyType}
                    isHost={member.isHost}
                    hostMention={member.isHost ? podInfo.hostMention : ''}
                    onHostMentionChange={handleUpdatedPodInfo}
                    status={member.status}
                    showAttendance={isHost}
                    attendenceChecked={!!attendenceById[member.id]}
                    onToggleAttendance={(e) => {
                      e.stopPropagation(); // [추가] 출석체크 클릭할 때, 상세 페이지로 x
                      onToggleAttendance(member.id);
                    }}
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
            podInfo={podInfo}
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

// [추가]
const ClickableMemberWrapper = styled.div`
  cursor: pointer;
`;
