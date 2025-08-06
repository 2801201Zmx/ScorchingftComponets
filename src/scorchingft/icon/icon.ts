import type { App } from 'vue';

import CircleCloseFilled from './circleclosefilled.vue';
import CircleClose from './circleclose.vue';
import View from './view.vue';
import Hide from './hide.vue';
import CopyDocument from './copydocument.vue';
import GitHubDark from './github-dark.vue';
import GitHubLight from './github-light.vue';
import Document from './document.vue';

export { 
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Document
}

const components = {
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Document
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  }
}

