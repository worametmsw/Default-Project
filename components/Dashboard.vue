<template>
  <div clas="justify-center ">
    <div class="flex-row flex-wrap flex-grow mt-2 ml-3 mb-10 md:h-screen">
      <MetricCards class="mt-6" :countEmp="countEmp" :countAbs="countAbs" :countCtw="countCtw" />
      <TableCtw class="mt-6" />
      <Table-abs class="mt-6" />
    </div>
  </div>
</template>

<script>
import MetricCards from '~/components/MetricCard/MetricCards'
import TableCtw from '~/components/TableCtw'
import TableAbs from './TableAbs.vue'
import { fireDb } from '~/plugins/firebase.js'
export default {
  components: {
    MetricCards,
    TableCtw,
    TableAbs,
  },
  data() {
    return {
      countEmp: 11,
      countOffice: 0,
      countCtw: 0,
      countAbs: 0,
    }
  },
  created() {
    this.fetchCtw()
    this.fetchAbs()
  },
  methods: {
    async fetchCtw() {
      const date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY') 
      const events = await fireDb.collection('CTW '+date)
      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        this.result = tempDoc
        for (let index = 0; index < this.result.length; index++) {
          this.countCtw += 1
        }
      })
    },
    async fetchAbs() {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const events = await fireDb.collection('ใบลา ' + date)
      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        this.result = tempDoc
        for (let index = 0; index < this.result.length; index++) {
          this.countAbs += 1
        }
      })
    },
  },
}
</script>

<style>
</style>