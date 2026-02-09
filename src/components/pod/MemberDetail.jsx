import styled from '@emotion/styled';
import Goal from '../common/tagChip/Goal';
import StudyMood from '../common/tagChip/StudyMood';
import StudyType from '../common/tagChip/StudyType';
import Button from '../common/Button';
import Host from '../../assets/svg/Host.svg';
import AreaSvg from '../../assets/svg/Location_S.svg';
import { useState } from 'react';

// padding chk.
const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  background-color: #fff;
  border-radius: 30px;
`;

const DetailContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;

  gap: 56px;
  margin: 100px 237px 22px 237px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 240px;
  gap: 37px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const HostIcon = styled.img`
  position: absolute;
  z-index: 1;
  width: 70px;
  height: 70px;
  top: -10px;
  right: -10px;
`;
const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;
const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 18px;
`;
const Name = styled.h3`
  color: #000;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0px;
`;

const PodGoal = styled.div``;

const InfoSection = styled.div`
  display: grid;
  gap: 22px;

  width: 377px;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 22px;
`;
const InfoLabel = styled.h2`
  color: #000;
  text-align: right;
  font-size: 20px;
  font-weight: 500;
  margin: 8px 0px;
`;

const Tags = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
`;
const Tag = styled.div``;

const AreaSection = styled.div`
  display: inline-flex;
  justify-content: left;
  align-items: flex-start;
  gap: 8px;

  p {
    color: #000;
    font-size: 20px;
    font-weight: 500;
    margin: 8px 0px;
  }
`;
const AreaIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const ProgressContainer = styled.div`
  width: 232px;
  height: 27px;

  border-radius: 100px;
  background: #d9d9d9;
`;
const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;

  border-radius: 100px;
  background: #65d95c;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 22px;
  margin-right: 23px;
`;

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
                  value={member.podGoal || '목표가 설정되지 않았습니다.'}
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
                <StudyType type={member.studyType} size="medium" />
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
