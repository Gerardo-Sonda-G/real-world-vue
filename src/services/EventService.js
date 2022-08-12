import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return apiClient.get('/endpoint0')
  },
  getEvent(id) {
    return apiClient.get('/endpoint4/' + id)
  },
}
