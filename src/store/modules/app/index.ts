import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { AppState } from './types';

export const useAppStore = defineStore(
    // 唯一ID
    'app',
    {
        state: () => ({
            title: "Sudoku",
            h1: 'Sudoku-solver',
            theme: 'dark'
        }),
        getters: {},
        actions: {
            // Update app settings
            updateSettings(partial: Partial<AppState>) {
                // @ts-ignore-next-line
                this.$patch(partial);
            },

            // Change theme color
            toggleTheme(dark: boolean) {
                if (dark) {
                    this.theme = 'dark';
                    document.documentElement.classList.add('dark');
                    document.body.setAttribute('arco-theme', 'dark');
                    localStorage.setItem('theme',this.theme)
                } else {
                    this.theme = 'light';
                    document.documentElement.classList.remove('dark');
                    document.body.removeAttribute('arco-theme');
                    localStorage.setItem('theme',this.theme)
                }
            },
        }
    }
)

export function useAppOutsideStore() {
    return useAppStore(piniaStore)
}