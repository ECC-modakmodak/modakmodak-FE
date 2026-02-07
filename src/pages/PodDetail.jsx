import styled from '@emotion/styled';
import PodPreview from '../components/pod/PodPreview';
import Button from '../components/common/Button';
import PodMember from '../components/pod/PodMember';
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

  const [members, setMembers] = useState([
    {
      id: 1,
      profileImage: '/images/img-placeholder.png',
      name: '모다기',
      goal: 'Thread 클론 코딩',
      isHost: true,
      status: 'hi',
    },
    {
      id: 2,
      profileImage: '/images/img-placeholder.png',
      name: '감자',
      goal: '소플의 리액트 7장 공부',
      isHost: false,
      status: 'niceToMeet',
    },
    {
      id: 3,
      profileImage: '/images/img-placeholder.png',
      name: '자고싶어요',
      goal: '프로젝트 코드 리뷰',
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
          {members.map((member) => (
            <PodMember
              key={member.id}
              id={member.id}
              isMe={member.id === myId}
              profileImage={member.profileImage}
              name={member.name}
              goal={member.goal}
              isHost={member.isHost}
              hostMention={member.isHost ? podInfo.hostMention : ''}
              onHostMentionChange={handleUpdatedPodInfo}
              status={member.status}
              showAttendance={isHost}
              attendenceChecked={!!attendenceById[member.id]}
              onToggleAttendance={() => onToggleAttendance(member.id)}
            />
          ))}
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
