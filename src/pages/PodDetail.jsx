import styled from '@emotion/styled';
import PodPreview from '../components/pod/PodPreview';
import Button from '../components/common/Button';
import PodMember from '../components/pod/PodMember';
import { useState } from 'react';

export default function PodDetail() {
  const isHost = true; // 임시 플래그, 추후 수정 필요

  // 팟장이 수정 가능한 팟 정보
  const [podInfo, setPodInfo] = useState({
    time: '1/23 23:00',
    place: '꽃피다 이화다방',
    hostMention: '안녕하세요, 팟장 모다기입니다!',
  });

  const handleUpdatedPodInfo = (e) => {
    const { name, value } = e.target;
    setPodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [members, setMembers] = useState([
    {
      id: 1,
      profileImage: '/images/img-placeholder.png',
      name: '모다기',
      goal: 'Thread 클론 코딩',
      isHost: true,
      status: 'hi',
      hostMention: '안녕하세요, 팟장 모다기입니다!',
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

  return (
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
          <Button shape="rect" size="slim" width="200px">
            {isHost ? '팟 모집 종료하기' : '참여 신청하기'}
          </Button>
        </ButtonWrapper>
      </PodPreviewContainer>
      <PodDetailInfoContainer>
        {members.map((member) => (
          <PodMember
            key={member.id}
            id={member.id}
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
