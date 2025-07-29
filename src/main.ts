import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';

import ScorchingftComponents from '@/index';
import '@/components/style/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);

app.use(pinia);
app.use(ScorchingftComponents);
app.mount('#app');
