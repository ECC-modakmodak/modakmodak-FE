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

  const displayTime = message.createdAt?.split('T')[1]?.substring(0, 5);
  console.log('message.createdAt:', message.createdAt);

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
                <ProfileImage src="/images/img-placeholder.png" alt="프로필" />
                {message.host && (
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
