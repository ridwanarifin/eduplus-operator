<template>
  <v-card class="mx-auto pa-10" max-width="500" rounded>
    <lazy-image
      :src="require('~/static/icon.png?webp')"
      class="mx-auto mb-10"
      style="max-width: 190px"
    />

    <lazy-login-form />
  </v-card>
</template>

<script>
export default {
  layout: 'auth'
}
</script>
