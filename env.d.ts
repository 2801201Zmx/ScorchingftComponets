declare module 'scorchingftui' {
  import type { App } from 'vue';
  const component: {
    install: (app: App) => void;
  };
  export default component;
}