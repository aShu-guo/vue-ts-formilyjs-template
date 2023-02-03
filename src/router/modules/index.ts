import { RouteRecordRaw } from 'vue-router';
import HomeRoutesRecord, { HomeRoutes } from '/@/router/modules/home';
import BigFormRoutesRecord from '/@/router/modules/big-form';
import OpenLayerDemoRoutes from '/@/router/modules/openlayer';
import GamesRoutes from '/@/router/modules/games';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base-layout',
    component: () => import('/@/layouts/base-layout/index.vue'),
    redirect: HomeRoutes.HomeIndex.path,
    children: [...HomeRoutesRecord, ...BigFormRoutesRecord, ...OpenLayerDemoRoutes, ...GamesRoutes],
  },
];

export default routes;
