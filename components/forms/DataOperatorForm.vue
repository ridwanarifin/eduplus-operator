<template>
  <form>
    <v-row justify-sm="space-between">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="name"
          label="Nama"
          :loading="loading"
          flat
          readonly
          outlined
          required
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="position"
          label="Jabatan"
          :loading="loading"
          flat
          readonly
          outlined
          required
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :loading="loading"
          flat
          readonly
          outlined
          required
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="phone_number"
          label="Telepon"
          :loading="loading"
          flat
          readonly
          outlined
          required
        />
      </v-col>
    </v-row>
  </form>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  computed: {
    ...mapFields('form', [
      'setting_operator.name',
      'setting_operator.position',
      'setting_operator.email',
      'setting_operator.phone_number'
    ]),
    loading () { return this.$store.state.form.pending }
  }
}
</script>
