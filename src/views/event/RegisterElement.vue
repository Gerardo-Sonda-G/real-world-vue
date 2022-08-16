<template>
  <div v-if="event">
    <p>Regstration form here</p>
    <button @click="register">Register Me</button>
  </div>
</template>
<script>
export default {
  props: ['event'],
  methods: {
    // Setting the flash message to the event title and then clearing it after 3 seconds.
    register() {
      this.$store.dispatch(
        'newFlashMessage',
        'You are successfully registered for ' + this.event.title
      )

      setTimeout(() => {
        this.$store.dispatch('newFlashMessage', '')
      }, 3000)

      // Pushing the user to the DetailsEvent page.
      this.unsavedChanges = false
      this.$router.push({
        name: 'DetailsEvent',
      })
    },
  },
  data: function () {
    return {
      unsavedChanges: true,
    }
  },
  // A hook that is called when the user is about to leave the page.
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm('Do you want to leave this page?')
      if (!answer) {
        return false
      }
    }
  },
}
</script>
