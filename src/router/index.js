import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import DetailsElement from '@/views/event/DetailsElement.vue'
import EditElement from '@/views/event/EditElement.vue'
import RegisterElement from '@/views/event/RegisterElement.vue'
import LayoutEvent from '@/views/event/LayoutEvent.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import CreateEvent from '@/views/CreateEvent.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
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
    path: '/createEvent',
    name: 'CreateEvent',
    component: CreateEvent,
  },
  {
    path: '/events/:id',
    name: 'LayoutEvent',
    props: true,
    component: LayoutEvent,
    /* This is a hook that is called before the router enters the route. */
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          /* Setting the event property of the GStore object to the response data. */
          store.commit('SET_EVENT', response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            /* Returning a route object that will be used to navigate to the NetworkError route. */
            return {
              name: '404Resource',
              params: {
                resource: 'event',
              },
            }
          } else {
            /* Returning a route object that will be used to navigate to the NetworkError route. */
            return { name: 'NetworkError' }
          }
        }) // ...
    },
    /* This is a nested route. */
    children: [
      {
        path: '',
        name: 'DetailsEvent',
        component: DetailsElement,
      },
      {
        path: 'edit',
        name: 'EditElement',
        component: EditElement,
        /* A meta property that is used to check if the user is authorized to view the page. */
        meta: { requireAuth: true },
      },
      {
        path: 'register',
        name: 'RegisterElement',
        component: RegisterElement,
      },
    ],
  },
  {
    /* This is a catch-all route that redirects any URL that starts with /event to the /events route. */
    path: '/event/:afterEvent(.*)',
    redirect: (to) => {
      return { path: '/events/' + to.params.afterEvent }
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  /* A hook that is called when the router is navigating to a new page. */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  /* A library that shows a progress bar at the top of the page. */
  NProgress.start()
  /* This is a simple example of how to use the beforeEach hook to check if the user is authorized to
view the page. */
  const notAuthrized = true
  if (to.meta.requireAuth && notAuthrized) {
    store.state.flashMessage = 'Sorr, you are notauthorized to view this page'

    setTimeout(() => {
      store.state.flashMessage = ''
    }, 3000)

    if (from.href) {
      // <--- If this navigation came from a previous page.
      return false
    } else {
      // <--- Must be navigating directly
      return { path: '/' } // <--- Push navigation to the root route.
    }
  }
})

/* A hook that is called after the navigation is complete. */
router.afterEach(() => {
  NProgress.done()
})
export default router
