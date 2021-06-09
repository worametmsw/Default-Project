<template>
  <div class="bg-light flex">
    <div class="w-12">
      <Menu v-model="checkMenu" class="bg-white border border-light" />
    </div>
    <div class="w-full">
      <div v-if="checkMenu === 0" class="rounded border border-light">
        <Dashboard />
      </div>
    </div>
  </div>
</template>
<script>
import Dashboard from '~/components/Dashboard'
import TheMenu from '~/components/Menu'
export default {
  components: {
    Dashboard,
    TheMenu,
  },
  data() {
    return {
      checkMenu: 0,
    }
  }
}
</script>
<style lang="postcss" scoped></style>