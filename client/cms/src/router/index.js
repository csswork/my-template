import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Dashboard.vue'),
    meta: {
      heading: '首页',
      requiresAuth: true
    }
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
  //   meta: {
  //     heading: '登录',
  //     requiresAuth: false
  //   }
  // },
];

let base_url = '/cms/';

const router = createRouter({
  // history: createWebHashHistory(base_url),
  history: createWebHistory(base_url),
  routes
});

export default router;
