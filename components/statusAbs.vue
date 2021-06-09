<template>
  <div class="font-sans login bg-cover">
    <div class="bg-orange bg-opacity-25">
      <div class="container mx-auto grid">
        <div class="flex flex-wrap justify-center px-6 my-12">
          <!-- Row -->
          <div class="justify-center w-full xl:w-3/4 lg:w-11/10 flex">
            <!-- Col -->
            <div class="bg-white">
              <div class="rounded shadow p-6 formAb">
                <div class="pb-6">
                  <label class="font-semibold block pb-1">Name</label>
                  <div class="flex">
                    <input
                      disabled
                      v-model="form.fname"
                      type="text"
                    />
                  </div>
                </div>
              <div v-for="(result, id) in result" :key="id">
                  <div class="pb-6">
                  <label  class="font-semibold block pb-1">Workplace</label>
                  <span>{{ result.text.fworkspace }}</span>
                </div>
                <div class="pb-6">
                  <label for="date" class="font-semibold block pb-1">Date</label>
                  <div class="flex">
                    <span>{{ result.text.fdate }}</span>
                  </div>
                </div>
                <div class="pb-6">
                  <label for="time" class="font-semibold block pb-1">Time</label>
                  <div class="flex">
                    <span>{{ result.text.ftime }}</span>
                  </div>

                  <label for="time" class="font-semibold block pb-1">Location</label>
                  <div class="flex">
                    <span>{{ result.text.flocation }}</span>
                  </div>
                   <label for="time" class="font-semibold block pb-1">Status</label>
                   <div class="flex">
                  <button disabled="disabled" class="bg-danger rounded-lg px-4 py-1 text-white cursor-default">
                    {{ result.text.fstatus }}
                  </button>
                </div>
              </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
  data() {
    return {
        form: {
        fname: '',
        },
      result: [],
    }
  },
  created() {
    this.getUserDetail()
    this.fetchData()
  },
  methods: {
       getUserDetail() {
      this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.form.fname = user.displayName
        } else {
          console.log('unknow')
        }
      })
    },
    async fetchData() {
        if (this.form.fname ===  result.text.fname) {
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
    }
    },
  },
}
</script>



<style scoped="">
.login {
  /*
    background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
  */
  background: url('~assets/img/work_pic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
