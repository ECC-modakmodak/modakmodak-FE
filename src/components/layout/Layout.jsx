import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import styled from '@emotion/styled';

/* 메인 페이지 */
const Main = styled.main`
  min-height: calc(100vh - 110px - 110px);
  display: flex;
  flex-direction: column;
`;

export default function Layout() {
  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
