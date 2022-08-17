<template>
  <div class="events">
    <h1>Events For Good</h1>
    <CardEvent v-for="event in events" :key="event.id" :event="event">
    </CardEvent>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous
      </router-link>
      <router-link
        id="page-index"
        v-for="n in totalPages"
        :key="n"
        :to="{ name: 'EventList', query: { page: n } }"
        rel="prev"
      >
        {{ n }}
      </router-link>
      <router-link
        id="next-page"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardEvent from '@/components/CardEvent.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    CardEvent,
  },
  // A hook that is called before the route is entered.
  beforeRouteEnter(routeTo, routeFrom, next) {
    // Getting the events from the EventService and passing the page number to the service.
    next((comp) => {
      comp.$store
        .dispatch('events/fetchEvents', routeTo.query.page || 1)
        .catch(() => {
          comp.$router.push({
            name: 'NetworkError',
          })
        })
    })
  },
  beforeRouteUpdate(routeTo) {
    // Getting the events from the EventService and passing the page number to the service.
    this.$store
      .dispatch('events/fetchEvents', routeTo.query.page || 1)
      .catch(() => {
        this.$router.push({
          name: 'NetworkError',
        })
      })
  },
  computed: {
    hasNextPage() {
      var totalPages = this.totalPages
      return this.page < totalPages
    },
    ...mapState({
      events: (state) => state.events.events,
    }),
    ...mapGetters('events', ['totalPages']),
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 2;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
  flex: 3;
}
#page-next {
  text-align: right;
}
#page-index a {
  text-align: center;
}
</style>
