import * as categoriesAPI from '@/api/categories'

export default {
  namespaced: true,
  state: {
    categories: null,
    currentCategory: null
  },
  getters: {
    categories: state => state.categories,
    currentCategory: state => state.currentCategory
  },
  mutations: {
    set(state, categories) {
      state.categories = categories
    },
    setCurrentCategory(state, category) {
      state.currentCategory = category
    },
    add(state, category) {
      state.categories.push(category)
    },
    update(state, data) {
      let index = state.categories.findIndex(cat => cat.id == data.id)
      state.categories[index] = data
    },
    remove(state, id) {
      state.categories = state.categories.filter(category => category.id !== id)
    },
    clear(state) {
      state.categories = null
      state.currentCategory = null
    }
  },
  actions: {
    async load({ commit, dispatch }) {
      try{
        let res = await categoriesAPI.load()
        commit('set', res)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async create({ commit, dispatch }, data) {
      try{
        let res = await categoriesAPI.create(data)
        dispatch('alerts/add', { text: 'CategoryCreated', color: 'green lighten-1' }, { root: true })
        commit('add', res)
        return true
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async remove({ commit, dispatch }, id) {
      try{
        await categoriesAPI.remove(id)
        dispatch('alerts/add', { text: 'CategoryRemoved', color: 'green lighten-1' }, { root: true })
        commit('remove', id)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async loadById({ commit, dispatch }, id) {
      try{
        let res = await categoriesAPI.loadById(id)
        commit('setCurrentCategory', res)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async update({ commit, dispatch }, data) {
      try{
        let res = await categoriesAPI.update(data)
        dispatch('alerts/add', { text: 'CategoryUpdated', color: 'green lighten-1' }, { root: true })
        commit('setCurrentCategory', res)
        commit('update', res)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    clear({ commit }) {
      commit('clear')
    }
  }
}
