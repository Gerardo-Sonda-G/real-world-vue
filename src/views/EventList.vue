<template>
  <div class="events">
    <h1>Events For Good</h1>
    <CardEvent v-for="event in events" :key="event.id" :event="event">
    </CardEvent>
  </div>
</template>

<script>
// @ is an alias to /src
import CardEvent from '@/components/CardEvent.vue'
import EventService from '@/services/EventService.js'
export default {
  name: 'EventList',
  components: {
    CardEvent,
  },
  data() {
    return {
      events: null,
    }
  },
  created() {
    EventService.getEvents()
      .then((response) => {
        this.events = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
