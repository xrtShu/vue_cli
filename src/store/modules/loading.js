import * as types from '../mutation-types'

// initial state
const state = {
  isLoading: false
}

// getters
const getters = {}

// actions
const actions = {
  [types.OPEN_LOADING] ({ commit }) {
    commit(types.OPEN_LOADING)
  },
  [types.CLOSE_LOADING] ({ commit }) {
    commit(types.CLOSE_LOADING)
  }
}

// mutations
const mutations = {
  [types.OPEN_LOADING] (state) {
    state.isLoading = true
  },

  [types.CLOSE_LOADING] (state) {
    state.isLoading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
