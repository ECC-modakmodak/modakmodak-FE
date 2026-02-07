import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import PodDetail from './pages/PodDetail';
import ComponentTest from './pages/component-test';
import LoginPage from './pages/Login';
import OnboardingPage from './pages/Onboarding';
import Signup from './pages/Signup';

/* 임시 홈 */
function Home() {
  return <div>ExHome</div>;
}
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* 다른 라우트들은 여기에 추가 */}
          {/* 팟 상세페이지 */}
          <Route path="/pod/:podId" element={<PodDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
