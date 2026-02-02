import styled from '@emotion/styled';
import Pill from './Pill';
import { useState } from 'react';

const RemindOptionContainer = styled.div`
  display: flex;
  gap: 15px 17px;
  flex-wrap: wrap;
`;

const RETROSPECT_DATA = {
  positive: [
    '해냈어요',
    '잘했어요',
    '목표 달성',
    '계획대로',
    '뿌듯해요',
    '만족',
    '성공적',
    '의미 있었어요',
    '집중했어요',
  ],
  neutral: [
    '꾸준하게',
    '끝까지 함',
    '잘 버텼다',
    '포기 안 해',
    '일단 앉음',
    '집중 회복',
  ],
  negative: [
    '무난했어요',
    '그냥 그랬어요',
    '아쉬워요',
    '부족했어요',
    '집중이 안 돼요',
    '다음에 해요',
  ],
};

export default function Retrospect({
  onChange,
  mode = 'select',
  selectedItems = [],
}) {
  // 화면 렌더링할 때마다 옵션 무작위 배치
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  const [shuffledOptions] = useState(() =>
    shuffle(
      Object.values(RETROSPECT_DATA)
        .flat()
        .map((label) => ({
          key: `$values-${label}`,
          label,
          value: Object.keys(RETROSPECT_DATA).find((key) =>
            RETROSPECT_DATA[key].includes(label),
          ),
        })),
    ),
  );

  const itemsToRender =
    mode === 'selected'
      ? selectedItems.map((item) => ({
          key: `selected-${item.value}-${item.label}`,
          label: item.label,
          value: item.value,
        }))
      : shuffledOptions;

  // 선택 옵션 관리
  const [selectedOption, setSelectedOption] = useState(new Set());

  // 토글
  const toggle = (key) => {
    setSelectedOption((prev) => {
      const next = new Set(prev || []);
      next.has(key) ? next.delete(key) : next.add(key);

      const selectedItems = shuffledOptions
        .filter((option) => next.has(option.key))
        .map(({ value, label }) => ({ value, label }));

      onChange?.(selectedItems);
      // 선택한 항목 반환
      return next;
    });
  };

  return (
    <RemindOptionContainer>
      {itemsToRender.map((option) => {
        const isSelected =
          mode === 'selected' ? true : selectedOption?.has(option.key);
        const state = isSelected ? option.value : 'default';

        return (
          <Pill
            key={option.key}
            variant={isSelected ? 'filled' : 'outlined'}
            size="medium"
            backgroundColor={
              state === 'positive'
                ? '#FA8C8C'
                : state === 'neutral'
                  ? '#8FDF88'
                  : state === 'negative'
                    ? '#8CB7EF'
                    : '#FFFFFF'
            }
            onClick={() => mode === 'select' && toggle(option.key)}
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
