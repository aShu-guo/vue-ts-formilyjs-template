export {};
declare module 'vue-router' {
  interface RouteMeta {
    needAuth?: boolean;
    title?: string;
    icon?: string;
  }
}
