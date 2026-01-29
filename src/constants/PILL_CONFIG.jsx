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
      hi: '#FF9B9B',
      niceToMeet: '#9BB9FF',
      cheerUp: '#F6A2ED',
      workingHard: '#90DF93',
      onMyWay: '#B89BFF',
      tired: '#89D9C5',
      needHelp: '#87E0F4',
      runningLate: '#F6BE73',
      goodJob: '#6F7ED6',
    },
    remind: {
      default: { bg: '#fff', color: '#D9695C', border: '1px solid #D9695C' },
      positive: '#FA8C8C',
      neutral: '#8FDF88',
      negative: '#8CB7EF',
    },
    mood: {
      chatty: '#26ACFF',
      quiet: '#4AC621',
    },
    type: {
      cafe: '#7136E9',
      zoom: '#FA304B',
      cam: '#FF9A26',
      other: '#26ACFF',
    },
    today: { bg: '#fff', color: '#D9695C', border: '1px solid #D9695C' },
  },
};
