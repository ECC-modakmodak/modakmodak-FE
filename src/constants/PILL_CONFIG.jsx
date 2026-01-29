const PILL_SIZES = {
  today: {
    padding: '2px 15px',
    fontSize: '24px',
  },
  large: {
    padding: '9px 22px',
    fontSize: '20px',
  },
  medium: {
    padding: '8px 15px',
    fontSize: '20px',
  },
  small: {
    padding: '3px 8px',
    fontSize: '14px',
  },
};

export const PILL_CONFIG = {
  sizes: {
    goal: PILL_SIZES.medium,
    badge: PILL_SIZES.large,
    remind: PILL_SIZES.large,
    mood: PILL_SIZES.small,
    type: PILL_SIZES.small,
    today: PILL_SIZES.today,
  },
  styles: {
    goal: {
      default: { bg: '#fff', color: '#D9695C', border: '1px solid #D9695C' },
      completed: { bg: '#D9695C', color: '#fff' },
    },
    badge: {
      hi: { bg: '#FF9B9B' },
      niceToMeet: { bg: '#9BB9FF' },
      cheerUp: { bg: '#F6A2ED' },
      workingHard: { bg: '#90DF93' },
      onMyWay: { bg: '#B89BFF' },
      tired: { bg: '#89D9C5' },
      needHelp: { bg: '#87E0F4' },
      runningLate: { bg: '#F6BE73' },
      goodJob: { bg: '#6F7ED6' },
    },
    remind: {
      default: { bg: '#fff', color: '#D9695C', border: '1px solid #D9695C' },
      positive: { bg: '#FA8C8C' },
      neutral: { bg: '#8FDF88' },
      negative: { bg: '#8CB7EF' },
    },
    mood: {
      chatty: { bg: '#26ACFF' },
      quiet: { bg: '#4AC621' },
    },
    type: {
      cafe: { bg: '#7136E9' },
      zoom: { bg: '#FA304B' },
      cam: { bg: '#FF9A26' },
      other: { bg: '#26ACFF' },
    },
    today: { bg: '#fff', color: '#D9695C', border: '1px solid #D9695C' },
  },
};
