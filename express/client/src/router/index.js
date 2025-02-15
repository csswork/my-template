import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
    meta: {
      heading: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: "explore" */ '../views/ExplorePage.vue'),
    meta: {
      heading: '探索',
      requiresAuth: false
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import(/* webpackChunkName: "personal" */ '../views/PersonalPage.vue'),
    meta: {
      heading: '个人主页',
      requiresAuth: true
    }
  },
  {
    path: '/asset',
    name: 'asset',
    component: () => import(/* webpackChunkName: "asset" */ '../views/AssetPage.vue'),
    meta: {
      heading: '资产',
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue'),
    meta: {
      heading: '注册',
      requiresAuth: false
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue'),
    meta: {
      heading: '登录',
      requiresAuth: false
    }
  },
];

let base_url = '/';

const router = createRouter({
  // history: createWebHashHistory(base_url),
  history: createWebHistory(base_url),
  routes
});

export default router;
