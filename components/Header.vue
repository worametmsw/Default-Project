<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-6 py-3">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex justify-between items-center">
          <button class="text-xl font-semibold focus:outline-none cursor-default ">
            <span class="text-black text-xl font-bold md:text-2xl">CREATE</span>
            <span class="text-orange text-xl font-bold md:text-2xl">DER</span>
          </button>
        </div>
        <div class="hidden -mx-4 md:flex md:items-center">
          <span @click="statusAbs" class="text-gray mr-3">ติดตามผลใบลา</span>
          <button @click="googleSignout" class="bg-orange rounded-lg px-4 py-1 text-white cursor-pointer">
            <span @click="router" class="text-white text-base font-bold focus:outline-none">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    statusAbs() {
      this.$router.push('/statusAbs')
    },
    router() {
      this.$router.push('/')
    },
    googleSignout() {
      this.$firebase
        .auth()
        .signOut()
        .then(
          function () {
            console.log('Signout Succesfull')
          },
          function (error) {
            console.log('Signout Failed')
          }
        )
    },
  },
}
</script>

<style></style>
