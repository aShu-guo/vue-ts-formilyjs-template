import { RouteRecordRaw } from 'vue-router';

/**
 * 静态路由表
 */
export const StaticRoutes = {
  Login: { path: '/user/login', name: 'Login' },
  NoAuthentication: { path: '/403', name: 'NoAuthentication' },
  ServerError: { path: '/500', name: 'ServerError' },
  NotFound: { path: '/:path(.*)', name: 'NotFound' },
};

/**
 * 404单独导出
 */
export const NotFound = { path: '/:path(.*)', name: 'NotFound' };
const routes: RouteRecordRaw[] = [
  {
    path: '/empty',
    component: () => import('/@/layouts/base-layout/index.vue'),
    children: [
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
      {
        ...NotFound,
        component: () => import('/@/pages/empty/404.vue'),
      },
    ],
  },
];

export default routes;
