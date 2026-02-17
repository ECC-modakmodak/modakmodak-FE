import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import logoSvg from '../../assets/svg/logo.svg';
import profileSvg from '../../assets/svg/profile.svg';
import alarmSvg from '../../assets/svg/alarm.svg';
import { useState } from 'react';

// 알림창
import NotificationContainer from '../notification/NotificationContainer';
import { getUnreadNotificationCount } from '../../api/notification';
import { useEffect } from 'react';

// 프로필
import { getProfile } from '../../api/nav';

/* 네비 바 전체 */
const NavWrap = styled.nav`
  box-sizing: border-box;

  position: relative;
  display: flex;
  justify-content: space-between; /* 가로축 */
  align-items: center; /* 세로축 */
  width: 100%;
  min-height: 130px;
  padding: 20px 3.125% 20px 5.208%;
  background-color: #fff;
  text-align: center;
`;
/* 좌측 메뉴 (팟, 팟메이트, 회고) */
const Left = styled.div`
  display: flex;
  gap: 0 clamp(72px, 6.5vw, 140px);
  justify-content: flex-start;
  font-size: clamp(15px, 3vw, 30px);
  font-weight: 600; /* Medium */
`;
const TextLink_Red = styled(Link)`
  text-decoration: none;
  color: #d9695c;

  &:visited {
    color: #d9695c;
  }
`;
const TextLink_Blk = styled(Link)`
  text-decoration: none;
  color: #000;

  &:visited {
    color: #000;
  }
`;

/* 중앙 로고 */
const Center = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  width: clamp(220px, 18vw, 355px);
  height: auto;
`;

/* 우측 메뉴 (알림, 프로필, 로그아웃) */
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0 clamp(32px, 2.6vw, 50px);
  justify-content: flex-end;
`;
const RightBox = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0px 12px;
  font-size: clamp(15px, 2.5vw, 25px);
  font-weight: 400;
  color: #000;
  position: relative;
`;
const RightImg = styled.img`
  width: clamp(20px, 6vw, 50px);
  height: clamp(20px, 6vw, 50px);
`;
const Button = styled.button`
  width: clamp(90px, 22vw, 160px);
  height: clamp(38px, 8vw, 61px);

  border-radius: 10px;
  border: 1px solid #d9695c;
  background: #fbf2f1;

  color: #d9695c;
  font-size: clamp(16px, 2.4vw, 25px);
  font-weight: 500;

  cursor: pointer;
  transition: transform 0.1s ease;
`;

// 알림
const UnreadDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: #d9695c;
  position: absolute;
  border-radius: 50%;
  top: 10px;
  left: 5px;
`;
const NotificationLabel = styled.div`
  font-weight: 400;

  span {
    color: #d9695c;
    font-weight: 600;
  }
`;

/* 미완성된 페이지 처리 */
export default function NavBar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem('username');
    return !!(user && user !== 'null' && user !== 'undefined');
  });

  const DisabledLink = (e) => {
    e.preventDefault(); // Link 이동 막기
    alert('준비 중인 페이지입니다.'); // 알림창 표시
  };

  const [showNotification, setShowNotification] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getUnreadNotificationCount();
      setNotificationsCount(data);
    })();
  }, []);

  const handleNotificationRead = () => {
    setNotificationsCount((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    (async () => {
      const data = await getProfile();
      setProfile(data);
    })();
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();

    alert('로그아웃 되었습니다.');
    setIsLoggedIn(false);
  };

  return (
    <NavWrap>
      <Left>
        <TextLink_Red to="/">팟</TextLink_Red> {/* 팟 페이지 링크 연결 */}
        <TextLink_Blk to="/" onClick={DisabledLink}>
          팟메이트
        </TextLink_Blk>
        <TextLink_Blk to="/" onClick={DisabledLink}>
          회고
        </TextLink_Blk>
      </Left>

      <Center>
        <LogoLink to="/">
          {' '}
          {/* 홈 페이지 연결 필요*/}
          <LogoImg src={logoSvg} alt="logo" />
        </LogoLink>
      </Center>

      <Right>
        <RightBox onClick={() => setShowNotification(!showNotification)}>
          <RightImg src={alarmSvg} alt="alarm" />
          {notificationsCount > 0 && <UnreadDot />}
          <NotificationLabel>
            알림 <span>{notificationsCount || 0}</span>
          </NotificationLabel>
        </RightBox>
        <RightBox to="/" onClick={DisabledLink}>
          <RightImg
            src={`/images/${profile?.profileImage || profileSvg}`}
            alt="profile"
          />
          <span>{profile?.nickname || '닉네임'}</span>
        </RightBox>
        <Button
          type="button"
          onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </Button>
      </Right>

      {/* 알림창 */}
      {showNotification && (
        <NotificationContainer onNotificationRead={handleNotificationRead} />
      )}
    </NavWrap>
  );
}
