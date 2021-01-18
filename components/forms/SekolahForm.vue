<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form @submit.prevent="handleSubmit(on_submit)" @reset.prevent="on_reset">
      <!-- data sekolah -->
      <div class="subtitle-2 mb-3">
        Data Sekolah
      </div>
      <v-row justify="space-between" justify-sm="start">
        <!-- nama sekolah -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="nama sekolah"
            rules="required"
          >
            <v-text-field
              v-model="name"
              label="Nama Sekolah"
              placeholder="Masukan nama sekolah"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>

        <!-- jenjang pendidikan -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jenjang sekolah"
            rules="required"
          >
            <v-autocomplete
              v-model="educational_stage"
              label="Jenjang Pendidikan"
              placeholder="Pilih jenjang pendidikan"
              :items="items"
              item-text="text"
              item-value="value"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>

        <!-- kurikulum -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="kurikulum"
            rules="required"
          >
            <v-text-field
              v-model="curriculum"
              label="Kurikulum"
              placeholder="Masukan kurikulum"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>

        <!-- npsn -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="npsn"
            rules="required"
          >
            <v-text-field
              v-model="npsn"
              label="NPSN"
              placeholder="Masukan NPSN"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- status -->
      <v-row justify="space-between" justify-sm="start">
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="status sekolah"
            rules="required"
          >
            <v-radio-group
              v-model="status"
              :error-messages="errors"
              label="Status Sekolah"
              required
            >
              <v-row justify="space-between">
                <v-col cols="auto" sm>
                  <v-radio
                    color="white"
                    label="Negeri"
                    value="1"
                    class="radio-form rounded py-3 pl-3 pr-4"
                  />
                </v-col>
                <v-col cols="auto" sm>
                  <v-radio
                    color="white"
                    label="Swasta"
                    value="0"
                    class="radio-form rounded py-3 pl-3 pr-4"
                  />
                </v-col>
              </v-row>
            </v-radio-group>
          </validation-provider>
        </v-col>
      </v-row>
      <v-divider class="mt-5 mb-10 grey" />
      <div class="subtitle-2 mb-3">
        Data Sekolah
      </div>
      <v-row justify="space-between" justify-sm="start">
        <!-- alamat -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="alamat"
            rules="required"
          >
            <v-text-field
              v-model="address"
              label="Alamat"
              placeholder="Masukan alamat"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>

        <!-- provinsi -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="provinsi"
            rules="required"
          >
            <v-autocomplete
              v-model="province_id"
              label="Provinsi"
              placeholder="Pilih provinsi"
              :items="dataProvinsi"
              item-text="name"
              item-value="id"
              :loading="loading || loadingRoot"
              :disabled="loading || loadingRoot"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
              @change="on_prov_change"
            />
          </validation-provider>
        </v-col>

        <!-- kab / kota -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="kota / kabupaten"
            rules="required"
          >
            <v-autocomplete
              v-model="regency_id"
              label="Kota / Kabupaten"
              placeholder="Pilih kota / kabupaten"
              :items="dataKabKota"
              item-text="name"
              item-value="id"
              :loading="loading || loadingRoot"
              :disabled="loading || loadingRoot || !province_id"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
              @change="on_kabkota_change"
            />
          </validation-provider>
        </v-col>

        <!-- kecamatan -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="kecamatan"
            rules="required"
          >
            <v-autocomplete
              v-model="district_id"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              :items="dataKecamatan"
              item-text="name"
              item-value="id"
              :loading="loading || loadingRoot"
              :disabled="loading || loadingRoot || !regency_id"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
              @change="on_kecamatan_change"
            />
          </validation-provider>
        </v-col>

        <!-- kelurahan -->
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="kelurahan"
            rules="required"
          >
            <v-autocomplete
              v-model="village_id"
              label="Kelurahan"
              placeholder="Pilih kelurahan"
              :items="dataKelurahan"
              item-text="name"
              item-value="id"
              :loading="loading || loadingRoot"
              :disabled="loading || loadingRoot || !district_id"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <!-- end data sekolah -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- kontak sekolah -->
      <div class="subtitle-2 mb-3">
        Kontak Sekolah
      </div>
      <!-- phone number -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="nomor telepon"
            rules="required"
          >
            <v-text-field
              v-model="phone_number"
              label="Nomor Telepon"
              placeholder="Masukan nomor telepon"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- email -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              label="Email"
              placeholder="Masukan email"
              type="email"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- website -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="website"
          >
            <v-text-field
              v-model="website"
              label="Website"
              placeholder="Masukan link website"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <!-- end kontak sekolah -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- informasi sekolah -->
      <div class="subtitle-2 mb-3">
        Informasi Sekolah
      </div>
      <!-- kepala sekolah -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="nama kepala sekolah"
            rules="required"
          >
            <v-text-field
              v-model="headmaster"
              label="Kepala Sekolah"
              placeholder="Masukan nama kepala sekolah"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- jumlah siswa -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jumlah siswa"
            rules="required"
          >
            <v-text-field
              v-model="total_student"
              label="Jumlah Siswa"
              placeholder="Masukan jumlah siswa"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              type="number"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- akreditasi -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="akreditasi"
            rules="required"
          >
            <v-autocomplete
              v-model="accreditation"
              label="Akreditasi"
              placeholder="Pilih akreditasi"
              :items="['A', 'B', 'C']"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- jam sekolah -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jam sekolah masuk"
            rules="required"
          >
            <v-text-field
              v-model="schools_hour"
              label="Jam Sekolah"
              placeholder="Masukan jam sekolah"
              hint="contoh: 08.30-15.30/pagi-sore"
              persistent-hint
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <!-- end informasi sekolah -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- biaya sekolah -->
      <div class="subtitle-2 mb-3">
        Biaya Sekolah
      </div>
      <!-- uang pangkal -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="uang pangkal"
            rules="required"
          >
            <v-text-field
              v-model="etf_cost"
              label="Uang Pangkal"
              placeholder="Masukan nilai uang pangkal"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              prefix="Rp."
              type="number"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- spp bulanan -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="spp bulanan"
            rules="required"
          >
            <v-text-field
              v-model="spp_cost"
              label="SPP Bulanan"
              placeholder="Masukan nilai spp bulanan"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              prefix="Rp."
              type="number"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="uang kegiatan"
            rules="required"
          >
            <v-text-field
              v-model="activities_cost"
              label="Uang Kegiatan"
              placeholder="Masukan nilai uang kegiatan"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              prefix="Rp."
              type="number"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- uang buku -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="uang buku"
            rules="required"
          >
            <v-text-field
              v-model="book_cost"
              label="Uang Buku"
              placeholder="Masukan nilai uang buku"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              prefix="Rp."
              type="number"
              flat
              outlined
              required
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <!-- potongan / diskon -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="potongan / diskon"
            rules="required"
          >
            <label class="text--secondary" for="discount">
              Potongan / Diskon
            </label>
            <div class="my-2 ml-sm-9">
              {{ discount }}%
            </div>
            <v-slider
              id="discount"
              v-model="discount"
              class="align-center"
              color="orange"
              :min="0"
              :max="100"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              :append-icon="icon.plus"
              :prepend-icon="icon.minus"
              thumb-label
              hide-details
              required
              @click:append.stop="discount++"
              @click:prepend.stop="discount--"
            />
          </validation-provider>
        </v-col>
      </v-row>
      <!-- end biaya sekolah -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- pendaftaran -->
      <div class="subtitle-2 mb-3">
        Pendaftaran
      </div>
      <!-- jadwal pendaftaran -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jadwal pendaftaran"
            rules="required"
          >
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              transition="slide-y-transition"
              offset-x
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="registration"
                  label="Jadwal Pendaftaran"
                  placeholder="Pilih jadwal pendaftaran"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :prepend-icon="icon.calendar"
                  flat
                  outlined
                  required
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="registration"
                @input="menu1 = false"
              />
            </v-menu>
          </validation-provider>
        </v-col>
      </v-row>

      <!-- jadwal pengumuman -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jadwal pengumuman"
            rules="required"
          >
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              transition="slide-y-transition"
              offset-x
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="annoucement"
                  label="Jadwal Pengumuman"
                  placeholder="Pilih jadwal pengumuman"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :prepend-icon="icon.calendar"
                  flat
                  outlined
                  required
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="annoucement"
                @input="menu2 = false"
              />
            </v-menu>
          </validation-provider>
        </v-col>
      </v-row>

      <!-- jadwal daftar ulang -->
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="jadwal daftar ulang"
            rules="required"
          >
            <v-menu
              v-model="menu3"
              :close-on-content-click="false"
              transition="slide-y-transition"
              offset-x
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="re_registration"
                  label="Jadwal Daftar Ulang"
                  placeholder="Pilih jadwal daftar ulang"
                  :loading="loading"
                  :disabled="loading"
                  :error-messages="errors"
                  :prepend-icon="icon.calendar"
                  flat
                  outlined
                  required
                  readonly
                  clearable
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="re_registration"
                @input="menu3 = false"
              />
            </v-menu>
          </validation-provider>
        </v-col>
      </v-row>
      <!-- end pendaftaran -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- fasilitas -->
      <div class="subtitle-2 mb-3">
        Data Sekolah
      </div>
      <v-row v-for="(item, index) in facilities" :key="'fasilitas-' + index">
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="fasilitas"
            rules="required"
          >
            <v-text-field
              v-model="item.text"
              :label="`Fasilitas ${index + 1}`"
              :placeholder="`Masukan fasilitas ${index + 1}`"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              :append-outer-icon="index ? icon.trash : null"
              flat
              outlined
              required
              clearable
              @click:append-outer.prevent="on_delete_fasilitas_row(item)"
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-btn text color="primary" @click.prevent="on_add_fasilitas_row">
        <span>Tambah fasilitas</span>
        <v-icon class="ml-2" v-text="icon.plus" />
      </v-btn>
      <!-- end fasilitas -->
      <v-divider class="mt-5 mb-10 grey" />
      <!-- ekstrakulikuler -->
      <div class="subtitle-2 mb-3">
        Ekstrakulikuler
      </div>
      <v-row v-for="(item, index) in extracurricular" :key="'ekstrakurikuler-' + index">
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="ekstrakurikuler"
            rules="required"
          >
            <v-text-field
              v-model="item.text"
              :label="`Ekstrakurikuler ${index + 1}`"
              :placeholder="`Masukan ekstrakurikuler ${index + 1}`"
              :loading="loading"
              :disabled="loading"
              :error-messages="errors"
              :append-outer-icon="index ? icon.trash : null"
              flat
              outlined
              required
              clearable
              @click:append-outer.prevent="on_delete_ekstrakurikuler_row(item)"
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-btn text color="primary" @click.prevent="on_add_ekstrakurikuler_row">
        <span>Tambah ekstrakurikuler</span>
        <v-icon class="ml-2" v-text="icon.plus" />
      </v-btn>
      <!-- end ekstrakulikuler -->

      <v-divider class="mt-10 mb-5 grey" />
      <v-row align-sm="center" justify-sm="center">
        <v-col cols="12" sm="auto">
          <v-btn text color="primary" type="reset">
            cancel
          </v-btn>
        </v-col>
        <v-col cols="12" sm="auto">
          <v-btn color="primary" type="submit">
            save
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import {
  mdiPercentOutline,
  mdiMinusCircleOutline,
  mdiPlusCircleOutline,
  mdiCalendarOutline,
  mdiTrashCanOutline
} from '@mdi/js'
import { jenjangItems } from '~/utils/initData'
export default {
  async fetch () {
    await this.$store.dispatch('getProvinsi')
  },
  data: () => ({
    items: jenjangItems,
    icon: {
      percent: mdiPercentOutline,
      plus: mdiPlusCircleOutline,
      minus: mdiMinusCircleOutline,
      calendar: mdiCalendarOutline,
      trash: mdiTrashCanOutline
    },
    menu1: false,
    menu2: false,
    menu3: false
  }),
  computed: {
    ...mapFields('form', [
      'sekolah.name',
      'sekolah.educational_stage',
      'sekolah.curriculum',
      'sekolah.npsn',
      'sekolah.status',

      'sekolah.address',
      'sekolah.province_id',
      'sekolah.regency_id',
      'sekolah.district_id',
      'sekolah.village_id',

      'sekolah.phone_number',
      'sekolah.email',
      'sekolah.website',

      'sekolah.headmaster',
      'sekolah.total_student',
      'sekolah.accreditation',
      'sekolah.schools_hour',

      'sekolah.etf_cost',
      'sekolah.spp_cost',
      'sekolah.activities_cost',
      'sekolah.book_cost',
      'sekolah.discount',

      'sekolah.registration',
      'sekolah.annoucement',
      'sekolah.re_registration'
    ]),
    ...mapMultiRowFields('form', [
      'sekolah.facilities',
      'sekolah.extracurricular'
    ]),
    ...mapState({
      loading: s => s.form.pending,
      loadingRoot: s => s.pending,
      dataProvinsi: s => s.provinsi,
      dataKabKota: s => s.kabKota,
      dataKecamatan: s => s.kecamatan,
      dataKelurahan: s => s.kelurahan
    }),
    observer () { return this.$refs.observer }
  },
  methods: {
    async on_submit () {
      await this.$store.dispatch('form/updateSchool')
    },
    on_reset () {
      this.observer.reset()
      this.$store.commit('form/RESET_SEKOLAH')
    },
    /** prov */
    async on_prov_change (args) {
      if (_.isNil(args)) { return }
      await this.$store.dispatch('getKabKota', args)
    },
    /** kab kota */
    async on_kabkota_change (args) {
      if (_.isNil(args)) { return }
      await this.$store.dispatch('getKecamatan', args)
    },
    /** kecamatan */
    async on_kecamatan_change (args) {
      if (_.isNil(args)) { return }
      await this.$store.dispatch('getKelurahan', args)
    },
    /**
     * sekolah
     *- fasilitas, ekstrakurikuler
     *  - tambah row
     *  - hapus row
     */
    on_add_fasilitas_row () {
      this.$store.commit('form/ADD_FASILITAS_ROW')
    },
    on_delete_fasilitas_row (args) {
      this.$store.commit('form/DELETE_FASILITAS_ROW', args)
    },
    on_add_ekstrakurikuler_row () {
      this.$store.commit('form/ADD_EKSTRAKURIKULER_ROW')
    },
    on_delete_ekstrakurikuler_row (args) {
      this.$store.commit('form/DELETE_EKSTRAKURIKULER_ROW', args)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-radio.radio-form {
  background: #FFFFFF !important;
  border: 0.4px solid #9B9B9B !important;
  ::v-deep .v-label {
    font-weight: 600 !important;
  }

  ::v-deep &.v-item--active {
    background: #1976d2 !important;
    border: 0.4px solid #1976d2 !important;
    .v-label {
      color: white !important;
    }
  }
}

::v-deep .v-text-field--outlined {
  .v-input__control {
    .v-input__slot {
      background: white !important;
    }
  }
}
</style>
