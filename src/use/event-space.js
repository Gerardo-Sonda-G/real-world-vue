import { ref, computed } from 'vue'

export default function useEventSpace() {
  const capacity = ref(3)
  const attending = ref(['tim', 'bob', 'joe'])
  function increaseCapacity() {
    capacity.value++
  }
  const spacesLeft = computed(() => {
    return capacity.value - attending.value.length
  })

  return { capacity, increaseCapacity, spacesLeft }
}
