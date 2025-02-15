// Usage: import FormatNumber from 'utils/FormatNumber'
// 1000 => 1k
// 1000000 => 1M
// 1000000000 => 1G
// 1000000000000 => 1T

export default (num, digits, is_comma = false) => {
  if (is_comma) {
    if (num.toString().indexOf('.') !== -1) {
      var b = num.toLocaleString();
      return b;
    } else {
      var c = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      return c;
    }
  } else {
    var si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
  }
}
