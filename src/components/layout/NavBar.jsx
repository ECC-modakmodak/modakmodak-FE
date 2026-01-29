import {Link} from 'react-router-dom';
import styled from '@emotion/styled';

import logoSvg from '../../assets/svg/logo.svg';
import profileSvg from '../../assets/svg/profile.svg';

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
  font-size: 30px; /* 폰트 크기 퍼센트 조정 */
  font-weight: 500; /* Medium */
`;
const TextLink = styled(Link)`
  text-decoration: none;
  color: #D9695C;

  &:visited {
    color: #D9695C;
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

/* 우측 메뉴 (프로필, 로그아웃) */
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0 clamp(32px, 2.6vw, 50px);
  justify-content: flex-end;
`;
const DisabledLink = styled.span`
  color: #000;
  cursor: not-allowed;
  user-select: none;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0px 12px;
  font-size: 27px; /* 폰트 크기 퍼센트 조정 */
  font-weight: 400;
`;
const RightImg = styled.img`
  width: 55px; /* 아이콘 크기 퍼센트 조정 */
  height: 55px;
`;
const Button = styled.button`
  width: 160px;
  height: 61px; /* 버튼 크기 퍼센트 조정 */

  border-radius: 10px;
  border: 1px solid #D9695C;
  background: #FBF2F1;

  color: #D9695C;
  font-size: 27px; /* 폰트 크기 퍼센트 조정 */
  font-weight: 500;
`;

export default function NavBar() {
  return (
    <NavWrap>
      <Left>
        <TextLink to="/">팟</TextLink> {/* 팟 페이지 링크 연결 */}
        <DisabledLink>팟메이트</DisabledLink>
        <DisabledLink>회고</DisabledLink>
      </Left>

      <Center>
        <LogoLink to="/"> {/* 홈 페이지 연결 필요*/}
          <LogoImg src={logoSvg} alt="logo" />
        </LogoLink>
      </Center>

      <Right>
        {/* === 사용하지 않는 페이지 === */}
        <ProfileBox>
          <RightImg src={profileSvg} alt="profile" /> 
          <DisabledLink>닉네임</DisabledLink>
        </ProfileBox>
        <Button type="button">로그아웃</Button>
      </Right>
    </NavWrap>
  );
}