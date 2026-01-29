import './App.css';
import {
  CheerUp,
  GoodJob,
  Hi,
  NeedHelp,
  NiceToMeet,
  OnMyWay,
  RunningLate,
  Tired,
  WorkingHard,
} from './components/common/Badge';
import Goal from './components/common/Goal';
import { useState } from 'react';
import Remind from './components/common/Remind';

function App() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <>
      {/* 목표 입력 테스트 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        <Goal
          value={value}
          completed={completed}
          onChange={(e) => setValue(e.target.value)}
          onComplete={() => setCompleted(true)}
        />
      </div>
      {/* 상태 배지 테스트 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Hi />
        <NiceToMeet />
        <CheerUp />
        <WorkingHard />
        <OnMyWay />
        <Tired />
        <NeedHelp />
        <RunningLate />
        <GoodJob />
      </div>
      {/* 회고 테스트 */}
      <div style={{ marginTop: '30px' }}>
        <Remind />
      </div>
    </>
  );
}

export default App;
