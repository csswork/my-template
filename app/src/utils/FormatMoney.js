// Number or string to money format. e.g. 1000 => $1,000.00

export default (amount, sign = '$') => {
  if (!amount) return sign + '0.00';
  if (typeof amount === 'string') amount = Number(amount);
  let p = amount.toFixed(2).split('.');
  return (
    sign +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num + (num != '-' && i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}
