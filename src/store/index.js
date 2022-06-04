import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domainData: {}
  },
  getters: {
    domainData: state => state.domainData,
  },
  mutations: {
    setDomainData: (state, domainData) => (state.domainData = domainData),
  },
  actions: {
    async changeDomainData({ commit }, _domainData) {
      commit('setDomainData', _domainData );
    }
  },
  modules: {
  }
})
