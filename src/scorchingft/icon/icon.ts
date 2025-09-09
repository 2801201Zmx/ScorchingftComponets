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
import LikeFilled from './likefilled.vue';
import Like from './like.vue';
import Dark from './dark.vue';
import Light from './light.vue';
import Comment from './comment.vue';

export { 
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Documentation,
    Code, Pnpm, Npm, Yarn, LikeFilled, Like, Dark, Light, Comment,
}

export const components = {
    CircleCloseFilled, CircleClose, View, Hide, CopyDocument, GitHubDark, GitHubLight, Documentation,
    Code, Pnpm, Npm, Yarn, LikeFilled, Like, Dark, Light, Comment,
}

export {
    CircleCloseFilled as SFCircleCloseFilled,
    CircleClose as SFCircleClose,
    View as SFView,
    Hide as SFHide,
    CopyDocument as SFCopyDocument,
    GitHubDark as SFGitHubDark,
    GitHubLight as SFGitHubLight,
    Documentation as SFDocumentation,
    Code as SFCode,
    Pnpm as SFPnpm,
    Npm as SFNpm,
    Yarn as SFYarn,
    LikeFilled as SFLikefilled,
    Like as SFLike,
    Dark as SFDark,
    Light as SFLight,
    Comment as SFComment,
}

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
  
  ...components
}