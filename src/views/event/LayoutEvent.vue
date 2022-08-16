<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'DetailsEvent' }">Details</router-link>
      |
      <router-link :to="{ name: 'EditElement' }">Edit</router-link>
      |
      <router-link :to="{ name: 'RegisterElement' }">Register</router-link>
    </div>
    <router-view :event="event"></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    event() {
      return this.$store.state.event
    },
  },
}
</script>
