import { RouteRecordRaw } from 'vue-router';
import IconFont from '/@/components/icon-font/index.vue';

export const BigFormRoutes = {
  Demo: {
    path: '/demo',
    name: 'Demo',
  },
  Add: {
    path: '/demo/add',
    name: 'Add',
  },
  Edit: {
    path: '/demo/edit',
    name: 'Edit',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...BigFormRoutes.Demo,
    component: () => import('/@/layouts/blank-layout/index.vue'),
    redirect: BigFormRoutes.Add.path,
    meta: {
      title: 'formily示例',
      icon: h(IconFont, { type: 'icon-integral' }),
    },
    children: [
      {
        ...BigFormRoutes.Add,
        component: () => import('/@/pages/big-form/add.vue'),
        meta: {
          title: '新增',
        },
      },
      {
        ...BigFormRoutes.Edit,
        component: () => import('/@/pages/big-form/edit.vue'),
        meta: {
          title: '编辑',
        },
      },
    ],
  },
];

export default routes;
