import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

import ContractNFT from '../abis/ContractNFT.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    domainData: {},
    walletAddress: '',
    cContract: null,
  },
  getters: {
    domainData: state => state.domainData,
    walletAddress: state => state.walletAddress,
    cContract: state => state.cContract,
  },
  mutations: {
    setDomainData: (state, domainData) => (state.domainData = domainData),
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
    setCContract: (state, cContract) => (state.cContract = cContract),
  },
  actions: {
    async changeDomainData({ commit }, _domainData) {
      commit('setDomainData', _domainData );
    },
    async connectToBlockchain({ commit }) {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      const web3 = window.web3;

      const address = await web3.eth.getAccounts();
      commit('setWalletAddress', address[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = ContractNFT.networks[networkId];

      if (networkData) {
        const abi = ContractNFT.abi;
        const address = ContractNFT.networks[networkId].address;

        const blockchain = new web3.eth.Contract(abi, address);
        commit('setCContract', blockchain);
      } else {
        window.alert('Contract is not deployed to detected network.')
      }
    },
    async resetWalletAddress({ commit }) {
      commit('setWalletAddress', "");
    }
  },
  modules: {
  }
})
