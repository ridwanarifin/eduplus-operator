<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(on_submit)">
      <validation-provider v-slot="{ valid, errors }" name="e-mail" rules="required|email">
        <v-text-field
          v-model="email"
          class="mb-5"
          label="E-mail"
          type="email"
          :success="valid"
          :error-messages="errors"
          :disabled="loading"
          :loading="loading"
          required
        />
      </validation-provider>

      <validation-provider v-slot="{ valid, errors }" name="password" rules="required">
        <v-text-field
          v-model="password"
          class="mb-5"
          label="Password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? icons.off : icons.on"
          :success="valid"
          :error-messages="errors"
          :disabled="loading"
          :loading="loading"
          @click:append.stop="show = !show"
        />
      </validation-provider>

      <div class="text-center pt-8">
        <v-btn width="160" color="primary" type="submit">
          Masuk
        </v-btn>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import {
  mdiEyeOutline,
  mdiEyeOffOutline
} from '@mdi/js'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => ({
    icons: {
      on: mdiEyeOutline,
      off: mdiEyeOffOutline
    },
    show: false
  }),
  computed: {
    ...mapFields('form', [
      'login.email',
      'login.password'
    ]),
    loading () { return this.$store.state.pending },
    observer () { return this.$refs.observer }
  },
  methods: {
    async on_submit () {
      await this.$store.dispatch('loginAction', {
        email: this.email,
        password: this.password
      })
        .finally(() => {
          this.observer.reset()
        })
    }
  }
}
</script>
