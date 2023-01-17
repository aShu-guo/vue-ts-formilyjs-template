/**
 * @name AutoImportDeps
 * @description 自动引入vue3的组合API，引入后使用时无需再import对应API
 */
import AutoImport from 'unplugin-auto-import/vite';
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'types/auto-imports.d.ts',
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
    ],
    imports: [
      'vue',
      'pinia',
      'vue-router',
      {
        '@vueuse/core': [],
      },
    ],
    // resolvers: [AntDesignVueResolver()],
  });
};
