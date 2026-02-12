import Pill from './Pill';

const STUDY_MOOD_DATA = {
  CHATTY: { label: '#도란도란', backgroundColor: 'rgba(54, 78, 233, 0.55)' },
  QUIET: { label: '#조용히', backgroundColor: 'rgba(74, 198, 33, 0.55)' },
};

export default function StudyMood({ type, size = 'small' }) {
  const studyMood = STUDY_MOOD_DATA[type] || {};
  return (
    <Pill
      variant="filled"
      size={size}
      backgroundColor={studyMood.backgroundColor}
      style={{ cursor: 'default' }}
    >
      {studyMood.label}
    </Pill>
  );
}
