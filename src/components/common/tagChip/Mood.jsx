import Pill from './Pill';

export function Chatty() {
  return (
    <Pill variant="mood" state="chatty" style={{ cursor: 'default' }}>
      #도란도란
    </Pill>
  );
}

export function Quiet() {
  return (
    <Pill variant="mood" state="quiet" style={{ cursor: 'default' }}>
      #조용히
    </Pill>
  );
}
