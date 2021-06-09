<template>
  <div class="card-area w-full md:w-1/3 xl:w-1/3 p-3">
    <div :class="[statusRedColor, statusGreenColor,statusOrengeColor]" class="border-b-4 border-r-4 rounded-lg shadow-lg p-8 text-white">
      <div class="flex flex-row items-center">
        <div class="flex-1 text-right md:text-center">
          <h5 class="card-title uppercase text-black">
            {{ title }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    statusRedColor: {
      type: String,
      default: 'bg-white'
    },
    statusGreenColor: {
      type: String,
      default: 'bg-'
    },
    statusOrengeColor: {
      type: String,
      default: 'Metric Card'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.card-area {
  padding-left: 30px;
  padding-right: 30px;
}
</style>