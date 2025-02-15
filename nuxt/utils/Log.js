export default (color = 'blue', message = '', ...args) => {
  const urlParams = new URLSearchParams(window.location.search);
  const isDev = urlParams.get('dev') === 'true'
  if (process.env.NODE_ENV === 'development' || isDev) {
    if (message === '') {
      console.log(`%c${color}`, `color: ${color}; font-weight: bold;`, ...args);
    } else {
      console.log(`%c${message}`, `color: ${color}; font-weight: bold;`, ...args);
    }
    
  }
}