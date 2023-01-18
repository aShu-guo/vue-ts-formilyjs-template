import { RouteRecordRaw } from 'vue-router';
import IconFont from '/@/components/icon-font/index.vue';

export const HomeRoutes = {
  HomeIndex: {
    path: '/home/index',
    name: 'HomeIndex',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...HomeRoutes.HomeIndex,
    component: () => import('/@/pages/home/index.vue'),
    meta: {
      title: '首页',
      modifier: 'some',
      roles: ['admin', 'staff'],
      icon: h(IconFont, { type: 'icon-all' }),
    },
  },
];

export default routes;
