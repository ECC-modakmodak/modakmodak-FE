import { useEffect, useState } from 'react';
import { ChatFloatingButton, ChatGuide } from '../../styles/Chat.style';
import { useParams } from 'react-router-dom';

export default function ChatFloating() {
  const { podId } = useParams();
  const myId = localStorage.getItem('myId');

  const [showChatGuide, setShowChatGuide] = useState(() => {
    const hasVisited = sessionStorage.getItem(
      `hasVisitedChat_${myId}_${podId}`,
    );
    return !hasVisited;
  });

  useEffect(() => {
    if (showChatGuide) {
      sessionStorage.setItem(`hasVisitedChat_${myId}_${podId}`, 'true');
      const timer = setTimeout(() => {
        setShowChatGuide(false);
      }, 5000); // 5초 후에 가이드 숨김
      return () => clearTimeout(timer);
    }
  }, [showChatGuide, myId, podId]);

  return (
    <>
      {showChatGuide && (
        <ChatGuide>
          <img src="/src/assets/svg/chat-guide.svg" alt="Chat Guide" />
          팟원들과 대화를 나누어보세요!
        </ChatGuide>
      )}
      <ChatFloatingButton>
        <img src="/src/assets/svg/chat.svg" alt="Chat" />
      </ChatFloatingButton>
    </>
  );
}
