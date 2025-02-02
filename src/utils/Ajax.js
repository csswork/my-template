import Axios from 'axios';

// console.log(import.meta.env.MODE);
// For mode development or production
// https://vite.dev/guide/env-and-mode
const mode = import.meta.env.MODE;
let ajax_url = '';

if (import.meta.env.VUE_APP_API && import.meta.env.VUE_APP_API === 'local') {
    ajax_url = 'https://www.creator.qa.anchor.store:8443/api/v1';
} else if (mode === 'development') {
    ajax_url = 'https://www.creator.qa.anchor.store/api/v1';
} else {
    ajax_url = '/api/v1';
}

const headers = {};
headers.Accept = 'application/json';
headers['Content-Type'] = 'application/json';
const token = window.localStorage.getItem('token');
if (token !== null) {
    headers.Authorization = 'Bearer ' + token;
}

const ajax = Axios.create({
    baseURL: ajax_url,
    headers: headers,
    withCredentials: true,
});

//動態更動token
ajax.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token'); //最新的 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

ajax.interceptors.response.use((response) => response, (error) => {
    // check login status is expired
    if (error && error.response && error.response.data && (error.response.data.message === 'System Error User is not logged in.' || error.response.data.message === 'AuthenticationException with message Unauthenticated.')) {
        window.localStorage.removeItem('token');
        window.location.replace('/login');
    }

    throw error;
});


export default ajax;