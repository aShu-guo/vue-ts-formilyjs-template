/**
 * @name AutoImportDeps
 * @description
 * 1.打包时排除依赖，更改为从cdn加载
 * 2.组件库仍需要打包进入chunk，否则在弱网环境下，首屏加载缓慢
 *    解决方案：使用http2下载cdn资源
 */
import { Alias } from 'vite';

export const genAlias = (isBuild, _env: 'prod' | 'test'): Alias[] => {
  if (isBuild) {
    return [
      {
        find: 'vue',
        replacement: 'https://cdn.jsdelivr.net/npm/vue@3.2.37/+esm',
      },
      {
        find: 'pinia',
        replacement: 'https://cdn.jsdelivr.net/npm/pinia@2.0.18/+esm',
      },
      {
        find: 'vue-router',
        replacement: 'https://cdn.jsdelivr.net/npm/vue-router@4.1.3/+esm',
      },
      {
        find: 'axios',
        replacement: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/+esm',
      },
      {
        find: 'lodash-es',
        replacement: 'https://esm.run/lodash-es@4.17.21',
      },
      {
        find: 'dayjs',
        replacement: 'https://esm.sh/dayjs@1.11.5',
      },
      /* {
         find: 'ant-design-vue',
         // https://esm.run/ant-design-vue@3.2.10
         // https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.10/+esm
         replacement: 'https://esm.run/ant-design-vue@3.2.10',
       },*/
      {
        find: 'axios',
        replacement: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/+esm',
      },
    ];
  }
  return [];
};
