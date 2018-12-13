import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import { createRouter } from './router'

// Vue.config.productionTip = false

// new Vue({
//   store,
//   render: h => h(App)
// }).$mount('#app')

export function createApp () {
  const router = createRouter()

  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { app, router }
}
