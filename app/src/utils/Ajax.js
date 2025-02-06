import Axios from 'axios';

// console.log(import.meta.env.MODE);
// For mode development or production
// https://vite.dev/guide/env-and-mode
const mode = import.meta.env.MODE;
const ajax_url = 'http://haibo.me';


const headers = {};
headers.Accept = 'application/json';
headers['Content-Type'] = 'application/json';
// headers['withCredentials'] = true;

const ajax = Axios.create({
    baseURL: ajax_url,
    headers: headers,
    withCredentials: true,
});


export default ajax;