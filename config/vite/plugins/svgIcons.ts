/**
 * @name SvgIconsPlugin
 * @description 加載SVG文件，自動引入
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export const ConfigSvgIconsPlugin = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    // 指定需要緩存的圖標文件夾
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
