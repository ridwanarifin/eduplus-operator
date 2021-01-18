<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form @submit.prevent="handleSubmit(on_submit)" @reset="on_reset">
      <v-row justify-sm="space-between">
        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-show="false"
            v-slot="{ errors }"
            name="password default"
            vid="confirmation"
          >
            <v-text-field
              v-model="$store.state.currentLogin.password"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              hidden
            />
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="password default"
            rules="required|confirmed:confirmation"
          >
            <v-text-field
              v-model="old_password"
              label="Password Default"
              placeholder="Masukan password default"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :type="show.first ? 'text' : 'password'"
              :append-icon="show.first ? icon.off : icon.on"
              flat
              outlined
              required
              clearable
              @click:append.stop="show.first = !show.first"
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="new password"
            rules="required"
            vid="password"
          >
            <v-text-field
              v-model="password"
              label="Password Baru"
              placeholder="Masukan password baru"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :type="show.second ? 'text' : 'password'"
              :append-icon="show.second ? icon.off : icon.on"
              flat
              outlined
              required
              clearable
              @click:append.stop="show.second = !show.second"
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <validation-provider
            v-slot="{ errors }"
            name="new password"
            rules="required|confirmed:password"
          >
            <v-text-field
              v-model="c_password"
              label="Konfirmasi Password Baru"
              placeholder="Ketik ulang password baru"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :type="show.third ? 'text' : 'password'"
              :append-icon="show.third ? icon.off : icon.on"
              flat
              outlined
              required
              clearable
              @click:append.stop="show.third = !show.third"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-divider class="my-10 grey" />

      <v-row align-sm="center" justify-sm="center">
        <slot>
          <v-col cols="auto">
            <v-btn text color="primary" type="reset">
              cancel
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn color="primary" type="submit">
              save
            </v-btn>
          </v-col>
        </slot>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    show: {
      first: false,
      second: false,
      third: false
    },
    icon: {
      on: mdiEyeOutline,
      off: mdiEyeOffOutline
    }
  }),
  computed: {
    ...mapFields('form', [
      'setting_password.old_password',
      'setting_password.password',
      'setting_password.c_password'
    ]),
    loading () { return this.$store.state.form.pending },
    observer () { return this.$refs.observer }
  },
  methods: {
    async on_submit () {
      await this.$store.dispatch('form/updatePassword')
        .finally(() => this.observer.reset())
    },
    on_reset () {
      this.observer.reset()
      this.$store.commit('form/RESET_PASSWORD')
    }
  }
}
</script>
