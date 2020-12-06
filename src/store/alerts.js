import loc from '@/filters/localize'
let AI = 0

export default {
  namespaced: true,
  state: {
    alerts: []
  },
  getters: {
    alerts: state => state.alerts
  },
  mutations: {
    add(state, alert) {
      state.alerts.push(alert)
    },
    remove(state, id) {
      state.alerts = state.alerts.filter(el => el.id !== id)
    }
  },
  actions: {
    add({ commit }, { text = '', timeout = 4000, color = 'error' }) {
      text = loc(text)
      commit('add', { text, color, id: ++AI, timeout })
    },

    remove({ commit }, id) {
      commit('remove', id)
    }
  }
}


