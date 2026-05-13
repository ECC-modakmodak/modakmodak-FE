import {
  ChatTime,
  HostIconWrapper,
  MyChatBubble,
  OtherChatBubble,
  OtherChatContainer,
  OtherChatContent,
  OtherChatProfile,
  ProfileImage,
  ProfileWrapper,
} from '../../styles/Chat.style';

export default function ChatItem({ message, isFirst, isLast }) {
  const myId = Number(localStorage.getItem('myId'));
  const isMe = message.senderId === myId;

  const displayTime = (() => {
    if (!message.createdAt) return '';

    const dateStr = message.createdAt.endsWith('Z')
      ? message.createdAt
      : message.createdAt + 'Z';

    const date = new Date(dateStr);

    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  })();

  console.log('ChatItem 렌더링:', {
    message,
    isFirst,
    isLast,
  });

  return (
    <>
      {isMe ? (
        <MyChatBubble>
          {isLast && <ChatTime>{displayTime}</ChatTime>}
          <div>{message.message}</div>
        </MyChatBubble>
      ) : (
        <OtherChatContainer>
          <OtherChatProfile>
            {isFirst ? (
              <ProfileWrapper>
                <ProfileImage
                  src={
                    message.senderProfileImageUrl ||
                    '/images/profile_default.png'
                  }
                  alt="프로필"
                />
                {message.isHost && (
                  <HostIconWrapper>
                    <img src="/pod/pod-host.svg" alt="팟장 아이콘" />
                  </HostIconWrapper>
                )}
              </ProfileWrapper>
            ) : (
              <div style={{ width: '60px' }} />
            )}
          </OtherChatProfile>
          <OtherChatContent>
            {isFirst && <p>{message.senderNickname}</p>}
            <OtherChatBubble>
              <div>{message.message}</div>
              {isLast && <ChatTime>{displayTime}</ChatTime>}
            </OtherChatBubble>
          </OtherChatContent>
        </OtherChatContainer>
      )}
    </>
  );
}
