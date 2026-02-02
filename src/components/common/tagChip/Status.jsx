import Pill from './Pill';

const STATUS_DATA = {
  hi: { label: '🔥안녕하세요', backgroundColor: '#FF9B9B' },
  niceToMeet: { label: '🖐🏻반가워요', backgroundColor: '#9BB9FF' },
  cheerUp: { label: '📢파이팅', backgroundColor: '#F6A2ED' },
  workingHard: { label: '💡열심히 할게요', backgroundColor: '#90DF93' },
  onMyWay: { label: '🏃🏻가고 있어요', backgroundColor: '#B89BFF' },
  tired: { label: '😪피곤해요', backgroundColor: '#89D9C5' },
  needHelp: { label: '🙋🏻도와주세요', backgroundColor: '#87E0F4' },
  runningLate: { label: '💦늦게 도착해요', backgroundColor: '#F6BE73' },
  goodJob: { label: '🤗고생했어요', backgroundColor: '#6F7ED6' },
};

export default function Status({ type }) {
  const status = STATUS_DATA[type] || {};
  return (
    <Pill
      variant="filled"
      size="medium"
      backgroundColor={status.backgroundColor}
    >
      {status.label}
    </Pill>
  );
}
