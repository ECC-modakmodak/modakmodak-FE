import { PILL_CONFIG } from '../../../constants/PILL_CONFIG.jsx';
import { PillShape } from './PillShape.jsx';
import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';

const GoalTextArea = styled.textarea`
  ${PillShape}

  display: block;
  outline: none;
  resize: none;
  text-align: center;

  box-sizing: border-box;
  height: auto;
  overflow: hidden;

  flex-shrink: 0;

  word-break: keep-all;
  overflow-wrap: anywhere;

  &::placeholder {
    color: inherit;
  }
`;

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

export default function Goal({
  value,
  completed,
  placeholder = '어떤 목표를 이루어볼까요?',
  onChange,
  onComplete,
  ...props
}) {
  const state = completed ? 'completed' : 'default';
  const size = PILL_CONFIG.sizes.goal;
  const style = PILL_CONFIG.styles.goal[state];

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (!value.trim()) return;
    onComplete?.(value);
    e.currentTarget.blur();
  };

  // 입력값에 따라 Pill 크기 조절
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    const t = textareaRef.current;
    const m = measureRef.current;
    if (!t || !m) return;

    // value or placeholder 기준 width
    const baseText = value?.length ? value : placeholder;
    m.textContent = baseText;

    // 측정용 span을 textarea와 동일하게
    const cs = window.getComputedStyle(t);
    m.style.fontSize = cs.fontSize;
    m.style.fontFamily = cs.fontFamily;
    m.style.fontWeight = cs.fontWeight;
    m.style.letterSpacing = cs.letterSpacing;
    m.style.padding = cs.padding;

    const pl = parseFloat(cs.paddingLeft);
    const pr = parseFloat(cs.paddingRight);

    const textW = m.scrollWidth;
    const nextW = clamp(textW + pl + pr, 30, 300);
    const finalW = value ? nextW : 300;

    t.style.width = `${finalW}px`;

    // 한 줄 / 두 줄 높이 조절
    t.style.height = '0px';
    const lineHeight = parseFloat(cs.lineHeight);
    const pt = parseFloat(cs.paddingTop);
    const pb = parseFloat(cs.paddingBottom);

    const oneLine = lineHeight * 1 + pt + pb;
    const twoLine = lineHeight * 2 + pt + pb;

    // 내용 높이를 1~2줄로
    const nextH = clamp(t.scrollHeight, oneLine, twoLine);
    t.style.height = `${nextH}px`;
  }, [value, placeholder]);

  return (
    <>
      <GoalTextArea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        $padding={size.padding}
        $fontSize={size.fontSize}
        $bg={style.bg}
        $color={style.color}
        $border={style.border}
        {...props}
      />
      {/* 너비 측정용 요소 */}
      <span
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto',
          whiteSpace: 'pre',
        }}
      />
    </>
  );
}
