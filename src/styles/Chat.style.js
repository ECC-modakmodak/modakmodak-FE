import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

// 플로팅 버튼
export const ChatFloatingButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  background-color: #d9695c;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  img {
    width: 60px;
    height: 60px;
  }

  &:hover {
    background-color: #c14f4a;
  }
`;

export const ChatGuide = styled.div`
  position: absolute;
  bottom: 65px;
  right: 135px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 15px 50px 18px 40px;
  align-items: center;
  z-index: 1000;
  animation:
    ${fadeIn} 0.5s ease-out,
    ${fadeOut} 0.5s ease-out 4.5s forwards;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

// 채팅창
export const ChatContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.25);
  padding: 30px 35px;
`;

export const ChatCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: 14px;
`;

export const ChatInput = styled.input`
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 100px;
  background-color: #efefef;
  padding-inline: 25px;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

export const ChatSendButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
