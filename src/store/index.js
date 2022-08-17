import * as user from '@/store/modules/user.js'
import * as events from '@/store/modules/events.js'
import { createStore } from 'vuex'

export default createStore({
  state: {
    /* The state of the store. */
    flashMessage: '',
  },
  mutations: {
    /* A mutation that is called from the `newFlashMessage` action. */
    SET_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
  },
  actions: {
    /* A method that is called from the component. */
    newFlashMessage({ commit }, message) {
      /* Calling the mutation `SET_MESSAGE` and passing the message as a parameter. */
      commit('SET_MESSAGE', message)
    },
  },
  modules: { user, events },
  getters: {},
})
