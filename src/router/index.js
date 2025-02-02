import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
    meta: {
      heading: 'Home',
      requiresAuth: true
    }
  },
];

let base_url = '/';

const router = createRouter({
  history: createWebHistory(base_url),
  routes
});

// router.beforeEach((to, from, next) => {
//   const token = window.localStorage.getItem('token');
//   const redirectPath = window.localStorage.getItem('redirectPath');

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!token) {
//       window.localStorage.setItem('redirectPath', to.fullPath);
//       next({ path: '/login' });
//     } else {
//       next();
//     }
//   } 
//   else if( to.matched.some(record => record.meta.login) ){ 
//     // 已登錄要自動轉home page(註冊頁註冊一半會拿到token,另外處理)
//     if (token) {
//       next({ path:  redirectPath || '/' });
//     } else {
//       next();
//     }
//   } 
//   else {
//     next();
//   }
// });

export default router;
