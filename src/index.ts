import '@/components/style/index.css'
// 导入组件
import SFCard from '@/components/card.vue'
import SFInput from '@/components/input.vue'

import type InputProps from '@/components/input.vue'
import type CardProps from '@/components/card.vue'

// 导出组件
export {
  SFInput, SFCard
}

// 导出组件类型
export type {
  InputProps, CardProps
}

// Vue 插件安装函数
import type { App } from 'vue'

const components = {
  SFInput,
  SFCard
}

const toKebabCase = (str: string) => {
  // 1. 移除开头的 "SF" 前缀
  const withoutPrefix = str.replace(/^SF/, '');
  // 2. 处理连续大写字母
  return withoutPrefix
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // 处理连续大写
    .replace(/([a-z])([A-Z])/g, '$1-$2')       // 处理大小写转换
    .toLowerCase();
};

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      const kebabName = `sf-${toKebabCase(name)}`;
      // console.log(`注册组件: ${name} -> ${kebabName}`); // 添加日志用于调试
      app.component(kebabName, component);
    });
  }
}