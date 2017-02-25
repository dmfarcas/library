import Vuex from 'vuex';
import VuexFire from 'vuexfire';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null
  },
  mutations: VuexFire.mutations,
  getters: {
    items: state => state.items
  }
})
