<template>
  <div>
    <button :class="[buttonColor]">{{ value }}</button>
  </div>
</template>

<script>
export default {
  props: {
    buttonColor: {
      type: String,
      default: 'bg-orange',
    },
    value: {
      type: String,
      default: 'รออนุมัติ',
    },
  },
}
</script>

<style>
</style>