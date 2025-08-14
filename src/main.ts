import '@/assets/main.css';
import '@/assets/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';

import Scorchingft from 'Scorchingft-Components';
import ScorchingftICON from 'ScorchingftIcon';

const pinia = createPinia();
const app = createApp(App);

app.use(router);

app.use(pinia);
app.use(Scorchingft);
app.use(ScorchingftICON);
app.mount('#app');
