import * as recordsAPI from '@/api/records'

export default {
  namespaced: true,
  state: () => ( {
    records: null
  }),
  getters: {
    records: state => state.records
  },
  mutations: {
    set(state, records) {
      state.records = records
    },
    add(state, record) {
      state.records.unshift(record)
    },
    remove(state, id) {
      state.records = state.records.filter(record => record.id !== id)
    },
    update(state, data) {
      let index = state.records.findIndex(record => record.id == data.id)
      state.records[index] = data
    },
    clear(state) {
      state.records = null
    }
  },
  actions: {
    async load({ commit, dispatch }) {
      try{
        let res = await recordsAPI.load()
        commit('set', res)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async loadById({ commit, dispatch }, id) {
      try{
        let res = await recordsAPI.loadById(id)
        return res
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async create({ commit, dispatch }, data) {
      try{
        let res = await recordsAPI.create(data)
        dispatch('alerts/add', { text: 'RecordCreated', color: 'green lighten-1' }, { root: true })
        commit('add', res)
        return true
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async update({ commit, dispatch }, data) {
      try{
        let res = await recordsAPI.update(data)
        dispatch('alerts/add', { text: 'RecordUpdated', color: 'green lighten-1' }, { root: true })
        commit('update', res)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    async remove({ commit, dispatch }, id) {
      try{
        await recordsAPI.remove(id)
        dispatch('alerts/add', { text: 'RecordRemoved', color: 'green lighten-1' }, { root: true })
        commit('remove', id)
      } catch (e) {
        dispatch('alerts/add', { text: e.message }, { root: true })
      }
    },
    clear({ commit }) {
      commit('clear')
    }
  }
}
