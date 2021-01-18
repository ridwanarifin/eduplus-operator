import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'
import {
  initFotoSekolah,
  initOperator,
  initPassword,
  initSekolah
} from '~/utils/initData'

export const state = () => ({
  pending: false,
  login: {
    email: 'testEmail2@email.com',
    password: 'test123ABC'
  },
  setting_operator: { ...initOperator },
  setting_password: { ...initPassword },
  sekolah: { ...initSekolah },
  foto_sekolah: { ...initFotoSekolah }
})

export const getters = {
  getField
}

export const mutations = {
  updateField,
  SET_PENDING (state, payload) {
    if (!payload) { state.pending = !state.pending }
    state.pending = payload
  },
  /**
   * operator
  */
  SET_OPERATOR (state, payload) {
    state.setting_operator = _.assign(state.setting_operator, payload)
  },
  /**
   * password
  */
  RESET_PASSWORD (state) {
    state.setting_password = { ...initPassword }
  },
  /**
   * sekolah
  */
  SET_SEKOLAH (state, payload) {
    state.sekolah = _.assign(state.sekolah, payload)
  },
  RESET_SEKOLAH (state) {
    state.sekolah = { ...initSekolah }
  },
  // fasilitas
  ADD_FASILITAS_ROW (state) {
    state.sekolah.facilities.push({
      id: Math.random().toString(36).substr(2, 9),
      text: ''
    })
  },
  DELETE_FASILITAS_ROW (state, payload) {
    const newval = _.filter(
      state.sekolah.facilities,
      obj => obj.id !== payload.id
    )
    state.sekolah.facilities = newval
  },
  // ekstrakurikuler
  ADD_EKSTRAKURIKULER_ROW (state) {
    state.sekolah.extracurricular.push({
      id: Math.random().toString(36).substr(2, 9),
      text: ''
    })
  },
  DELETE_EKSTRAKURIKULER_ROW (state, payload) {
    const newval = _.filter(
      state.sekolah.extracurricular,
      obj => obj.id !== payload.id
    )
    state.sekolah.extracurricular = newval
  },
  /** foto sekolah */
  RESET_FOTO_SEKOLAH (state) {
    state.foto_sekolah = { ...initFotoSekolah }
  }
}

export const actions = {
  /**
   * sekolah
   */
  // get school
  async getSchoolData ({ commit }) {
    commit('SET_PENDING', true)
    await this.$axios.$get('/api/operator/school')
      .then((response) => {
        commit('SET_OPERATOR', response)
        commit('SET_SEKOLAH', response.schools)
      })
      .catch(error => console.warn(error))
      .finally(() => commit('SET_PENDING', false))
  },
  // update school
  async updateSchool ({ commit, state }) {
    const facilities = []; const extracurricular = []
    _.mapValues(state.sekolah.facilities, (obj) => {
      facilities.push(obj.text)
    })
    _.mapValues(state.sekolah.extracurricular, (obj) => {
      extracurricular.push(obj.text)
    })

    commit('SET_PENDING', true)
    await this.$axios.$post(
      '/api/operator/school/request',
      { ...state.sekolah, facilities, extracurricular }
    )
      .then((response) => {
        this.$swal({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data Sekolah berhasil diperbarui.',
          timer: 1500
        })
        commit('RESET_SEKOLAH')
        console.info(response)
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Data Sekolah gagal diperbarui.'
        })
      })
      .finally(() => commit('SET_PENDING', false))
  },
  /** password */
  async updatePassword ({ commit, state }) {
    commit('SET_PENDING', true)
    await this.$axios.$post('/api/operator/change_password', state.setting_password)
      .then((response) => {
        commit('SET_CURRENT_LOGIN',
          { password: state.setting_password.password },
          { root: true }
        )
        this.$swal({
          icon: 'success',
          title: 'Berhasil',
          text: 'Password berhasil diperbarui.',
          timer: 1500
        })
        setTimeout(() => {
          commit('RESET_PASSWORD')
        }, 2000)
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Password gagal diperbarui.'
        })
      })
      .finally(() => {
        commit('SET_PENDING', false)
      })
  },
  /** foto sekolah */
  postFotoSekolah ({ commit, state }) {
    commit('SET_PENDING', true)
    const images = []
    _.mapValues(state.foto_sekolah, (obj) => {
      images.push(obj)
    })
    this.$axios.$post('/api/operator/school/image-upload', images)
      .then((response) => {
        console.info(response)
        this.$swal({
          icon: 'success',
          title: 'Berhasil',
          text: 'Foto Sekolah berhasil disimpan.',
          timer: 1500
        })
        commit('RESET_FOTO_SEKOLAH')
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Gagal',
          text: 'Foto Sekolah gagal disimpan.'
        })
      })
      .finally(() => commit('SET_PENDING', false))
  }
}
