import { RouteRecordRaw } from 'vue-router';

export const PatrolLogRoutes = {
  PatrolLog: {
    path: '/patrol-log',
    name: 'PatrolLog',
  },
  PatrolLogReport: {
    path: '/patrol-log/report',
    name: 'PatrolLogReport',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...PatrolLogRoutes.PatrolLog,
    component: () => import('/@/layouts/none-home-layout/index.vue'),
    meta: { title: '巡查事件' },
    redirect: PatrolLogRoutes.PatrolLogReport.path,
    children: [
      {
        ...PatrolLogRoutes.PatrolLogReport,
        component: () => import('/@/pages/patrol-log/collect/index.vue'),
      },
    ],
  },
];

export default routes;
