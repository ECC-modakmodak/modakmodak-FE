import { ChatDateDivider } from '../../styles/Chat.style';

export const DateDivider = ({ date }) => {
  return (
    <ChatDateDivider>
      <span>{date}</span>
    </ChatDateDivider>
  );
};
