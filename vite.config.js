import { defineConfig, loadEnv, normalizePath } from 'vite';
import { resolve } from 'path';
import { getPluginsList } from './src/utils/plugins';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const scssPath = normalizePath(resolve('./src/style/index.scss'));

// 官方配置文档：https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_APP_PUBLIC_BASE,
    plugins: getPluginsList(command),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: 8888,
      // 监听所有地址
      host: '0.0.0.0',
      // 服务启动时是否自动打开浏览器
      // open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {
        '/proxy_api': {
          target: env.VITE_APP_PATH, // 代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy_api/, ''),
        },
      },
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@import "${scssPath}";`,
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'modules',
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
      // 自定义底层的 Rollup 打包配置
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    optimizeDeps: {
      /**
       * 依赖预构建，vite启动时会将下面 include 里的模块，编译成 esm 格式并缓存到 node_modules/.vite 文件夹，页面加载到对应模块时如果浏览器有缓存就读取浏览器缓存，如果没有会读取本地缓存并按需加载
       * 尤其当您禁用浏览器缓存时（这种情况只应该发生在调试阶段）必须将对应模块加入到 include里，否则会遇到开发环境切换页面卡顿的问题（vite 会认为它是一个新的依赖包会重新加载并强制刷新页面），因为它既无法使用浏览器缓存，又没有在本地 node_modules/.vite 里缓存
       * 温馨提示：如果您使用的第三方库是全局引入，也就是引入到 src/main.ts 文件里，就不需要再添加到 include 里了，因为 vite 会自动将它们缓存到 node_modules/.vite
       */
      include: ['pinia', 'axios', 'vue-router', 'vue'],
      exclude: [],
    },
  };
});
