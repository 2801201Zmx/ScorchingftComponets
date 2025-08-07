import type { App } from 'vue'
import { withInstall } from '../../utils/install'
import Icon from '../icon.vue'
import * as Icons from './icons'

export { Icons }

export const SFIcon = withInstall(Icon)

const toKebabCase = (str: string) => {
  const withoutPrefix = str.replace(/^SF/, '');
  return withoutPrefix
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // 处理连续大写
    .replace(/([a-z])([A-Z])/g, '$1-$2')       // 处理大小写转换
    .toLowerCase();
};

export default {
  installIcons(app: App) {
    Object.entries(Icons).forEach(([name, component]) => {
      const kebabName = `sf-${toKebabCase(name)}`;
      app.component(kebabName, component)
    });
  }
}