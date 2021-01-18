<template>
  <v-container class="mx-auto">
    <lazy-foto-sekolah-form />
  </v-container>
</template>

<script>
export default {
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
