import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import styled from '@emotion/styled';

/* 전체 레이아웃을 감싸는 래퍼 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/* 메인 페이지 */
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function Layout() {
  return (
    <Wrapper>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
}
