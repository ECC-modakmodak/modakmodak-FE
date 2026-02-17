import styled from '@emotion/styled';
import Toggle from './toggle';
import NotificationItem from './NotificationItem';
import { getNotifications } from '../../api/notification';
import { useEffect, useState } from 'react';

export default function NotificationContainer({ onNotificationRead }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getNotifications();
      setNotifications(data);
    })();
  }, []);

  // 알림 읽음 처리
  const handleMarkedRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.notificationId === notificationId ? { ...n, isRead: true } : n,
      ),
    );
    onNotificationRead(notificationId);
  };

  return (
    <Container>
      <Toggle />
      <ContentArea>
        <NextPod>내일 21시, 모각코가 예정되어 있어요.</NextPod>
        <Label>알림</Label>
        <Divider />
        <Notifications>
          {notifications
            .filter((item) => !item.isRead)
            .map((item) => (
              <NotificationItem
                key={item.notificationId}
                notification={item}
                onMarkedRead={handleMarkedRead}
              />
            ))}
        </Notifications>
      </ContentArea>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 100;
  top: 120px;
  right: 270px;
  width: 300px;
  height: 450px;
  background-color: #d9d9d9;
  border: 1px solid #000000;
  border-radius: 30px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 15px;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #000000;
  }

  &::after {
    content: '';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 18px solid #d9d9d9;
  }
`;

const ContentArea = styled.div`
  height: calc(100% - 55px);
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 30px;
  padding: 11px 16px;
`;

const NextPod = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fbf2f1;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  color: #d9695c;
`;

const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  margin: 10px 0;
  text-align: left;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: #000000;
  margin: 10px 0;
`;

const Notifications = styled.div`
  height: calc(100% - 80px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
