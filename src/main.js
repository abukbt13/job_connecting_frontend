
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

//import bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//import bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';
app.use(router)

app.mount('#app')
