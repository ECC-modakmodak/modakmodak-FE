import Pill from './Pill';

const STUDY_TYPE_DATA = {
  cafe: { label: '#카공', backgroundColor: 'rgba(113, 54, 233, 0.55)' },
  zoom: { label: '#줌공', backgroundColor: 'rgba(250, 48, 75, 0.55)' },
  cam: { label: '#캠스터디', backgroundColor: 'rgba(255, 154, 38, 0.55)' },
  other: { label: '#기타', backgroundColor: 'rgba(38, 172, 255, 0.55)' },
};

export default function StudyType({ type }) {
  const studyType = STUDY_TYPE_DATA[type] || {};
  return (
    <Pill
      variant="filled"
      size="small"
      backgroundColor={studyType.backgroundColor}
      style={{ cursor: 'default' }}
    >
      {studyType.label}
    </Pill>
  );
}
