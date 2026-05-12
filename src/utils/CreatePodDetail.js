// CreatePodDetail.jsx 에서 사용할 함수들

import POD_IMAGES from '../components/pod/PodImg';

export const isValidDateTimeFormat = (date, time) => {
  const dateRegex = /^\d{1,2}\/\d{1,2}$/; // M/D 또는 MM/DD
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // 00:00 ~ 23:59 (24시간제)

  return dateRegex.test(date) && timeRegex.test(time);
};

export const getRandomPodImage = () => {
  const index = Math.floor(Math.random() * POD_IMAGES.length);
  return POD_IMAGES[index];
};

export const buildIsoDateTime = (md, time) => {
  // md: "1/23", time: "23:00"
  const [m, d] = md.split('/').map(Number);
  const [hh, mm] = time.split(':').map(Number);

  // 년도 구별
  const now = new Date();
  const currentYear = now.getFullYear();

  // 1 -> 01 로 맞춤
  const pad = (n) => n.toString().padStart(2, '0');

  // 올해 기준 날짜 생성
  const targetThisYear = new Date(
    currentYear,
    m - 1, // JS month는 0부터 시작
    d,
    hh,
    mm,
  );

  // 오늘보다 과거면 -> 내년날짜로
  const finalYear = targetThisYear < now ? currentYear + 1 : currentYear;

  return `${finalYear}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}`;
};
