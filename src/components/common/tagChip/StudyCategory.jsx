import Pill from './Pill';

const STUDY_CATEGORY_DATA = {
  EXAMS: { label: '#시험대비', backgroundColor: 'rgba(255, 187, 13, 0.55)' },
  PROJECTS: {
    label: '#과제·팀플',
    backgroundColor: 'rgba(0, 159, 40, 0.55)',
  },
  CODING: { label: '#프로그래밍', backgroundColor: 'rgba(255, 72, 0, 0.55)' },
  LANGUAGES: { label: '#어학', backgroundColor: 'rgba(66, 204, 155, 0.55)' },
  CERTS: { label: '#자격증', backgroundColor: 'rgba(255, 9, 13, 0.55)' },
  JOBS: { label: '#취업준비', backgroundColor: 'rgba(34, 67, 251, 0.55)' },
  READING: { label: '#독서', backgroundColor: 'rgba(255, 114, 231, 0.55)' },
  GROWTH: { label: '#자기계발', backgroundColor: 'rgba(165, 165, 165, 0.55)' },
};

export default function StudyCategory({ type, size = 'small' }) {
  const studyCategory = STUDY_CATEGORY_DATA[type] || {};
  return (
    <Pill
      variant="filled"
      size={size}
      backgroundColor={studyCategory.backgroundColor}
      style={{ cursor: 'default' }}
    >
      {studyCategory.label}
    </Pill>
  );
}
