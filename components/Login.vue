<template>
  <div class="h-screen font-sans login bg-cover">
    <div class="mx-auto h-full grid flex-1 justify-center bg-orange bg-opacity-25 items-center">
      <div class="w-full max-w-lg">
        <div class="leading-loose">
          <form class="max-w-sm p-10 bg-white rounded-xl border-xl">
            <img src="~/assets/Createna.png" />
            <div class="border border-gray">
              <input
                v-model="username"
                class="w-full px-5 py-1 text-black rounded focus:outline-none"
                type="text"
                id="username"
                placeholder="USERNAME"
              />
            </div>
            <div class="border border-gray mt-4">
              <input
                v-model="password"
                class="w-full px-5 py-1 text-black rounded focus:outline-none"
                type="password"
                id="password"
                placeholder="PASSWORD"
              />
            </div>

            <div class="mt-4 items-center flex justify-center">
              <button
                @click.prevent="googleSignInPopup"
                class="w-full px-4 py-1 text-white font-light tracking-wider bg-black hover:bg-orange rounded"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
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
      username: '',
      password: '',
      text: {
        displayName: '',
        email: '',
      },
    }
  },
  methods: {
    async googleSignInPopup() {
      if (this.username === 'createder' && this.password === '1234') {
        const provider = new this.$firebase.auth.GoogleAuthProvider()
        const result = await this.$firebase.auth().signInWithPopup(provider)
        console.log(result, 're')
        const user = result.user
        const ref = fireDb.collection('Users').doc(user.displayName)
        const document = {
          text: {
            displayName: user.displayName,
            email: user.email,
          },
        }
        try {
          await ref.set(document)
        } catch (e) {
          console.error(e)
          return
        }
        this.$router.push('/checkin')
      } else if (this.username === 'admin' && this.password === 'admin1234') {
        const provider = new this.$firebase.auth.GoogleAuthProvider()
        const result = await this.$firebase.auth().signInWithPopup(provider)
        console.log(result, 're')
        const user = result.user
        const ref = fireDb.collection('Users').doc(user.displayName)
        const document = {
          text: {
            displayName: user.displayName,
            email: user.email,
          },
        }
        try {
          await ref.set(document)
        } catch (e) {
          console.error(e)
          return
        }
        this.$router.push('/Atmanagement')
      } else {
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
<style>
.login {
  /*
    background: url('https://tailwindadmin.netlify.app/dist/images/login-new.jpeg');
  */
  background: url('~assets/img/work_pic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
