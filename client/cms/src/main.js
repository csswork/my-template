import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'virtual:svg-icons-register'; // Register custom svg icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue';
import router from './router/index';
import SvgIcon from '@/components/ui/SvgIcon.vue';

const pinia = createPinia();
const app = createApp(App);
app.component('svg-icon', SvgIcon);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
app.component(key, component)
}
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.mount('#app');