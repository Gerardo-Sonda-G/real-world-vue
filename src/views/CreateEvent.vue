<template>
  <div>
    <h1>Create an event</h1>
    <div class="form-container">
      <form @submit.prevent="onSubmit">
        <label>Select Category </label>
        <select v-model="event.category">
          <option
            v-for="option in categories"
            :value="option"
            :key="option"
            :selected="option === event.category"
          >
            {{ option }}
          </option>
        </select>

        <h3>Name and desctibe your event</h3>

        <label> Title </label>
        <input type="text" placeholder="Title" v-model="event.title" />

        <label> Decription </label>
        <input
          type="text"
          placeholder="Description"
          v-model="event.description"
        />

        <h3>Where is your event?</h3>

        <label>Location</label>
        <input type="text" v-model="event.location" />

        <h3>when is your event?</h3>
        <label>Date</label>
        <input type="text" placeholder="Date" v-model="event.date" />

        <label>Time</label>
        <input type="text" placehoder="Time" v-model="event.time" />

        <button type="submit">submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
      },
    }
  },
  methods: {
    onSubmit() {
      const event = {
        ...this.event,
        id: uuidv4(),
        organizer: this.$store.state.user,
      }
      this.$store.dispatch('createEvent', event)
    },
  },
}
</script>
<style>
.hola {
  border: 1px solid black;
  border-radius: 5px;
}
</style>
