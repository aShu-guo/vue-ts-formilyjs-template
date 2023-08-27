import { RouteRecordRaw } from 'vue-router';
import HomeRoutesRecord, { HomeRoutes } from '/@/router/modules/home';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('/@/layouts/base-layout/index.vue'),
    redirect: HomeRoutes.HomeIndex.path,
    children: [...HomeRoutesRecord],
  },
];

export default routes;
