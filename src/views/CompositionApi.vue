<template>
  <div>
    <p>Spaces Left: {{ spacesLeft }} out of {{ capacity }}</p>
    <button @click="increaseCapacity()">Increase Value</button>
  </div>
</template>
<script>
import useEventSpace from '@/use/event-space.js'

export default {
  beforeRouteEnter (to, from, next) {
  },
  beforeRouteUpdate(){

  },
  setup() {
    const { capacity, spacesLeft, increaseCapacity, attending } = useEventSpace

    return { capacity, spacesLeft, increaseCapacity, attending }
  },
}
</script>
<style></style>
