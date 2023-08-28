import { RouteRecordRaw } from 'vue-router';
import HomeRoutesRecord, { HomeRoutes } from '/@/router/modules/home';
import UsersRouterRecord from '/@/router/modules/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('/@/layouts/base-layout/index.vue'),
    redirect: HomeRoutes.HomeIndex.path,
    children: [...HomeRoutesRecord, ...UsersRouterRecord],
  },
];

export default routes;
