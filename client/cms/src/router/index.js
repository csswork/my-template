import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      heading: '个人中心',
      menu: 'dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      heading: '首页设置',
      menu: 'home',
      requiresAuth: true
    }
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
    meta: {
      heading: '作品管理',
      menu: 'posts',
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: {
      heading: '用户管理',
      menu: 'users',
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: {
      heading: '用户管理',
      menu: 'users',
      requiresAuth: true
    }
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import(/* webpackChunkName: "payments" */ '../views/Payments.vue'),
    meta: {
      heading: '充值管理',
      menu: 'payments',
      requiresAuth: true
    }
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import(/* webpackChunkName: "notifications" */ '../views/Notifications.vue'),
    meta: {
      heading: '通知管理',
      menu: 'notifications',
      requiresAuth: true
    }
  },
  {
    path: '/invitations',
    name: 'invitations',
    component: () => import(/* webpackChunkName: "invitations" */ '../views/Invitations.vue'),
    meta: {
      heading: '邀请管理',
      menu: 'invitations',
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      heading: '系统设置',
      menu: 'settings',
      requiresAuth: true
    }
  },
  {
    path: '/settings/:type',
    name: 'sub-settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      heading: '系统设置',
      menu: 'settings',
      requiresAuth: true
    }
  },
];

let base_url = '/cms/';

const router = createRouter({
  history: createWebHashHistory(base_url),
  // history: createWebHistory(base_url),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
