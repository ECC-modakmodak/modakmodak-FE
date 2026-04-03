import { Fragment, useEffect, useRef } from 'react';
import { ChatDateDivider } from '../../styles/Chat.style';
import ChatItem from './ChatItem';

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
    <div ref={scrollRef} style={{ overflowY: 'auto', height: '100%' }}>
      {messages.map((msg, index) => {
        const isNewDay =
          index === 0 ||
          (msg.createdAt &&
            messages[index - 1]?.createdAt &&
            msg.createdAt.split('T')[0] !==
              messages[index - 1].createdAt.split('T')[0]);
        return (
          <Fragment key={msg.id}>
            {isNewDay && (
              <ChatDateDivider>
                {msg.createdAt.split('T')[0].replace(/-/g, '. ')}
              </ChatDateDivider>
            )}
            <ChatItem message={msg.message} />
          </Fragment>
        );
      })}
    </div>
  );
}
