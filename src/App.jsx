import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css'

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


