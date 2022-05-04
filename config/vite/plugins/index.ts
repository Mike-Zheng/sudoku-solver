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

export function createVitePlugins(isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue(),
    // pwa
    VitePWA({}),
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
