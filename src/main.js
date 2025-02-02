import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'virtual:svg-icons-register'; // Register custom svg icons

import App from './App.vue';
import router from './router/index';
import SvgIcon from '@/components/ui/SvgIcon.vue';
import LoadingData from './components/ui/LoadingData.vue';

const pinia = createPinia();
const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.component('ui-loading', LoadingData);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
