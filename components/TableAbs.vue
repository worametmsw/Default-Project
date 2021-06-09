<template>
  <div class="mr-3">
    <table class="min-w-full table-auto border-2 border-light">
      <thead>
        <tr class="bg-white rounded">
          <th class="px-16 py-2 bg-orange">
            <span class="text-black font-bold">Absence</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Name</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Date</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray">Resson</span>
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
              src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
              alt=""
            />
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.fname }}</span>
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.fdate }}</span>
          </td>
          <td class="px-16 py-2">
            <span>{{ result.text.freason }}</span>
          </td>
          <td class="px-16 py-2">
            <div class="flex justify-between">
              <div v-if="result.text.fstatus === 'อนุมัติ'">
              <button disabled="disabled" class="bggreen rounded-lg px-4 py-1 text-white cursor-default">
                อนุมัติ
              </button>
              </div>
              <div v-else>
                <button disabled="disabled" class="bg-danger rounded-lg px-4 py-1 text-white cursor-default">
                รออนุมัติ
              </button>
              </div>
              <span
                @click="
                  isModalVisible = !isModalVisible
                  spanC(id)
                "
                class="text-gray text-sm cursor-pointer"
              >
                กดเพื่ออนุมัติ
              </span>
            </div>
            <ApproveModal @close="closeModal" :absenceData="absenceData" :isOpen="isModalVisible"></ApproveModal>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
import ApproveModal from '../components/modal/approveModal'
export default {
  components: {
    ApproveModal,
  },

  data() {
    return {
      isModalVisible: false,
      result: [],
      absense: [],
      absenceData: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    showModal() {
      this.isModalVisible = true
    },
    closeModal() {
      this.isModalVisible = false
    },
    async spanC(id) {
      const date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
      //user
      const events = await fireDb.collection('ใบลา ' + date)
      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() })
        })
        this.absenceData = tempDoc[id].text
        console.log('spanC', this.absenceData)
      })
    },
    async fetchData() {
      //date
      const date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
      //user
      const events = await fireDb.collection('ใบลา ' + date)
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

<style>
.btred {
  background-color: red;
}
.bggreen {
  background-color: green;
}
</style>
