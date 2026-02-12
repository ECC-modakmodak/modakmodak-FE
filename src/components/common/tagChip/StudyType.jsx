import Pill from './Pill';

const STUDY_TYPE_DATA = {
  CAFE: { label: '#카공', backgroundColor: 'rgba(113, 54, 233, 0.55)' },
  ZOOM: { label: '#줌공', backgroundColor: 'rgba(250, 48, 75, 0.55)' },
  OTHER: { label: '#기타', backgroundColor: 'rgba(38, 172, 255, 0.55)' },
};

export default function StudyType({ type, size = 'small' }) {
  const studyType = STUDY_TYPE_DATA[type] || {};
  return (
    <Pill
      variant="filled"
      size={size}
      backgroundColor={studyType.backgroundColor}
      style={{ cursor: 'default' }}
    >
      {studyType.label}
    </Pill>
  );
}
