import Pill from './Pill';

export default function Today({ content }) {
  return (
    <Pill variant="outlined" size="large" style={{ cursor: 'default' }}>
      {content}
    </Pill>
  );
}
