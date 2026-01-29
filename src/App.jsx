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

function App() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <>
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
    </>
  );
}

export default App;
