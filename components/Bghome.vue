<template>
  <div
    class="w-full bg-cover bg-center"
    style="
      height: 32rem;
      background-image: url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80);
    "
  >
    <div class="flex items-center justify-center h-full w-full bg-white bg-opacity-50">
      <div class="flex justify-between items-center">
        <button
          @click="router"
          class="transform  focus:outline-none hover:scale-125 text-xl cursor-pointer bg-black rounded-xl py-2 px-4 font-semibold"
        >
          <span class="text-white text-xl font-bold md:text-4xl">CREATE</span>
          <span class="text-orange text-xl font-bold md:text-4xl">DER</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    router() {
      this.$router.push('/login')
    },
  },
}
</script>

<style></style>
