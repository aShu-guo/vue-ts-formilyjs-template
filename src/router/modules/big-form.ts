import { RouteRecordRaw } from 'vue-router';

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
} as const;

const routes: RouteRecordRaw[] = [
  {
    ...BigFormRoutes.Demo,
    component: () => import('/@/layouts/pure-layout/index.vue'),
    redirect: BigFormRoutes.Add.path,
    children: [
      {
        ...BigFormRoutes.Add,
        component: () => import('/@/pages/big-form/add.vue'),
        meta: {
          needAuth: false,
          title: '新增',
        },
      },
      {
        ...BigFormRoutes.Edit,
        component: () => import('/@/pages/big-form/edit.vue'),
        meta: {
          needAuth: false,
          title: '编辑',
        },
      },
    ],
  },
];

export default routes;
