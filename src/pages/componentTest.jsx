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
} from './components/common/tagChip/Badge';
import Goal from './components/common/tagChip/Goal';
import { useState } from 'react';
import Remind from './components/common/tagChip/Remind';
import { Chatty, Quiet } from './components/common/tagChip/Mood';
import { Cafe, Cam, Other, Zoom } from './components/common/tagChip/StudyType';
import Today from './components/common/tagChip/Today';

export default function ComponentTest() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);

  return (
    <div
      className="App"
      style={{ backgroundColor: '#ffffff', padding: '50px' }}
    >
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
      {/* 공부 태그 테스트 */}
      <div>
        {/* 분위기 태그 */}
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Chatty />
          <Quiet />
        </div>
        {/* 공부 유형 태그 */}
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Cafe />
          <Zoom />
          <Cam />
          <Other />
        </div>
      </div>
      {/* 오늘의 팟  */}
      <div
        style={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Today label="이화여대" />
        <Today label="21:00" />
        <Today label="모각코" />
      </div>
    </div>
  );
}
