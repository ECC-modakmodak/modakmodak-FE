import Goal from '../common/tagChip/Goal';
import StudyMood from '../common/tagChip/StudyMood';
import Button from '../common/Button';
import Pill from '../common/tagChip/Pill'
import Host from '/pod/pod-host.svg';
import AreaSvg from '/pod/location.svg';
import { useState } from 'react';

// css
import {
  DetailWrapper,
  DetailContent,
  ProfileSection,
  ProfileWrapper,
  HostIcon,
  ProfileImg,
  ProfileInfoWrapper,
  Name,
  PodGoal,
  InfoSection,
  InfoRow,
  InfoLabel,
  Tags,
  Tag,
  AreaSection,
  AreaIcon,
  ProgressContainer,
  ProgressBar,
  ButtonWrapper,
} from '../../styles/MemberDetail.style';

// [추가] 멤버 상세 페이지
export default function MemberDetail({
  member,
  myId,
  onClose,
  onChangePodGoal,
}) {
  const [podGoalDraft, setPodGoalDraft] = useState(member?.podGoal ?? '');
  if (!member) return null;
  const isMe = member.id === myId;
  const bgColor = member.studyType === '#대면' ? 'rgba(250, 48, 75, 0.55)' : 'rgba(38, 172, 255, 0.55)';

  return (
    <DetailWrapper>
      <DetailContent>
        {/* 왼쪽 */}
        <ProfileSection>
          <ProfileWrapper>
            {member.isHost && <HostIcon src={Host} alt="팟장" />}
            <ProfileImg src={member.profileImage} />
          </ProfileWrapper>
          <ProfileInfoWrapper>
            <Name>{member.name}</Name>
            <PodGoal>
              {member.podGoal ? (
                <Goal
                  completed={true}
                  value={member.podGoal}
                  readOnly
                  style={{
                    cursor: 'default',
                  }}
                />
              ) : isMe ? (
                <Goal
                  completed={false}
                  value={podGoalDraft}
                  style={{
                    padding: '8px 20px',
                    fontSize: '20px',
                    fontWeight: '500',
                  }}
                  onChange={(e) => setPodGoalDraft(e.target.value)}
                />
              ) : (
                <Goal
                  completed={false}
                  readOnly
                  value={member.podGoal || '어떤 목표를 이루어볼까요?'}
                  style={{
                    padding: '8px 20px',
                    fontSize: '20px',
                    fontWeight: '500',
                    cursor: 'default',
                  }}
                />
              )}
            </PodGoal>
          </ProfileInfoWrapper>
        </ProfileSection>

        {/* 오른쪽 */}
        <InfoSection>
          <InfoRow>
            <InfoLabel>목표</InfoLabel>
            <Goal
              completed={true}
              value={member.goal}
              readOnly
              style={{
                color: '#fafafa',
                height: '40px',
                fontSize: '20px',
                fontWeight: '500',
                padding: '2px 15px',
                cursor: 'default',
                lineHeight: '1.8', // textarea라서 수동 조절
              }}
            >
              {member.goal}
            </Goal>
          </InfoRow>
          <InfoRow>
            <InfoLabel>선호 유형</InfoLabel>
            <Tags>
              <Tag>
                <StudyMood type={member.studyMood} size="medium" />
              </Tag>
              <Tag>
                <Pill
                  variant="filled"
                  size="medium"
                  backgroundColor={bgColor}
                  style={{ cursor: 'default' }}
                >
                {member.studyType}
                </Pill>
              </Tag>
            </Tags>
          </InfoRow>
          <InfoRow>
            <InfoLabel>주요 활동 지역</InfoLabel>
            <AreaSection>
              <AreaIcon
                src={AreaSvg}
                alt="주요 활동 지역"
                style={{ alignSelf: 'center' }}
              />
              <p>{member.mainArea}</p>
            </AreaSection>
          </InfoRow>
          <InfoRow>
            <InfoLabel>팟 참여율</InfoLabel>
            <ProgressContainer>
              <ProgressBar width={member.attendanceRate} />
            </ProgressContainer>
          </InfoRow>
        </InfoSection>
      </DetailContent>
      {/* 디자인 체크 */}
      <ButtonWrapper>
        {isMe && !member.podGoal ? (
          <Button
            shape="chip"
            variant="filled"
            bgColor="#d9695c"
            size="large"
            style={{ padding: '10px 20px', fontSize: '20px' }}
            onClick={() => {
              const next = podGoalDraft.trim();
              if (!next) return;
              onChangePodGoal?.(next); // 저장
              onClose?.(); // 닫기
            }}
          >
            목표 등록 후 닫기
          </Button>
        ) : (
          <Button
            shape="chip"
            variant="filled"
            bgColor="#d9695c"
            size="medium"
            style={{ padding: '10px 20px', fontSize: '20px' }}
            onClick={onClose}
          >
            프로필 닫기
          </Button>
        )}
      </ButtonWrapper>
    </DetailWrapper>
  );
}
