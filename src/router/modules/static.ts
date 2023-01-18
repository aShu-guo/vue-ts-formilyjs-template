import { RouteRecordRaw } from 'vue-router';

/**
 * 静态路由表
 */
export const StaticRoutes = {
  Login: { path: '/user/login', name: 'Login' },
  NoAuthentication: { path: '/403', name: 'NoAuthentication' },
  ServerError: { path: '/500', name: 'ServerError' },
};

/**
 * 404单独导出
 */
export const NotFound = { path: '/:path(.*)', name: 'NotFound' };
export const NotFountRoutes = [
  {
    ...NotFound,
    component: () => import('/@/pages/empty/404.vue'),
  },
];

const routes: RouteRecordRaw[] = [
  {
    ...StaticRoutes.Login,
    component: () => import('/@/pages/login/index.vue'),
  },
  {
    ...StaticRoutes.NoAuthentication,
    component: () => import('/@/pages/empty/403.vue'),
  },

  {
    ...StaticRoutes.ServerError,
    component: () => import('/@/pages/empty/500.vue'),
  },
];

export default routes;
