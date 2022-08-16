import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'

/* Creating a new Vue app, using the router, providing the store, and mounting it to the #app element. */
createApp(App).use(store).use(router).mount('#app')
