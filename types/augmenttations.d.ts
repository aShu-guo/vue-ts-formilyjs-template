import { MetaRecord } from '@ant-design-vue/pro-layout/dist/typings';

export {};
declare module 'vue-router' {
  interface RouteMeta extends MetaRecord {
    needAuth?: boolean;
    roles?: ('admin' | 'staff')[];
    /**
     * 与roles搭配使用
     * 1. some：只有包含角色中的一个即可以访问
     * 2. every：需要包含所有角色才可以访问
     * 3. not：除要求角色外的其他角色可以访问
     */
    modifier?: 'some' | 'every' | 'not';
  }
}
