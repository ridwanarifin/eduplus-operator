import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

export const state = () => ({
  pending: false,
  currentLogin: {},
  search: '',
  activeMenu: 'Sekolah',
  provinsi: [],
  kabKota: [],
  kecamatan: [],
  kelurahan: []
})

export const mutations = {
  SET_PENDING (state, payload) {
    state.pending = payload
  },
  SET_CURRENT_LOGIN (state, payload) {
    state.currentLogin = _.assign(state.currentLogin, payload)
  },
  SET_SEARCH (state, payload) {
    state.search = payload
  },
  SET_ACTIVE_MENU (state, payload) {
    state.activeMenu = payload
  },
  SET_PROVINSI (state, payload) {
    state.provinsi = payload
  },
  SET_KAB_KOTA (state, payload) {
    state.kabKota = payload
  },
  SET_KECAMATAN (state, payload) {
    state.kecamatan = payload
  },
  SET_KELURAHAN (state, payload) {
    state.kelurahan = payload
  }
}

export const actions = {
  /**
   * login
   */
  async loginAction ({ commit }, payload) {
    commit('SET_PENDING', true)
    this.$toast.global.app_loading()
    await await this.$auth.loginWith('local', { data: payload })
      .then(() => {
        this.$toast.clear()
        commit('SET_CURRENT_LOGIN', payload)
        this.$swal({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang Operator',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(() => {
        this.$toast.clear()
        this.$swal({
          icon: 'error',
          title: 'Login failed',
          text: 'You have entered an invalid username or password'
        })
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },
  /**
   * provinsi
   * GET
   * data provinsi
   */
  async getProvinsi ({ commit }) {
    commit('SET_PENDING', true)
    await this.$axios.$get('/api/search/init')
      .then((response) => {
        commit('SET_PROVINSI', response.province)
      })
      .catch(error => console.warn(error))
      .finally(() => commit('SET_PENDING', false))
  },
  /**
   * kab / kota
   * GET
   * data kab kota dari provinsi yg dipilih
  */
  async getKabKota ({ commit }, args) {
    commit('SET_PENDING', true)
    await this.$axios.$get(`/api/search/get-regency/${args}`)
      .then((response) => {
        commit('SET_KAB_KOTA', response.data)
      })
      .catch(error => console.warn(error))
      .finally(() => commit('SET_PENDING', false))
  },
  /**
   * kecamatan
   * GET
   * data kecamatan dari kabupaten/kota yg dipilih
  */
  async getKecamatan ({ commit }, args) {
    commit('SET_PENDING', true)
    await this.$axios.$get(`/api/search/get-district/${args}`)
      .then((response) => {
        commit('SET_KECAMATAN', response.data)
      })
      .catch(error => console.warn(error))
      .finally(() => commit('SET_PENDING', false))
  },
  /**
   * kelurahan
   * GET
   * data kelurahan dari kecamatan yg dipilih
  */
  async getKelurahan ({ commit }, args) {
    commit('SET_PENDING', true)
    await this.$axios.$get(`/api/search/get-village/${args}`)
      .then((response) => {
        commit('SET_KELURAHAN', response.data)
      })
      .catch(error => console.warn(error))
      .finally(() => commit('SET_PENDING', false))
  }
}

export const plugins = [
  createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })
]
