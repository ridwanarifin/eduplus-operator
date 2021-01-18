<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form @submit.prevent="handleSubmit(on_submit)" @reset.prevent="on_reset">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="foto sekolah"
            rules="required"
          >
            <v-file-input
              v-model="image1"
              label="Foto Sekolah 1"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :prepend-icon="icon.image"
              flat
              outlined
              required
              show-size
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="foto sekolah"
            rules="required"
          >
            <v-file-input
              v-model="image2"
              label="Foto Sekolah 2"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :prepend-icon="icon.image"
              flat
              outlined
              required
              show-size
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="foto sekolah"
            rules="required"
          >
            <v-file-input
              v-model="image3"
              label="Foto Sekolah 3"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :prepend-icon="icon.image"
              flat
              outlined
              required
              show-size
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="foto sekolah"
            rules="required"
          >
            <v-file-input
              v-model="image4"
              label="Foto Sekolah 4"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :prepend-icon="icon.image"
              flat
              outlined
              required
              show-size
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="foto sekolah"
            rules="required"
          >
            <v-file-input
              v-model="image5"
              label="Foto Sekolah 5"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :prepend-icon="icon.image"
              flat
              outlined
              required
              show-size
              clearable
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-divider class="my-10 grey" />

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

import { mdiImageOutline } from '@mdi/js'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    icon: {
      image: mdiImageOutline
    }
  }),
  computed: {
    ...mapFields('form', [
      'foto_sekolah.image1',
      'foto_sekolah.image2',
      'foto_sekolah.image3',
      'foto_sekolah.image4',
      'foto_sekolah.image5'
    ]),
    loading () { return this.$store.state.form.pending },
    observer () { return this.$refs.observer }
  },
  methods: {
    on_submit () {
      this.$store.dispatch('form/postFotoSekolah')
    },
    on_reset () {
      this.$store.commit('form/RESET_FOTO_SEKOLAH')
      this.observer.reset()
    }
  }
}
</script>
