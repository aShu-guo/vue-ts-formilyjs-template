import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import piniaStore from './store';
import './index.css';
// 全局注册antdv组件
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
// 全局注册layout组件
import PageWrapper from '/@/components/page-wrapper/index.vue';
// 支持SVG
import 'virtual:svg-icons-register';

const app = createApp(App);
app.config.performance = true;

app.component('PageWrapper', PageWrapper);
app.use(router).use(Antd).use(piniaStore).mount('#app');
