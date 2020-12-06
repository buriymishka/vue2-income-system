import * as userAPI from '@/api/user'
import { setAC, clearAC } from '@/tokens/index'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clear(state) {
      state.user = null
    }
  },
  actions: {
    async login({ commit, dispatch }, data) {
      try {
        let res = await userAPI.login(data)
        setAC(res.accessToken)
        delete res.accessToken
        commit('setUser', res)
        dispatch('alerts/add', { text: 'SuccessfulSignIn', color: 'green lighten-1' }, { root: true })
        router.push({ name: 'cabinet' })
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async signUp({ commit, dispatch }, data) {
      try {
        let res = await userAPI.signUp(data)
        setAC(res.accessToken)
        delete res.accessToken
        commit('setUser', res)
        dispatch('alerts/add', { text: 'SuccessfulSignUp', color: 'green lighten-1' }, { root: true })
        router.push({ name: 'cabinet' })
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async recover({ commit, dispatch }, data) {
      try {
        let res = await userAPI.recover(data)
        commit('setUser', res)
        dispatch('alerts/add', { text: 'PleaseCheckYourEmail', color: 'green lighten-1' }, { root: true })
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async update({ commit, dispatch }, data) {
      try {
        let res = await userAPI.update(data)
        commit('setUser', res)
        dispatch('alerts/add', { text: 'SuccessfulUpdate', color: 'green lighten-1' }, { root: true })
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async load({ commit, dispatch }, firstLoad = false) {
      try {
        let res = await userAPI.load()
        commit('setUser', res)
      } catch (e) {
        if (!firstLoad) {
          dispatch('alerts/add', { text: e.message }, { root: true })
        }
      }
    },
    async loadIncome({ dispatch }) {
      try {
        return await userAPI.loadIncome()
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async loadOutcome({ dispatch }) {
      try {
        return await userAPI.loadOutcome()
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    clear({ commit }) {
      commit('clear')
    },
    async logout({ commit, dispatch }) {
      try {
        await userAPI.logout()
        clearAC()
        dispatch('alerts/add', { text: 'YouAreLoggedOut', color: 'green lighten-1' }, { root: true })
        commit('clear')
        dispatch('records/clear', null, { root: true })
        dispatch('categories/clear', null, { root: true })
        router.push({ name: 'Login' })
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    }
  }
}