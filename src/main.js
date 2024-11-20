import { createApp } from 'vue';
import App from './App.vue';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css'; // 스타일 임포트

const app = createApp(App);

app.use(VCalendar, { componentPrefix: 'vc' });

app.mount('#app');
