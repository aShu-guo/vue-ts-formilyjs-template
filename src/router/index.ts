/**
 * 前端校验路由级别权限大体上可以分为两种方式：
 * 1.分布式鉴权：通过路由表中的meta来区分是否需要权限或者区分需要的权限角色
 *  - 基于用户角色确定路由表
 *  - 基于meta中的needAuth确定路由表
 * 2.中心化鉴权：通过接口请求路由表，与已有的路由表匹配出最新的路由表。
 *
 * 基于登陆用户角色的路由校验策略
 *
 * 使用方式：
 * 方式一：（优点：可以在项目入口处统一判断，对用户更加友好，展示在页面上的都是用户可以访问的，更加灵活的控制用户访问权限）
 * 1.需要在路由表中的meta中标注当可以放行的角色名（例如：admin、staff）
 * 2.过滤现有路由表，并移除不符合条件的路由表构建出新的符合条件的路由表。（需要一个标识来确定已经路由表已经被过滤过了，那么每次进入路由守卫都不需要再重新过滤）
 *
 * 方式二：（在跳转时判断，对用户不是很友好，可能会经常进入404页面。但是编码更少）
 * 1.需要在路由表中的meta中标注当可以放行的角色名（例如：admin、staff）
 * 2.只有在进入路由守卫时判断是否为需要放行，不符合条件时跳转至404
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import StaticRoutesRecord, { NotFountRoutes, StaticRoutes } from '/@/router/modules/static';
import AsyncRoutesRecord from '/@/router/modules';
import NProgress from 'nprogress';
import { useUserStore } from '/@/store';
import { RolesModifiers } from '/@/router/types';

const whitePath = Object.keys(StaticRoutes).map((key) => StaticRoutes[key].path);
// 白名单
const whiteList = [...whitePath];

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...StaticRoutesRecord, ...AsyncRoutesRecord, ...NotFountRoutes],
});

/**
 * 是否放行路由
 * @param target 访问路由需要的角色表
 * @param source 当前用户的角色表
 * @param modifiers
 */
const canNotVisit = function (target: string[] | undefined, source: string[], modifiers: RolesModifiers) {
  if (Array.isArray(target)) {
    return (
      (modifiers === 'every' && (source.length === 0 || target.some((item) => !source.includes(item)))) ||
      (modifiers === 'not' && target.some((item) => source.includes(item))) ||
      (modifiers !== 'every' &&
        modifiers !== 'not' &&
        (source.length === 0 || target.every((item) => !source.includes(item))))
    );
  } else {
    return !!target;
  }
};

router.beforeEach((to, _from, next) => {
  NProgress.start();
  document.title = to.meta.title || '';

  if (whiteList.includes(to.path)) {
    next();
  } else {
    const userStore = useUserStore();
    if (userStore.token) {
      if (canNotVisit(to.meta.roles, userStore.roles, to.meta.modifier!)) {
        next(StaticRoutes.NoAuthentication.path);
      } else {
        next();
      }
    } else {
      // 没有token则跳转至登陆页面
      next(StaticRoutes.Login.path);
    }
  }
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
