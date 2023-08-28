import { RouteRecordRaw } from 'vue-router';
import { RouterExtra } from '/@/router/types';
import BizIcons from '/@/components/biz-icons/index.vue';
import { Collections } from '/@/components/biz-icons/collections';

export const UsersRoutes: RouterExtra = {
  UsersIndex: {
    path: '/user/index',
    name: 'UsersIndex',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...UsersRoutes.UsersIndex,
    component: () => import('/@/pages/users/index.vue'),
    meta: {
      title: '用户管理',
      modifier: 'some',
      roles: ['admin', 'staff'],
      icon: h(BizIcons, { type: Collections.User }),
    },
  },
];

export default routes;
