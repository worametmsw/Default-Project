<template>
  <transition leave-active-class="duration-200">
    <div
      v-show="isOpen"
      class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
    >
      <transition
        enter-active-class="duration-300 ease-out"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
        -->
        <div v-show="isOpen" class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-black opacity-25"></div>
        </div>
      </transition>
      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <transition
        enter-active-class="duration-300 ease-out"
        enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="duration-200 ease-in"
        leave-class="translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-show="isOpen"
          class="bg-white rounded-lg overflow-hidden transform transition-all sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">อนุมัติการลา</h3>
                <div class="mt-2">
                  <input
                    v-model="absenceData.fname"
                    disabled
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                  />
                </div>
                <div class="mt-2">
                  <input
                    v-model="absenceData.fdate"
                    disabled
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                  />
                </div>
                <div class="mt-2">
                  <input
                    v-model="absenceData.absenceType"
                    disabled
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                  />
                </div>
                <div class="mt-2">
                  <input
                    v-model="absenceData.fstatus"
                    disabled
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                  />
                </div>
                <div class="mt-2">
                  <input
                    v-model="absenceData.freason"
                    disabled
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="approve"
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  rounded-md
                  border border-gray
                  px-4
                  py-2
                  bg-green
                  text-base
                  leading-6
                  font-medium
                  text-white
                  shadow-sm
                  hover:text-gray-500
                  focus:outline-none
                  focus:border-blue-300
                  focus:shadow-outline-blue
                  transition
                  ease-in-out
                  duration-150
                  sm:text-sm
                  sm:leading-5
                "
              >
                Approve
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                @click="$emit('close')"
                type="button"
                class="
                  inline-flex
                  justify-center
                  w-full
                  rounded-md
                  border border-gray
                  px-4
                  py-2
                  bg-white
                  text-base
                  leading-6
                  font-medium
                  shadow-sm
                  hover:text-gray-500
                  focus:outline-none
                  focus:border-blue-300
                  focus:shadow-outline-blue
                  transition
                  ease-in-out
                  duration-150
                  sm:text-sm
                  sm:leading-5
                "
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
  data() {
    return {}
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    absenceData: {
      type: null,
      default: null,
      required: true,
    },
  },
  methods: {
    async approve() {
      const date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
      const events = await fireDb.collection('ใบลา ' + date)
      this.auth = this.$firebase.auth().currentUser.displayName
      const ref = fireDb.collection('ใบลา ' + date).doc(this.absenceData.fname)
      const document = {
        text: this.absenceData,
      }
      this.absenceData.fstatus = 'อนุมัติ'
      try {
        await ref.set(document)
        swal('Success!', 'You clicked the button!', 'success')
        setTimeout(function(){location.reload()}, 3000);
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
<style scoped>
.bg-black {
  --bg-opacity: 0.4;
}
</style>
