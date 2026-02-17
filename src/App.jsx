import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import PodDetail from './pages/PodDetail';
import LoginPage from './pages/Login';
import OnboardingPage from './pages/Onboarding';
import Signup from './pages/Signup';
import CreatePod from './pages/CreatePod';
import CreatePodDetail from './pages/CreatePodDetail';
import Home from './pages/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* 다른 라우트들은 여기에 추가 */}
        {/* 팟 상세페이지 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/pod/:podId" element={<PodDetail />} />
            <Route path="/create" element={<CreatePod />} />
            <Route
              path="/create/detail/:meeetingId"
              element={<CreatePodDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
