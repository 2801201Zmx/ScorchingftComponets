import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [vue()];

  if (mode === 'development') {
    try {
      const vueDevTools = require('vite-plugin-vue-devtools').default;
      if (vueDevTools) {
        plugins.push(vueDevTools());
      }
    } catch (e) {
      console.error('DevTools 插件加载失败:', e);
    }
  }

  return {
    plugins,
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ScorchingftComponents',
        fileName: (format: string) => `scorchingft-components.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', 'vue-router'],
        output: {
          exports: "named",
          globals: {
            vue: 'Vue',
            'vue-router': 'VueRouter'
          },
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name === 'style.css') {
              return 'style.css'
            }
            return assetInfo.name
          }
        }
      },
      cssCodeSplit: false,
      sourcemap: true
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'Scorchingft-Components': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'ScorchingftIcon': fileURLToPath(new URL('./src/scorchingft/icon/icon.ts', import.meta.url)),
      },
    },
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0'
    },
  }
})