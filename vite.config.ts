import { UserConfig, ConfigEnv } from 'vite'
import { createVitePlugins } from './config/vite/plugins'
import path from 'path'
import { VITE_DROP_CONSOLE, VITE_PORT } from './config/constant'

function resovePath(paths: string) {
  return path.resolve(__dirname, paths)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  console.log(command, mode)
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': resovePath('./src/components'),
        '@utils': resovePath('./src/utils'),
        '@api': resovePath('./src/api'),
      },
    },
    // plugins
    plugins: createVitePlugins(isBuild),

    base: '/sudoku-solver/',

    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 連接 設置 server.hmr.overlay 為 false 可以禁用服務器錯誤遮罩層
      // 服務配置
      port: VITE_PORT, // 類型： number 指定服務器端口;
      open: false, // 類型： boolean | string在服務器啟動時自動在瀏覽器中打開應用程序；
      cors: false, // 類型： boolean | CorsOptions 為開發服務器配置 CORS。默認啟用並允許任何源
      host: '0.0.0.0', // IP配置，支持從IP啟動
    },

    // build
    build: {
      outDir: 'docs',
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        // 確保外部化處理那些你不想打包進庫的依賴
        external: [],
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
      watch: {
        // https://rollupjs.org/guide/en/#watch-options
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
}
