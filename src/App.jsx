import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import ComponentTest from './pages/component-test';

/* 임시 홈 */
function Home() {
  return <div>ExHome</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* 다른 라우트들은 여기에 추가 */}
          {/* 컴포넌트 테스트 페이지 (확인 후 삭제) */}
          <Route path="/component-test" element={<ComponentTest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
