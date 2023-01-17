import { UserConfig, ConfigEnv } from 'vite';
import { createVitePlugins } from './config/vite/plugins';
import { resolve } from 'path';
import proxy from './config/vite/proxy';

// import { genAlias } from './config/vite/plugins/write-cdn';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

console.log(pathResolve('src') + '/');
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const buildEnv: 'prod' | 'test' = isBuild && mode === 'production' ? 'prod' : 'test';

  console.log(command, mode);
  return {
    envDir: './env',
    resolve: {
      alias: [
        { find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.cjs.js' },
        {
          find: /..\/__builtins__\/styles\/common.less/,
          replacement: pathResolve('src/assets/styles/pure.less'),
          // replacement: pathResolve('node_modules/ant-design-vue/es/style/index.less'),
        },
        /*{
          find: /^ant-design-vue\/lib\/style\/index.less/,
          replacement: pathResolve('node_modules/ant-design-vue/es') + '/',
        },*/
        { find: /^\/assets/, replacement: pathResolve('src/assets') + '/' },
        // /@/xxxx => src/xxxx
        { find: /\/@\//, replacement: pathResolve('src') + '/' },
        // /#/xxxx => types/xxxx
        { find: /\/#\//, replacement: pathResolve('types') + '/' },
        // ...genAlias(isBuild, env),
      ],
    },
    // plugins
    plugins: createVitePlugins(isBuild, buildEnv),

    // build
    build: {
      sourcemap: buildEnv !== 'prod',
      rollupOptions: {
        manualChunks(id) {
          // 以下这段代码会根据条件，将符合条件的文件模块打包成特定的chunk文件
          // 将node_modules 中的包切割成单独的chunk，有助于文件的预加载、以及缓存优化
          if (id.includes('node_modules') && id.includes('ant-design-vue')) {
            return 'ant-design-vue';
          } else if (id.includes('node_modules') && id.includes('vue')) {
            return 'vue-module';
          }
        },
      },
    },

    // css
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          // modifyVars: modifyTheme(),
          additionalData: `@import "${resolve('src/assets/styles/theme.less')}";`,
          javascriptEnabled: true,
        },
      },
    },

    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 4000, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy,
    },
    clearScreen: false,
  };
};
