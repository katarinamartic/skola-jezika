import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => {
      // Provjeri localStorage ako store nije ažuriran
      if (!state.isLoggedIn) {
        const token = localStorage.getItem('auth_token')
        const email = localStorage.getItem('user_email')
        return !!(token && email)
      }
      return !!state.token && state.isLoggedIn
    }
  },

  actions: {
    login(userData, token) {
      this.user = userData
      this.token = token
      this.isLoggedIn = true

      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_email', userData.email)
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false

      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_email')
    },

    checkAuth() {
      const token = localStorage.getItem('auth_token')
      const email = localStorage.getItem('user_email')

      if (token && email) {
        this.login({ email }, token)
        return true
      }
      return false
    }
  }
})
