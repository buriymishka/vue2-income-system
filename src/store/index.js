import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user';
import records from './records';
import categories from './categories';
import alerts from './alerts';

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    globalClear({ dispatch }) {
      dispatch('user/clear', null, { root: true })
      dispatch('records/clear', null, { root: true })
      dispatch('categories/clear', null, { root: true })
    }
  },
  modules: {
    user,
    records,
    categories,
    alerts,
  },
  strict: process.env.NODE_ENV !== 'production'
})
