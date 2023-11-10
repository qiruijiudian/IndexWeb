import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 禁用 devtools
app.config.devtools = false;

app.mount('#app');