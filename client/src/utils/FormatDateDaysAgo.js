import moment from 'moment';

export default (date, defaultString = '---') => {
  const now = new Date();
  const past = new Date(date);
  const diffTime = Math.abs(now - past);
  const diffSeconds = Math.ceil(diffTime / 1000);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

  if (diffSeconds < 5) {
    return 'just now';
  } else if (diffSeconds < 60) {
    return diffSeconds + ' seconds ago';
  } else if (diffMinutes < 60) {
    return diffMinutes + ' minutes ago';
  } else if (diffHours < 24) {
    return diffHours + ' hours ago';
  } else if (diffDays <= 7) {
    return diffDays + ' days ago';
  } else if (diffMonths < 3) {
    return diffMonths + ' months ago';
  } else {
    if (moment(date).isValid()) {
      return moment(date).format('MMM DD, YYYY');
    } else {
      return defaultString;
    }
  }
};