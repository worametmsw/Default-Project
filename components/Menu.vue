<template>
  <div class="md:h-screen">
    <div
      @click="menu = 0"
      @click.prevent="updateValue(menu)"
      :value="menu"
      class="py-sm text-sm font-bold uppercase block leading-normal hover:bg-light cursor-pointer"
    >
      <div class="flex justify-center mt-3"><IconDashboard /></div>
    </div>
   
  

  </div>
</template>
<script>
import IconDashboard from '~/assets/Icon/IconDashboard'
export default {
  components: {
    IconDashboard,
  },
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      menu: 0
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value)
      console.log(this.value)
    },
  },
}
</script>