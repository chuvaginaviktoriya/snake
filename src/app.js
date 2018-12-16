import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import { createStore } from './store'
import { createRouter } from './router'

export function createApp () {
  const router = createRouter()
  const store = createStore()
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })

  return { app, router, store }
}
