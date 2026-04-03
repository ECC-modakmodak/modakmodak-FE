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
import { useEffect, useRef, useState } from 'react';
import ChatList from './ChatList';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import { fetchChats } from '../../api/chat';

export default function ChatRoom({ myId, member, isHost, onClose }) {
  const { podId } = useParams(); // URL에서 podId 추출
  const chatUrl = `https://modakmodak-be.onrender.com/ws-stomp`;
  const stompClient = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // SockJS 연결
    const socket = new SockJS(chatUrl);
    stompClient.current = Stomp.over(socket);

    // 연결 시작
    stompClient.current.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame);

        // 채팅방 구독
        stompClient.current.subscribe(`/sub/chat/room/${podId}`, (msg) => {
          const newMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      },
      (error) => {
        console.error('Connection error: ', error);
      },
    );

    return () => {
      // 연결 해제
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, [podId, chatUrl]);

  useEffect(() => {
    async function getMessages() {
      try {
        const chats = await fetchChats(podId);
        setMessages(chats);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    getMessages();
  }, [podId]);

  // 메시지 전송
  const sendMessage = () => {
    if (message.trim() && stompClient.current) {
      const newMessage = {
        meetingId: podId,
        senderId: myId,
        senderNickname: member?.nickname,
        isHost: isHost,
        message: message.trim(),
      };

      stompClient.current.send(
        `/pub/chat/message`,
        {},
        JSON.stringify(newMessage),
      );
      setMessage('');
    }
  };

  return (
    <ChatContainer>
      {/* 닫기 */}
      <ChatCloseButton onClick={onClose}>
        <img src={ChatClose} alt="Close" />
      </ChatCloseButton>
      {/* 채팅창 내용 */}
      <ChatList messages={messages} />
      {/* 입력창 */}
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ChatSendButton onClick={sendMessage} disabled={!message.trim()}>
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
