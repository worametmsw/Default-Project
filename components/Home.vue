<template>
  <div>
    <bghome />
    <div class="flex items-center justify-center h-full w-full bg-orange">
      <h1 class="text-white text-2xl font-sans uppercase md:text-md">work to day</h1>
    </div>
    <card />
  </div>
</template>
<script>
import Bghome from './Bghome.vue'
import Card from './Card.vue'
import Slider from './slider.vue'
export default {
  layouts: 'default',
  components: { Slider, Bghome, Card },
  data() {
    return {}
  },
}
</script>
