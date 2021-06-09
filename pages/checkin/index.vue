<template>
  <Checkin />
</template>

<script>
import Checkin from '~/components/Checkin'
export default {
  components: {
    Checkin
  },
  beforeMount() {
    this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push({ path: '/checkin' })
        } else {
          this.$router.push({ path: '/login' })
        }
      })
  }
}
</script>

<style>

</style>