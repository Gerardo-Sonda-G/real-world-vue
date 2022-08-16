import axios from 'axios'

/* Creating a new instance of axios with the baseURL and headers. */
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
/* Exporting the functions getEvents and getEvent. */

export default {
  getEvents() {
    /* Returning the apiClient.get with the perPage and page. */
    return apiClient.get('/events/')
  },
  /* Returning the apiClient.get with the id. */
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  PostEvent(event) {
    return apiClient.post('/events', event)
  },
}
