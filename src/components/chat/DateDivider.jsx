import {
  ChatDateDivider,
  ChatDateDividerContainer,
} from '../../styles/Chat.style';

export const DateDivider = ({ date }) => {
  return (
    <ChatDateDividerContainer>
      <ChatDateDivider>
        <span>{date}</span>
      </ChatDateDivider>
    </ChatDateDividerContainer>
  );
};
