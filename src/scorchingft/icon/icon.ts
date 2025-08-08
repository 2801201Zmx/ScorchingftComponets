import type { App } from 'vue';

import CircleCloseFilled from './circleclosefilled.vue';
import CircleClose from './circleclose.vue';
import View from './view.vue';
import Hide from './hide.vue';
import CopyDocument from './copydocument.vue';
import GitHubDark from './github-dark.vue';
import GitHubLight from './github-light.vue';
import Documentation from './document.vue';
import Code from './label.vue';
import Pnpm from './pnpm.vue';
import Npm from './npm.vue';
import Yarn from './yarn.vue';

export { 
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Documentation,
    Code, Pnpm, Npm, Yarn
}

const components = {
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Documentation,
    Code, Pnpm, Npm, Yarn
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
}

