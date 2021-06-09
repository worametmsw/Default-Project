<template>
  <div>
    <script src="https://unpkg.com/vue-gallery-slideshow"></script>
    <div class="flex justify-center">
      <img
        class="image description h-24 opacity-50 hover:opacity-100 cursor-pointer"
        v-for="(image, i) in result"
        :src="image.imglink"
        :key="i"
        @click="index = i"
      />
      <client-only placeholder="Loading...">
        <vue-gallery-slideshow :images="imgSrc" :index="index" @close="index = null" />
      </client-only>
    </div>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
import VueGallerySlideshow from 'vue-gallery-slideshow'
export default {
  components: {
    VueGallerySlideshow,
  },
  data() {
    return {
      index: null,
      result: [],
      imgSrc: [],
    }
  },
  async created() {
    const events = await fireDb.collection('IMG')
    events.get().then((querySnapshot) => {
      const tempDoc = []
      querySnapshot.forEach((doc) => {
        tempDoc.push({ ...doc.data() })
        this.result = tempDoc
        this.getResult(tempDoc)
      })
    })
  },
  methods: {
    getResult(tempDoc) {
      const a = []
      for (let index = 0; index < tempDoc.length; index++) {
        a.push(tempDoc[index].imglink)
      }
      this.imgSrc = a
    },
  },
}
</script>

<style>
</style>