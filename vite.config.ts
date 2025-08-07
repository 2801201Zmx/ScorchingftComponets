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

  // 库模式构建配置
  const buildConfig = {
    lib: {
    entry: resolve(__dirname, 'src/entry.ts'), // 使用新的入口文件
    name: 'ScorchingftComponents',
    formats: ['es', 'umd'],
    fileName: (format: string) => {
      if (format === 'es') return 'index.esm.js';
      if (format === 'umd') return 'index.umd.js';
      return `scorchingft-components.${format}.js`;
    },
  },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named' as const, // 显式指定为字面量类型
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo: any) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css'
          }
          return assetInfo.name
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true
  };

  return {
    plugins,
    build: mode === 'production' ? buildConfig : {
      outDir: 'dist',
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