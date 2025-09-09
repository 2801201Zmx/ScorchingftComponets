import type { App } from 'vue'
import { withInstall } from '../../utils/install'
import { components } from './icon'
import Icon from '../icon.vue'
import * as Icons from './icons'

export { Icons }

export const SFIcon = withInstall(Icon)

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
  
  ...components
}