import api from '@/services/api'

const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  getSession() {
    return api.get('/auth/me')
  },

  logout() {
    return api.post('/auth/logout')
  },
}

export default authService