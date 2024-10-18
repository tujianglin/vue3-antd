import { createApp } from 'vue';
import App from './App.vue';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import 'virtual:uno.css';
import '/@/styles/index.less';

async function bootstrap() {
  const app = createApp(App);
  app.mount('#app');
}

bootstrap();
