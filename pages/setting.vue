<template>
  <v-container class="mx-auto">
    <div class="subtitle-2 mb-3">
      Data Operator
    </div>
    <lazy-data-operator-form />
    <v-divider class="my-5 grey" />
    <div class="subtitle-2 mb-3">
      Ganti Password
    </div>
    <lazy-password-form />
  </v-container>
</template>

<script>

export default {
  async fetch () {
    await this.$store.dispatch('form/getSchoolData')
  }
}
</script>
