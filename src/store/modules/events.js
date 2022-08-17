import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: null,
  totalCount: 0,
  event: null,
}
export const actions = {
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
}
export const mutations = {
  /* A mutation that is called from the `fetchEvents` action. */
  SET_EVENTS(state, events) {
    state.events = events
  },
  /* A mutation that is called from the `fetchEvent` action. */
  SET_EVENT(state, event) {
    state.event = event
  } /* Adding the event to the state. */,
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  /* Setting the total count of events in the store. */
  SET_TOTAL_COUNT(state, totalCount) {
    state.totalCount = totalCount
  },
}
export const getters = {
  totalPages: (state) => {
    return Math.ceil(state.totalCount / 2)
  },
}
