import EventService from '@/services/EventService'
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: 'Adam jahr',
    flashMessage: '',
    events: null,
    totalCount: 0,
    event: null,
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_TOTAL_COUNT(state, totalCount) {
      state.totalCount = totalCount
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.PostEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchEvents({ commit }, page) {
      EventService.getEvents(2, parseInt(page) || 1)
        .then((response) => {
          // Setting the data for the component.
          commit('SET_EVENTS', response.data)
          commit('SET_TOTAL_COUNT', response.headers['x-total-count'])
        })
        .catch(() => {
          // Redirecting to the NetworkError component.
          commit('SET_EVENTS', null) //return { name: 'NetworkError' }
        })
    },
    fetchEvent({ commit }, id) {
      EventService.getEvents(id)
        .then((response) => {
          // Setting the data for the component.
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          // Redirecting to the NetworkError component.
          console.log(error)
          //return { name: 'NetworkError' }
        })
    },
  },
  modules: {},
})
