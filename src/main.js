import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App);
app.use(router);
app.use(store);

// Set base URL for Axios
axios.defaults.baseURL = 'http://159.223.57.121:8090';

app.mount('#app');
