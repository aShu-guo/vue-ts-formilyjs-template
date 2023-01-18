import { RouteRecordRaw } from 'vue-router';

export const HomeRoutes = {
  HomePage: {
    path: '/home',
    name: 'HomePage',
  },
  HomeIndex: {
    path: '/home/index',
    name: 'HomeIndex',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...HomeRoutes.HomePage,
    component: () => import('/@/layouts/home-layout/index.vue'),
    redirect: HomeRoutes.HomeIndex.path,
    meta: {
      modifier: 'some',
      roles: ['admin', 'staff'],
    },
    children: [
      {
        ...HomeRoutes.HomeIndex,
        component: () => import('/@/pages/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
    ],
  },
];

export default routes;
