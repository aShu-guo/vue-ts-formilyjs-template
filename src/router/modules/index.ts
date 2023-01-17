import PatrolLogRoutesRecord from '/@/router/modules/patrol-log';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '/@/layouts/base-layout/index.vue';
import HomeRoutesRecord, { HomeRoutes } from '/@/router/modules/home';
import BigFormRoutesRecord from '/@/router/modules/big-form';
import OpenLayerDemoRoutes from '/@/router/modules/openlayer';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'base-layout',
    component: BaseLayout,
    redirect: HomeRoutes.HomePage.path,
    children: [...HomeRoutesRecord, ...PatrolLogRoutesRecord, ...BigFormRoutesRecord, ...OpenLayerDemoRoutes],
  },
];

export default routes;
