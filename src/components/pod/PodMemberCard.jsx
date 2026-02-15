import styled from '@emotion/styled';
import Goal from '../common/tagChip/Goal';
import Status from '../common/tagChip/Status';
import { useState } from 'react';
import { updateStatusBadge } from '../../api/PodDetailApi';

const BADGE_TYPES = [
  'hi',
  'niceToMeet',
  'cheerUp',
  'workingHard',
  'onMyWay',
  'tired',
  'needHelp',
  'runningLate',
  'goodJob',
];

// 배지 팝업
const Badges = ({ setStatusBadge }) => {
  return (
    <BadgeContainer>
      {BADGE_TYPES.map((type) => (
        <Badge
          key={type}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setStatusBadge(type);
          }}
        >
          <Status type={type} />
        </Badge>
      ))}
    </BadgeContainer>
  );
};

export default function PodMemberCard({
  myId,
  pod,
  member,
  // 멘션
  editablePodInfo,
  onHostMentionChange,
  onHostMentionUpdate,
  // 출석
  attendanceChecked,
  onToggleAttendance,
  // 배지
  onBadgeUpdated,
  // 권한
  canEditMention,
  canCheckAttendance,
  canChangeBadge,
}) {
  const [isBadgesVisible, setIsBadgesVisible] = useState(false); // 배지 팝업 노출 상태
  const [isMentionUpdated, setIsMentionUpdated] = useState(false); // 멘션 수정 상태

  // 멘션 입력 필드 focus
  const handleFocus = () => {
    setIsMentionUpdated(false);
  };

  // 멘션 입력 필드 blur
  const handleFinishEditing = (e) => {
    if (pod.hostAnnouncement !== e.target.value) {
      setIsMentionUpdated(true);
    }
  };

  // 배지 클릭 시 상태 업데이트
  const handleStatusBadge = async (status) => {
    onBadgeUpdated(status);
    setIsBadgesVisible(false);
    try {
      await updateStatusBadge(myId, member.memberId, status);
    } catch (error) {
      console.error('팟 멤버 상태 배지 변경 실패:', error);
      throw error;
    }
  };

  // 엔터키 입력 시 멘션 수정
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
      handleFinishEditing(e);
    }
  };

  return (
    <MemberContainer>
      <MemberImageWrapper>
        {member.isHost && (
          <HostIconWrapper>
            <img src="/pod/pod-host.svg" alt="팟장 아이콘" />
          </HostIconWrapper>
        )}
        <img
          className="member-profile-image"
          src={`/images/${member.profileImage}`}
          alt={`${member.nickname} 프로필 사진`}
        />
      </MemberImageWrapper>
      <MemberInfoContainer>
        <MemberName>{member.nickname}</MemberName>
        <Goal
          as="input"
          readOnly
          value={member.displayedGoal}
          completed={member.hasGoal}
          style={{
            fontSize: '16px',
            height: '25px',
            cursor: 'default',
          }}
        />
        {canEditMention ? (
          <HostMention
            name="hostAnnouncement"
            placeholder="팟원들에게 전할 말을 입력해주세요!"
            value={member.isHost ? editablePodInfo.hostAnnouncement : ''}
            onChange={onHostMentionChange}
            readOnly={!canEditMention}
            onFocus={handleFocus}
            onBlur={(e) => onHostMentionUpdate(e.target.name, e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Placeholder />
        )}
        {canCheckAttendance && (
          <AttendanceLabel onClick={(e) => e.stopPropagation()}>
            <HiddenCheckbox
              type="checkbox"
              aria-label={`${member.memberId} 출석 체크`}
              checked={attendanceChecked}
              onChange={onToggleAttendance}
            />
            <CustomCheckbox $checked={attendanceChecked} aria-hidden />
          </AttendanceLabel>
        )}
        <StatusBadgeWrapper
          onClick={(e) => {
            e.stopPropagation();
            canChangeBadge && setIsBadgesVisible(!isBadgesVisible);
          }}
          style={{ cursor: canChangeBadge ? 'pointer' : 'default' }}
        >
          <Status
            type={member.statusBadge}
            style={{ cursor: canChangeBadge ? 'pointer' : 'default' }}
          />
          {isBadgesVisible && (
            <>
              <Overlay
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBadgesVisible(false);
                }}
              />
              <Badges setStatusBadge={handleStatusBadge} />
            </>
          )}
        </StatusBadgeWrapper>
      </MemberInfoContainer>
    </MemberContainer>
  );
}

const BadgeContainer = styled.div`
  position: absolute;
  top: 70px;
  right: -100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  padding: 16px 27px;
  z-index: 1001;
  width: 550px;
  background-color: #ffffff;
  border: 1px solid #d9695c;
  border-radius: 20px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
`;

const Badge = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const MemberContainer = styled.div`
  position: relative;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 24px;
  border-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
`;

const MemberImageWrapper = styled.div`
  position: relative;
  width: 45px;
  height: 45px;

  img.member-profile-image {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const HostIconWrapper = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -10px;
  right: -10px;
  z-index: 1;
`;

const MemberInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const MemberName = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
`;

const HostMention = styled.input`
  font-size: 16px;
  font-weight: 400;
  margin-inline: 20px;
  border: none;
  outline: none;
  background-color: transparent;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  flex: 1;
  min-width: 0;

  &[placeholder]:empty::before {
    content: attr(placeholder);
    color: #828282;
  }

  &: focus {
    border-bottom: ${(props) =>
      props.$canEdit ? '1px solid #828282' : 'none'};
  }
`;

const Placeholder = styled.div`
  flex: 1;
`;

const AttendanceLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const CustomCheckbox = styled.span`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${(props) => (props.$checked ? '#D9695C' : '#d9d9d9')};

  &::after {
    content: '';
    width: 12px;
    height: 8px;
    border-left: 3px solid white;
    border-bottom: 3px solid white;
    transform: translateY(-3px) rotate(-45deg);
    margin-top: 2px;
    display: block;
  }
`;

const StatusBadgeWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
  z-index: 999;
`;
