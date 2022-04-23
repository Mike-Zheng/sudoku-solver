/**
 * @name ConfigRestartPlugin
 * @description 監聽配置文件修改自動重啟Vite
 */
import ViteRestart from 'vite-plugin-restart'
export const ConfigRestartPlugin = () => {
  return ViteRestart({
    restart: ['*.config.[jt]s', '**/config/*.[jt]s'],
  })
}
