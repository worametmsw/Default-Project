<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header
  },
}
</script>