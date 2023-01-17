/**
 * 注意⚠️：只能加载在template中使用的组件，如果是在render函数中使用，则不会自动导入
 *
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite';
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';

export const AutoRegistryComponents = () => {
  return Components({
    // dirs: ['src/components'],
    extensions: ['vue'],
    deep: true,
    dts: 'types/components.d.ts',
    directoryAsNamespace: false,
    globalNamespaces: [],
    directives: true,
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      /*AntDesignVueResolver({
        importStyle: 'less',
        resolveIcons: true,
      }),*/
      VueUseComponentsResolver(),
    ],
  });
};
