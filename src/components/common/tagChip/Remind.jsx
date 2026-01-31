import styled from '@emotion/styled';
import Pill from './Pill';
import { useState } from 'react';

const RemindOptionContainer = styled.div`
  display: flex;
  gap: 15px 17px;
  flex-wrap: wrap;
`;

// Options
const REMIND_OPTIONS = [
  // Positive
  { key: 'didWell', label: '해냈어요', value: 'positive' },
  { key: 'wellDone', label: '잘했어요', value: 'positive' },
  { key: 'goalAchieved', label: '목표 달성', value: 'positive' },
  { key: 'asPlanned', label: '계획대로', value: 'positive' },
  { key: 'proud', label: '뿌듯해요', value: 'positive' },
  { key: 'satisfied', label: '만족', value: 'positive' },
  { key: 'successful', label: '성공적', value: 'positive' },
  { key: 'meaningfull', label: '의미 있었어요', value: 'positive' },
  { key: 'focused', label: '집중했어요', value: 'positive' },
  // Neutral
  { key: 'consistent', label: '꾸준하게', value: 'neutral' },
  { key: 'persevered', label: '끝까지 함', value: 'neutral' },
  { key: 'improved', label: '잘 버텼다', value: 'neutral' },
  { key: 'didNotGiveUp', label: '포기 안 해', value: 'neutral' },
  { key: 'gotStarted', label: '일단 앉음', value: 'neutral' },
  { key: 'regainedFocus', label: '집중 회복', value: 'neutral' },
  // Negative
  { key: 'okay', label: '무난했어요', value: 'negative' },
  { key: 'soso', label: '그냥 그랬어요', value: 'negative' },
  { key: 'regretful', label: '아쉬워요', value: 'negative' },
  { key: 'insufficient', label: '부족했어요', value: 'negative' },
  { key: 'unfocused', label: '집중이 안 돼요', value: 'negative' },
  { key: 'nextTime', label: '다음에 해요', value: 'negative' },
];

export default function Remind({ onChange }) {
  // 화면 렌더링할 때마다 옵션 무작위 배치
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const [shuffledOptions] = useState(() => shuffle(REMIND_OPTIONS));

  // 선택 옵션 관리
  const [selectedOption, setSelectedOption] = useState(null);

  // 토글
  const toggle = (key) => {
    setSelectedOption((prev) => {
      const next = new Set(prev || []);
      if (next.has(key)) next.delete(key);
      else next.add(key);

      onChange?.(Array.from(next));
      return next;
    });
  };

  return (
    <RemindOptionContainer>
      {shuffledOptions.map((option) => {
        const isSelected = selectedOption?.has(option.key);
        const state = isSelected ? option.value : 'default';

        return (
          <Pill
            key={option.key}
            variant="remind"
            state={state}
            onClick={() => toggle(option.key)}
            role="button"
            tabIndex={0}
          >
            {option.label}
          </Pill>
        );
      })}
    </RemindOptionContainer>
  );
}
