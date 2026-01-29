import Pill from './Pill';

export default function Today({ label }) {
  return (
    <Pill variant="today" state="default" style={{ cursor: 'default' }}>
      {label}
    </Pill>
  );
}
