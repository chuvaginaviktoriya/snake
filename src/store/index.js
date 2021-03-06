import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import state from './state'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  })
}
