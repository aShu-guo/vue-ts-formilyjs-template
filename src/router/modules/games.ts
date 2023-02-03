import { RouteRecordRaw } from 'vue-router';
import IconFont from '/@/components/icon-font/index.vue';

export const GamesRoutes = {
  Calculator: {
    path: '/calculator',
    name: 'Calculator',
  },
  UndergroundCastle: {
    // 地下城堡3计算器
    path: '/calculator/underground-castle',
    name: 'UndergroundCastle',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...GamesRoutes.Calculator,
    component: () => import('/@/layouts/blank-layout/index.vue'),
    redirect: GamesRoutes.UndergroundCastle.path,
    meta: {
      title: '游戏伤害计算器',
      icon: h(IconFont, { type: 'icon-jisuanqi' }),
    },
    children: [
      {
        ...GamesRoutes.UndergroundCastle,
        component: () => import('/@/pages/games/underground-castle/index.vue'),
        meta: {
          title: '地下城堡3',
        },
      },
    ],
  },
];

export default routes;
