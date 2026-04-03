import { Fragment, useEffect, useRef } from 'react';
import ChatItem from './ChatItem';
import { DateDivider } from './DateDivider';
import { ChatListContainer } from '../../styles/Chat.style';

export default function ChatList({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!Array.isArray(messages)) {
    return <div ref={scrollRef}>메시지를 불러오는 중입니다...</div>;
  }

  return (
    <ChatListContainer ref={scrollRef}>
      {messages.map((msg, index) => {
        const isNewDay =
          index === 0 ||
          (msg.createdAt &&
            messages[index - 1]?.createdAt &&
            msg.createdAt.split('T')[0] !==
              messages[index - 1].createdAt.split('T')[0]);

        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];

        const curTime = msg.createdAt?.substring(0, 16);
        const prevTime = prevMsg?.createdAt?.substring(0, 16);
        const nextTime = nextMsg?.createdAt?.substring(0, 16);

        const isFirst =
          index === 0 ||
          isNewDay ||
          prevMsg?.senderId !== msg.senderId ||
          prevTime !== curTime;

        const isLast =
          !nextMsg || nextMsg.senderId !== msg.senderId || nextTime !== curTime;

        return (
          <Fragment key={msg.id} style={{ width: '100%', height: '100%' }}>
            {isNewDay && (
              <DateDivider date={formatDividerDate(msg.createdAt)} />
            )}
            <ChatItem message={msg} isFirst={isFirst} isLast={isLast} />
          </Fragment>
        );
      })}
    </ChatListContainer>
  );
}

// 날짜 포맷팅
const formatDividerDate = (dateString) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
};
