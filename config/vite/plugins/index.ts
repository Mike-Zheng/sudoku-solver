/**
 * @name createVitePlugins
 * @description 封裝plugins數組統一調用
 */
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { ConfigSvgIconsPlugin } from './svgIcons'
import { AutoRegistryComponents } from './component'
import { AutoImportDeps } from './autoImport'
import { ConfigVisualizerConfig } from './visualizer'
import { ConfigRestartPlugin } from './restart'

const pwaConfig = {
  manifest: {
    icons: [
      {
        src: 'icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'icons/android-chrome-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'icons/apple-touch-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
      {
        src: 'icons/apple-touch-icon-76x76.png',
        sizes: '76x76',
        type: 'image/png',
      },
      {
        src: 'icons/apple-touch-icon-120x120.png',
        sizes: '120x120',
        type: 'image/png',
      },
      {
        src: 'icons/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icons/apple-touch-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'icons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'icons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'icons/msapplication-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icons/mstile-150x150.png',
        sizes: '150x150',
        type: 'image/png',
      },
    ],
  },
}

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // pwa
    VitePWA(pwaConfig),
    // 自動按需引入組件
    AutoRegistryComponents(),
    // 自動按需引入依賴
    AutoImportDeps(),
    // 監聽配置文件改動重啟
    ConfigRestartPlugin(),
  ]

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(ConfigVisualizerConfig())

  return vitePlugins
}
