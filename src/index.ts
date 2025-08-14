import type { App } from 'vue'
import '@/scorchingft/style/index.css'

import SFCard from '@/scorchingft/card.vue'
import SFInput from '@/scorchingft/input.vue'
import SFIcon from '@/scorchingft/icon.vue'
import SFForm from '@/scorchingft/form.vue'
import SFFormItem from '@/scorchingft/form-item.vue'

import type InputProps from '@/scorchingft/input.vue'
import type CardProps from '@/scorchingft/card.vue'
import type IconProps from '@/scorchingft/icon.vue'
import type FormProps from '@/scorchingft/form.vue'
import type FormItemProps from '@/scorchingft/form-item.vue'


export {
  SFInput, SFCard, SFIcon, SFForm, SFFormItem
}

export type {
  InputProps, CardProps, IconProps, FormProps, FormItemProps
}

const components = {
  SFInput, SFCard, SFIcon, SFForm, SFFormItem
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
      app.component(kebabName, component);
    });
  }
}
