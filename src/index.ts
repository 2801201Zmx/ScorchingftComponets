import type { App } from 'vue'
import '@/scorchingft/style/index.css'

import SFCard from '@/scorchingft/card.vue'
import SFInput from '@/scorchingft/input.vue'
import SFIcon from '@/scorchingft/icon.vue'
import SFForm from '@/scorchingft/form.vue'
import SFFormItem from '@/scorchingft/form-item.vue'
import SFButton from '@/scorchingft/button.vue'
import SFTextarea from '@/scorchingft/textarea.vue'
import * as SFIcons from '@/scorchingft/icon/icons/index.ts'

export type InputProps = InstanceType<typeof SFInput>['$props']
export type CardProps = InstanceType<typeof SFCard>['$props']
export type IconProps = InstanceType<typeof SFIcon>['$props']
export type FormProps = InstanceType<typeof SFForm>['$props']
export type FormItemProps = InstanceType<typeof SFFormItem>['$props']
export type ButtonProps = InstanceType<typeof SFButton>['$props']
export type TextareaProps = InstanceType<typeof SFTextarea>['$props']

export {
  SFInput, SFCard, SFIcon, SFForm, SFFormItem, SFButton, SFTextarea, SFIcons
}

const components = {
  SFInput, SFCard, SFIcon, SFForm, SFFormItem, SFButton, SFTextarea
}

const toKebabCase = (str: string) => {
  // 1. 移除开头的 "SF" 前缀
  const withoutPrefix = str.replace(/^SF/, '');
  // 2. 处理连续大写字母
  return withoutPrefix
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
};

export interface ScorchingftInstallationOptions {
  size?: ComponentSize
  zIndex?: number
}

export type ComponentSize = 'large' | 'medium' | 'small' | 'mini'

export default {
  install(app: App, options?: ScorchingftInstallationOptions) {
    // 注册基础组件
    Object.entries(components).forEach(([name, component]) => {
      const kebabName = `sf-${toKebabCase(name)}`;
      app.component(kebabName, component);
    });
    
    // 注册图标组件
    Object.entries(SFIcons).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
}