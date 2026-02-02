import styled from '@emotion/styled';
import Status from '../components/common/tagChip/Status';
import StudyType from '../components/common/tagChip/StudyType';
import StudyMood from '../components/common/tagChip/StudyMood';
import Today from '../components/common/tagChip/Today';
import Retrospect from '../components/common/tagChip/Retrospect';
import Goal from '../components/common/tagChip/Goal';
import { useState } from 'react';

export default function ComponentTest() {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isDone, setIsDone] = useState(false);

  return (
    <div
      className="component-test-page"
      style={{ backgroundColor: '#ffffff', padding: '50px' }}
    >
      {/* 목표 설정 */}
      <Test>
        <Goal
          value={value}
          completed={completed}
          onChange={(e) => setValue(e.target.value)}
          onComplete={() => setCompleted(true)}
        />
      </Test>
      {/* 상태 뱃지 */}
      <Test>
        <Status type="hi" />
        <Status type="niceToMeet" />
        <Status type="cheerUp" />
        <Status type="workingHard" />
        <Status type="onMyWay" />
        <Status type="tired" />
        <Status type="needHelp" />
        <Status type="runningLate" />
        <Status type="goodJob" />
      </Test>
      {/* 회고 자기평가 태그 */}
      <Test>
        {!isDone ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <Retrospect mode="select" onChange={setSelected} />
            <button onClick={() => setIsDone(true)}>완료</button>
          </div>
        ) : (
          <Retrospect mode="selected" selectedItems={selected} />
        )}
      </Test>
      {/* 스터디 무드 */}
      <Test>
        <StudyMood type="chatty" />
        <StudyMood type="quiet" />
      </Test>
      {/* 스터디 유형 */}
      <Test>
        <StudyType type="cafe" />
        <StudyType type="zoom" />
        <StudyType type="cam" />
        <StudyType type="other" />
      </Test>
      {/* 오늘의 팟 태그 */}
      <Test>
        <Today content="이화여대" />
        <Today content="21:00" />
        <Today content="모각코" />
      </Test>
    </div>
  );
}

const Test = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;
