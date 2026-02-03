import { PillShape } from './PillShape.jsx';
import styled from '@emotion/styled';

const GoalTextArea = styled.textarea`
  ${PillShape}

  field-sizing: content;
  min-width: 30px;
  max-width: 250px;
  min-height: 40px;

  display: block;
  outline: none;
  resize: none;
  text-align: center;
  font: inherit;
  line-height: 1.1;
  border-radius: 20px;

  box-sizing: border-box;
  height: auto;
  overflow: hidden;

  flex-shrink: 0;

  word-break: keep-all;
  overflow-wrap: anywhere;

  &::placeholder {
    color: inherit;
  }

  padding: 8px 15px;
  font-size: 20px;

  ${({ variant }) => {
    if (variant === 'default') {
      return `
        color: #D9695C;
        background-color: #fff;
        border: 1px solid #D9695C;
      `;
    } else if (variant === 'completed') {
      return `
        color: #fff;
        background-color: #D9695C;
        border: none;
      `;
    }
  }}
`;

export default function Goal({
  value,
  completed,
  placeholder = '어떤 목표를 이루어볼까요?',
  onChange,
  onComplete,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (!value.trim()) return;
    onComplete?.(value);
    e.currentTarget.blur();
  };

  return (
    <GoalTextArea
      value={value}
      onChange={onChange}
      variant={completed ? 'completed' : 'default'}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      {...props}
    />
  );
}
