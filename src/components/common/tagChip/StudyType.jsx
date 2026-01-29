import Pill from './Pill';

export function Cafe() {
  return (
    <Pill variant="type" state="cafe">
      #카공
    </Pill>
  );
}

export function Zoom() {
  return (
    <Pill variant="type" state="zoom">
      #줌공
    </Pill>
  );
}

export function Cam() {
  return (
    <Pill variant="type" state="cam">
      #캠스터디
    </Pill>
  );
}

export function Other() {
  return (
    <Pill variant="type" state="other">
      #기타
    </Pill>
  );
}
