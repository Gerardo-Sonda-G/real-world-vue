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
export default {
  name: 'EventList',
  components: {
    CardEvent,
  },
  created() {
    this.$store.dispatch('fetchEvents').catch((error) => {
      this.$router.push({
        name: 'EventError',
        params: { error: error },
      })
    })
  },
  computed: {
    events() {
      return this.$store.state.events
    },
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
