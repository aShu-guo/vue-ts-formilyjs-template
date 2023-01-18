import { RouteRecordRaw } from 'vue-router';
import IconFont from '/@/components/icon-font/index.vue';

export const OpenLayerDemoRoutes = {
  Demo: {
    path: '/open-layer',
    name: 'OpenLayer',
  },
  One: {
    path: '/open-layer/one',
    name: 'OpenLayerOne',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...OpenLayerDemoRoutes.One,
    component: () => import('/@/pages/openlayers/one.vue'),
    meta: {
      title: 'openlayers示例',
      icon: h(IconFont, { type: 'icon-code' }),
    },
  },
];

export default routes;
