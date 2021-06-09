<template>
  <div class="font-sans login bg-cover">
    <div class="bg-orange bg-opacity-25">
      <div class="container mx-auto grid">
        <div class="flex flex-wrap justify-center px-6 my-12">
          <!-- Row -->
          <div class="justify-center w-full xl:w-3/4 lg:w-11/10 flex">
            <!-- Col -->
            <div v-show="showImgUpload" class="w-full lg:w-1/2 p-8 bg-white lg:ml-4 rounded-l-2xl opacity-75">
              <div class="flex justify-between">
                <span class="text-xl font-semibold block">Upload Image</span>
                <label for="file-upload" class="font-bold text-white bg-black rounded-lg px-5 py-2 hover:bg-orange">
                  Upload file
                </label>
              </div>
              <span class="text-gray-600">Upload photos of work today.</span>
              <div class="text-xl font-semibold block">
                <input id="file-upload" type="file" @change="previewImage" accept="image/*" hidden />
                <progress v-show="false" id="progress" :value="uploadValue" max="100"></progress>
              </div>
              <div class="mt-6 flex justify-center rounded-lg picPreview">
                <div v-if="waiting" class="mt-20 item-center">
                  <Spinner />
                </div>
                <div :hidden="waiting" class="text-center">
                  <img v-show="showImgpreview" class="preview" :src="picture" />
                </div>
                <image-upload v-show="showImgsvg" />
              </div>
              <div class="pb-6">
                <label class="font-semibold block pb-1">Caption</label>
                <div class="flex">
                  <input
                    v-model="form.fcaption"
                    class="border border-gray rounded-lg px-4 py-2 w-full"
                    type="text"
                    placeholder="Caption here...."
                  />
                </div>
              </div>
            </div>
            <!-- Col -->
            <div class="w-full lg:w-1/2 p-4 bg-white rounded-r-2xl">
              <div class="p-6 btn-group text-black text-2xl font-semi uppercase md:text-sm" data-toggle="buttons">
                <label class="btn btn-warning active">
                  <input
                    v-model="picker"
                    name="picker"
                    type="radio"
                    class="cheker text-white"
                    autocomplete="off"
                    v-bind:value="'checkin'"
                    checked
                  />
                  Check in
                </label>
                <label class="btn btn-warning">
                  <input v-model="picker" name="picker" type="radio" class="ml-3 cheker" v-bind:value="'absence'" />
                  Absence
                </label>
              </div>
              <div v-show="showCheckin">
                <div class="rounded shadow p-6 formAb">
                  <div class="pb-6">
                    <label class="font-semibold block pb-1">Name</label>
                    <div class="flex">
                      <input
                        disabled
                        v-model="form.fname"
                        class="border border-gray rounded-lg px-4 py-2 w-full"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="pb-6">
                    <label for="workplace" class="font-semibold block pb-1">Workplace</label>
                    <select
                      v-model="form.fworkspace"
                      id="workplace"
                      class="border border-gray rounded-lg px-5 py-2 w-full"
                    >
                      <option value="ออฟฟิต">ออฟฟิต</option>
                      <option value="บ้าน">บ้าน</option>
                      <option value="นอกสถานที่">นอกสถานที่</option>
                    </select>
                  </div>
                  <div class="pb-6">
                    <label for="date" class="font-semibold block pb-1">Date</label>
                    <div class="flex">
                      <input
                        v-model="form.fdate"
                        disabled
                        id="date"
                        class="border border-gray rounded-lg px-4 py-2 w-full"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="pb-6">
                    <label for="time" class="font-semibold block pb-1">Time</label>
                    <div class="flex">
                      <input
                        v-model="form.ftime"
                        disabled
                        id="time"
                        class="border border-gray rounded-lg px-4 py-2 w-full"
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="pb-6">
                    <label for="location" class="font-semibold block pb-1">Location</label>
                    <div class="flex">
                      <input
                        v-model="form.flocation"
                        id="location"
                        disabled
                        class="border border-gray rounded-lg px-4 py-2 w-full mr-3"
                        type="text"
                        placeholder="Location"
                      />
                      <button
                        @click="geolocation"
                        class="font-bold focus:outline-none text-white bg-black rounded-lg px-5 py-2 hover:bg-orange"
                      >
                        <IconLocation />
                      </button>
                      <div v-if="waiting" class="mt-20 item-center">
                        <Spinner />
                      </div>
                    </div>
                    <button
                      @click="onSubmit"
                      class="font-bold text-white focus:outline-none bg-black rounded-lg w-full mt-4 px-5 py-4 hover:bg-orange"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
              <absence v-show="showAbsence" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconLocation from '~/assets/Icon/IconLocation'
