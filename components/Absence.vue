<template>
  <div>
    <div class="rounded shadow p-6 formAb">
      <div class="pb-6">
        <label class="font-semibold block pb-1">Name</label>
        <div class="flex">
          <input v-model="form.fname" class="border border-gray rounded-lg px-4 py-2 w-full" type="text" />
        </div>
      </div>
      <div class="pb-6">
        <transition name="panelIn">
          <range-date-picker
            class="range-date-picker"
            v-model="dates"
            language="en"
            v-show="show"
            @closePicker="closePicker"
          ></range-date-picker>
        </transition>
        <div class="flex">
          <button class="range-date-input mr-2" @click="showPicker">
            <IconCalendar />
          </button>
          <input
            disabled
            class="w-full py-2 rounded-lg border-gray border outline-none"
            placeholder="  DD/MM/YY - - DD/MM/YY"
            :value="rangeDates"
          />
        </div>
      </div>
      <div class="pb-6">
        <label for="workplace" class="font-semibold block pb-1">Absence Type</label>
        <select
          v-model="form.absenceType"
          id="workplace"
          class="w-full py-2 rounded-lg border-gray border outline-none"
        >
          <option value="ลาป่วย">ลาป่วย</option>
          <option value="ลากิจส่วนตัว">ลากิจส่วนตัว</option>
          <option value="ลาพักผ่อน">ลาพักผ่อน</option>
          <option value="อื่นๆ">อื่นๆ</option>
        </select>
      </div>
      <div class="pb-6">
        <label class="font-semibold block pb-1">Resson</label>
        <div class="flex">
          <textarea
            v-model="form.freason"
            class="p-3 w-full resize-none h-7xl border border-gray rounded-lg"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="pb-6">
        <button @click="onSubmit" class="font-bold text-white bg-black rounded-lg w-full py-4 hover:bg-orange">
          SUBMIT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Travelling from '~/assets/SVG/Travelling.vue'
import { parseTime } from '~/utill'
import { fireDb } from '~/plugins/firebase.js'
import IconCalendar from '~/assets/Icon/IconCalendar.vue'
export default {
  props: {
    source: String,
  },
  components: { Travelling, IconCalendar },
  data() {
    return {
      form: {
        fname: '',
        fdate: '',
        absenceType: '',
        fstatus: 'ลางาน',
        freason: '',
      },
      show: false,
      date: '',
      dates: {},
      auth: '',
    }
  },
  mounted() {
    this.getUserDetail()
    const today = new Date()
    this.date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
    this.form.ftime = today.getHours() + ':' + today.getMinutes()
  },
  computed: {
    rangeDates() {
      if (Object.keys(this.dates).length === 2) {
        this.form.fdate = `${this.parseTime(this.dates.start, '  y-m-d')}  -  ${this.parseTime(
          this.dates.end,
          'y-m-d'
        )}`
        return `${this.parseTime(this.dates.start, '  y-m-d')}  -  ${this.parseTime(this.dates.end, 'y-m-d')}`
      } else {
        return ''
      }
    },
  },
  methods: {
    parseTime,
    getUserDetail() {
      this.$firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.form.fname = user.displayName
        } else {
          return
        }
      })
    },
    closePicker() {
      this.show = false
    },
    showPicker() {
      this.show = true
    },
    async onSubmit() {
      if (
        this.form.fname !== '' &&
        this.form.fdate !== '' &&
        this.form.absenceType !== '' &&
        this.form.fstatus !== '' &&
        this.form.freason !== ''
      ) {
        this.auth = this.$firebase.auth().currentUser.displayName
        const ref = fireDb.collection('ใบลา ' + this.date).doc(this.auth)
        const document = {
          text: this.form,
        }
        this.form.fstatus = 'รออนุมัติ'
        try {
          await ref.set(document)
          swal('Success!', 'You clicked the button!', 'success')
        } catch (e) {
          console.error(e)
        }
      } else {
        swal('Fail!', 'Check the information completely.', 'error')
        return
      }
    },
    redirect(value) {
      this.$router.push({ path: value })
      console.log(value, 'val')
    },
  },
}
</script>
<style scoped>
.panelIn-enter {
  transform: translateY(-10px);
}
.panelIn-enter-active {
  transition: transform 0.3s ease;
}
.panelIn-enter-to {
  transform: translateY(0);
}
.formAb {
  height: 600px;
  width: 400px;
}
</style>
