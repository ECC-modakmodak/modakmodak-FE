import {Link} from 'react-router-dom';
import styled from '@emotion/styled';

import logoSvg from '../../assets/svg/logo.svg';
import profileSvg from '../../assets/svg/profile.svg';
import alarmSvg from '../../assets/svg/alarm.svg';

/* 네비 바 전체 */
const NavWrap = styled.nav`
  box-sizing: border-box;

  position: relative;
  display: flex;
  justify-content: space-between; /* 가로축 */
  align-items: center; /* 세로축 */
  width: 100%;
  min-height: 110px;
  padding: 20px 3.125% 20px 5.208%;
  background-color: #FFF;
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
  color: #D9695C;

  &:visited {
    color: #D9695C;
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
`;
const RightImg = styled.img`
  width: clamp(20px, 6vw, 50px);
  height: clamp(20px, 6vw, 50px);
`;
const Button = styled.button`
  width: clamp(90px, 22vw, 160px);
  height: clamp(38px, 8vw, 61px);

  border-radius: 10px;
  border: 1px solid #D9695C;
  background: #FBF2F1;

  color: #D9695C;
  font-size: clamp(16px, 2.4vw, 25px);
  font-weight: 500;
`;


/* === disablelink -> 허용 but 추가 창 작업, 알림창도 디자인 === */

/* 미완성된 페이지 처리 */
export default function NavBar() {
  const DisabledLink = (e) => {
    e.preventDefault(); // Link 이동 막기
    alert('준비 중인 페이지입니다.'); // 알림창 표시
  };

  return (
    <NavWrap>
      <Left>
        <TextLink_Red to="/">팟</TextLink_Red> {/* 팟 페이지 링크 연결 */}
        <TextLink_Blk to="/" onClick={DisabledLink}>팟메이트</TextLink_Blk>
        <TextLink_Blk to="/" onClick={DisabledLink}>회고</TextLink_Blk>
      </Left>

      <Center>
        <LogoLink to="/"> {/* 홈 페이지 연결 필요*/}
          <LogoImg src={logoSvg} alt="logo" />
        </LogoLink>
      </Center>

      <Right>
        <RightBox to="/" onClick={DisabledLink}>
          <RightImg src={alarmSvg} alt="alarm" />
          <span>알림 0</span>
        </RightBox>
        <RightBox to="/" onClick={DisabledLink}>
          <RightImg src={profileSvg} alt="profile" /> 
          <span>닉네임</span>
        </RightBox>
        <Button type="button">로그아웃</Button>
      </Right>
    </NavWrap>
  );
}