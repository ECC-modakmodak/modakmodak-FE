import { useState } from 'react';
import styled from '@emotion/styled';

export default function Toggle() {
  const [on, setOn] = useState(true);

  return (
    <ToggleWrapper>
      <ToggleText $on={on}>
        알림 <span>{on ? 'ON' : 'OFF'}</span>
      </ToggleText>
      <Switch $on={on} onClick={() => setOn(!on)}>
        <Thumb $on={on} />
      </Switch>
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  padding-top: 2px;
  padding-right: 5px;
`;

const ToggleText = styled.span`
  font-size: 16px;

  span {
    font-weight: 600;
  }
`;

const Switch = styled.div`
  width: 35px;
  height: 20px;
  background-color: ${(props) => (props.$on ? '#000000' : '#828282')};
  border-radius: 100px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
`;

const Thumb = styled.div`
  width: 14px;
  height: 14px;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: ${(props) => (props.$on ? '18px' : '3px')};
  transition: left 0.3s ease;
`;
