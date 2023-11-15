import { defineStore } from 'pinia'
import * as AuthAPI from '@/services/auth.js'
import router from '@/router/index.js'

export const usePiniaStore = defineStore('globals', {
  state: () => ({
    isLoggedIn: 'false',
    nickname: null
  }),
  actions: {
    login(loginData) {
      return new Promise((resolve, reject) => {
        AuthAPI.login(loginData)
          .then((res) => {
            this.setLoginStatus('true')
            this.setNickname(res.data.nickname)
            resolve(res)
          }).catch((err) => reject(err))
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        AuthAPI.logout()
          .then((res) => {
            this.$reset() // reset all states
            router.push('/').then(() => { location.reload() })
            resolve(res)
          }).catch((err) => reject(err))
      })
    },
    setLoginStatus(status) {
      this.isLoggedIn = status
    },
    setNickname(status) {
      this.nickname = status
    }
  },
  persist: {
    storage: sessionStorage,
  },
})