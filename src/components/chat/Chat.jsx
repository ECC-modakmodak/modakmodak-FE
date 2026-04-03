import {
  ChatCloseButton,
  ChatContainer,
  ChatInput,
  ChatInputContainer,
  ChatSendButton,
} from '../../styles/Chat.style';
import ChatClose from '../../assets/svg/chat-close.svg';
import ChatSend from '../../assets/svg/chat-send-default.svg';
import ChatSending from '../../assets/svg/chat-send-ing.svg';
import { useState } from 'react';

export default function Chat({ onClose }) {
  const [message, setMessage] = useState('');

  return (
    <ChatContainer>
      {/* 닫기 */}
      <ChatCloseButton onClick={onClose}>
        <img src={ChatClose} alt="Close" />
      </ChatCloseButton>
      {/* 채팅창 내용 */}
      {/* 입력창 */}
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ChatSendButton>
          {message ? (
            <img src={ChatSending} alt="Sending" />
          ) : (
            <img src={ChatSend} alt="Send" />
          )}
        </ChatSendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
}
