<template>
  <div class="mr-3">
    <table class="min-w-full  mx-auto  grid-cols-4 border-2 border-light">
      <thead>
        <tr class="bg-white rounded">
          <th class=" bg-orange">
            <span class="text-black font-bold">Come to work</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Name</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Workspace</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Date</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Time</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Status</span>
          </th>
        </tr>
      </thead>
      <tbody v-for="(result, id) in result" :key="id">
        <tr class="bg-white text-center ml-2 font-semibold">
          <td class="px-16 py-2 flex flex-row items-center">
            <img
              class="h-8 w-8 rounded-full object-cover"
              :src="result.text.fimg"
              alt=""
            />
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.fname }}</span>
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.fworkspace }}</span>
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.fdate }}</span>
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.ftime }}</span>
          </td>
          <td class="px-16 py-2">
            <button disabled="disabled" class="bg-danger rounded-lg px-4 py-1 text-white cursor-default">
              {{ result.text.fstatus }}
            </button>
          </td>
        </tr>
        
      </tbody>
    </table>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      result: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      //date
      const date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY') 
      const events = await fireDb.collection('CTW '+date)
      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        this.result = tempDoc
      })
    },
  },
}
</script>

<style></style>
