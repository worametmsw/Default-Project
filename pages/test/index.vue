<template>
  <div>
    <button @click="consoleClick">click</button>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
methods: {
  async consoleClick() {
    const events = await fireDb.collection('ใบลา' + '/' + '2021' + '/' + 'June' + '/' + '05' + '/' + 'User')
      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        const absenceData = tempDoc
        console.log('test', absenceData)
      })
  }
}
}
</script>

<style>

</style>