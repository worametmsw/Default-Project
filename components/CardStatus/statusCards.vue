<template>
  <div class="flex grid-cols-1">
    <MetricCard
    c
      :value="countEmp"
      card-color="bg-white"
      card-border-color="border-gray"
      icon=""
      icon-color=""
      title="employee"
    />
    <MetricCard
      :value="countCtw"
      card-color="bg-white"
      card-border-color="border-gray"
      icon=""
      icon-color=""
      title="Come To Work"
    />
    <MetricCard
      :value="countAbs"
      card-color="bg-white"
      card-border-color="border-gray"
      icon=""
      icon-color=""
      title="Leave of absence"
    />
  </div>
</template>

<script>
import MetricCard from '~/components/MetricCard/MetricCardDefault.vue'
export default {
  components: {
    MetricCard,
  },
  props: {
    countEmp: {
      type: Number,
      default: 0
    },
    countAbs: {
      type: Number,
      default: 0
    },
    countCtw: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
  },
}
</script>
<style scoped></style>