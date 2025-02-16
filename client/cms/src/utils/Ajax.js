import Axios from 'axios';

// console.log(import.meta.env.MODE);
// For mode development or production
// https://vite.dev/guide/env-and-mode
const mode = import.meta.env.MODE;
const ajax_url = 'http://localhost:3001/api/';

const headers = {};
headers.Accept = 'application/json';
headers['Content-Type'] = 'application/json';
// headers['withCredentials'] = true;
const token = window.localStorage.getItem('token');
if (token !== null) {
  headers.Authorization = 'Bearer ' + token;
}

const ajax = Axios.create({
  baseURL: ajax_url,
  headers: headers,
  withCredentials: true,
});

// Global request interceptor
ajax.interceptors.request.use(
  (config) => {
    // Add token to request header
    const token = window.localStorage.getItem('token'); // Get token from local storage

    if (token) {
        // If token exists, add it to the header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// Global response interceptor
ajax.interceptors.response.use(
  // when response status is 200
  (res) => {
    // if (res.config.url === '/me') {
    //   window.creator_porta_user = res.data.data;
    // }

    return res;
  }, 

  // when response status is not 200
  (error) => {
    // check login status is expired
    console.log('error', error);
    // if (error && error.response && error.response.data && (error.response.data.message === 'System Error User is not logged in.' || error.response.data.message === 'AuthenticationException with message Unauthenticated.')) {
    //     window.localStorage.removeItem('token');
    //     window.location.replace('/login');
    // }
    
    throw error;
  }
);
export default ajax;