import axios from 'axios'
import firebase from 'firebase'
import { fireDb } from '~/plugins/firebase.js'
import ImageUpload from '~/assets/SVG/ImageUpload.vue'
import Absence from './Absence.vue'
import Spinner from '~/components/Spinner'
export default {
  props: {
    source: String,
  },
  components: {
    IconLocation,
    ImageUpload,
    Absence,
    Spinner,
  },
  data() {
    return {
      form: {
        fname: '',
        fworkspace: '',
        fdate: '',
        ftime: '',
        flocation: '',
        fstatus: '',
        fcaption: '',
        fimg: '',
      },
      text: '',
      date: '',
      time: '',
      Htime: 0,
      imageData: null,
      picture: null,
      uploadValue: 0,
      picker: 'checkin',
      showImgsvg: true,
      showImgpreview: false,
      showCheckin: true,
      showAbsence: false,
      showImgUpload: true,
      waiting: false,
      locationDetail: [],
    }
  },
  updated() {
    if (this.picker === 'checkin') {
      this.showCheckin = true
      this.showAbsence = false
      this.showImgUpload = true
    } else {
      this.showCheckin = false
      this.showAbsence = true
      this.showImgUpload = false
    }
  },
  created() {
    this.getUserDetail()
    const current_time = this.$moment().tz('Asia/Bangkok')
    this.Htime = this.$moment().tz('Asia/Bangkok').format('HH')
    this.Mtime = this.$moment().tz('Asia/Bangkok').format('mm')
    this.form.ftime = this.Htime + ':' + this.Mtime
    this.form.fdate = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
    this.date = this.$moment_timezone().tz('Asia/Bangkok').format('D-MM-YYYY')
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
    previewImage(event) {
      this.waiting = true
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
      const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          this.waiting = false
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
            //this.onSubmit()
          })
        }
      )
      this.showImgsvg = false
      this.showImgpreview = true
    },
    async onSubmit() {
      this.form.fimg = this.picture
      if (
        this.form.fname !== '' &&
        this.form.fworkspace !== '' &&
        this.form.fdate !== '' &&
        this.form.ftime !== '' &&
        this.form.flocation !== '' &&
        this.form.fcaption !== '' &&
        this.form.fimg !== ''
      ) {
        const auth = this.$firebase.auth().currentUser.displayName
        const ref = fireDb.collection('CTW ' + this.date).doc(auth)
        const document = {
          text: this.form,
        }
        console.log('Htime', this.Htime)
        if (this.Htime >= 10) {
          this.form.fstatus = 'Late'
        } else if (this.Htime < 10) {
          this.form.fstatus = 'In Time'
        }

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
    geolocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      } else {
        console.log('Geolocation is not supported by this browser.')
      }
    },
    async showPosition(position) {
      // Use Axios to make a MapQuest API Call
      const address = await axios
        .get(
          'https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ&location=' +
            position.coords.latitude +
            '%2C' +
            position.coords.longitude +
            '&outFormat=json&thumbMaps=false'
        )
        .then((response) => response.data.results[0].locations[0])
      console.log(address)
      this.form.flocation = address.street + ', ' + address.adminArea5 + ', ' + address.adminArea3
    },
    redirect(value) {
      this.$router.push({ path: value })
      console.log(value, 'val')
    },
  },
}
</script>

<style scoped="">
img.preview {
  width: 250px;
}
.toggle-checkbox:checked {
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #68d391;
}
.login {
  /*
    background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
  */
  background: url('~assets/img/work_pic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.formAb {
  height: 600px;
  width: 400px;
}
.picPreview {
  height: 300px;
}
</style>
