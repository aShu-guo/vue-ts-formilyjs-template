import { RouteRecordRaw } from 'vue-router';

export const HomeRoutes = {
  HomePage: {
    path: '/home-page',
    name: 'HomePage',
  },
  HomeUavSeat: {
    path: '/home/uav-monitor-seat',
    name: 'HomeUavMonitorSeat',
  },
} as const;

const routes: RouteRecordRaw[] = [
  {
    ...HomeRoutes.HomePage,
    component: () => import('/@/layouts/pure-layout/index.vue'),
    redirect: HomeRoutes.HomeUavSeat.path,
    children: [
      {
        ...HomeRoutes.HomeUavSeat,
        component: () => import('/@/pages/home/index.vue'),
        meta: {
          needAuth: true,
          title: '首页',
        },
      },
    ],
  },
];

export default routes;
