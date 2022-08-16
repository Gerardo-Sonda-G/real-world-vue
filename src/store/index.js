import EventService from '@/services/EventService'
import { createStore } from 'vuex'

export default createStore({
  state: {
    /* The state of the store. */
    user: 'Adam jahr',
    flashMessage: '',
    events: null,
    totalCount: 0,
    event: null,
  },
  mutations: {
    /* A mutation that is called from the `fetchEvents` action. */
    SET_EVENTS(state, events) {
      state.events = events
    },
    /* A mutation that is called from the `fetchEvent` action. */
    SET_EVENT(state, event) {
      state.event = event
    },
    /* A mutation that is called from the `newFlashMessage` action. */
    SET_MESSAGE(state, flashMessage) {
      state.flashMessage = flashMessage
    },
    /* Adding the event to the state. */
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    /* Setting the total count of events in the store. */
    SET_TOTAL_COUNT(state, totalCount) {
      state.totalCount = totalCount
    },
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.PostEvent(event)
        .then(() => {
          /* Calling the mutation `ADD_EVENT` and passing the event as a parameter. */
          commit('ADD_EVENT', event)
        })
        .catch((error) => {
          /* Throwing an error. */
          throw error
        })
    },
    /* Action who call the mutations */
    fetchEvents({ commit }, page) {
      /* Calling the `getEvents` method from the `EventService` and passing the `page` parameter. */
      return EventService.getEvents(2, parseInt(page) || 1)
        .then((response) => {
          /* Calling the mutation `SET_EVENTS` and passing the response.data as a parameter. */
          commit('SET_EVENTS', response.data)
          /* Setting the total count of events in the store. */
          commit('SET_TOTAL_COUNT', response.headers['x-total-count'])
        })
        .catch((error) => {
          /* Throwing an error. */
          throw error
        })
    },
    fetchEvent({ commit }, id) {
      return EventService.getEvent(id)
        .then((response) => {
          /* Calling the mutation `SET_EVENT` and passing the response.data as a parameter. */
          commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          /* Throwing an error. */
          throw error
        })
    },
    /* A method that is called from the component. */
    newFlashMessage({ commit }, message) {
      /* Calling the mutation `SET_MESSAGE` and passing the message as a parameter. */
      commit('SET_MESSAGE', message)
    },
  },
  modules: {},
})
