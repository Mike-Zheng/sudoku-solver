/**
 * @name AutoImportDeps
 * @description 按需加載，自動引入
 */
import AutoImport from 'unplugin-auto-import/vite'
export const AutoImportDeps = () => {
  return AutoImport({
    dts: 'src/auto-imports.d.ts',
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
  })
}
