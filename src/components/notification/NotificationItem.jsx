import styled from '@emotion/styled';
import { markNotificationAsRead } from '../../api/NotificationApi';

export default function NotificationItem({ notification, onMarkedRead }) {
  const handleRead = async () => {
    await markNotificationAsRead(notification.notificationId);
    onMarkedRead(notification.notificationId);
  };

  return (
    <ItemContainer>
      <ProfileImg src={`/images/profile_default.png`} alt="프로필 이미지" />
      {!notification.isRead && <UnreadDot />}
      <NotificationInfo>
        <Content>
          <SenderNickname>{notification.senderNickname}</SenderNickname>
          <Message>
            회원님의 {notification.podName}에
            <br />
            참여 신청을 보냈어요!
          </Message>
          <ButtonWrapper>
            <AcceptButton onClick={() => handleRead()}>승인</AcceptButton>
            <RejectButton onClick={() => handleRead()}>거절</RejectButton>
          </ButtonWrapper>
        </Content>
        <Date>{notification.date}</Date>
      </NotificationInfo>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 10px;
  border-bottom: 1px solid #c0c0c0;
  margin-bottom: 10px;
`;

const ProfileImg = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #d9695c;
  border: 1.5px solid #ffffff;
  border-radius: 50%;
  position: absolute;
`;

const NotificationInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SenderNickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
`;

const Message = styled.div`
  font-size: 14px;
  color: #a5a5a5;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const AcceptButton = styled.button`
  width: 40px;
  height: 30px;
  font-size: 12px;
  border: none;
  border-radius: 15px;
  background-color: #e4aea7;
  cursor: pointer;
`;

const RejectButton = styled.button`
  width: 40px;
  height: 30px;
  font-size: 12px;
  border: none;
  border-radius: 15px;
  background-color: #e3e3e3;
  cursor: pointer;
`;

const Date = styled.div`
  font-size: 14px;
  color: #c0c0c0;
`;
