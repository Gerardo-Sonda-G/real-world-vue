import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import CreateEvent from '@/views/CreateEvent.vue'
import ErrorEvent from '@/views/ErrorEvent.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: CreateEvent,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "details" */ '@/views/EventDetails.vue'),
  },
  {
    path: '/event-error',
    name: 'EventError',
    props: true,
    component: ErrorEvent,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
