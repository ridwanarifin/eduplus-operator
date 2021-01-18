<template>
  <v-app dark>
    <drawer
      :clipped="clipped"
      :drawer="drawer"
      :mini-variant="miniVariant"
    />

    <app-bar
      :drawer="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      @on-drawer="on_click_drawer"
      @on-minivariant="on_click_minivariant"
      @on-clipped="on_click_clipped"
    />

    <v-main :style="{background: '#F5F5FB', paddingBottom: '150px'}">
      <toolbar />
      <nuxt />
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ $moment().year() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from '~/components/AppBar.vue'
import Drawer from '~/components/Drawer.vue'
import Toolbar from '~/components/Toolbar.vue'
export default {
  components: {
    AppBar,
    Drawer,
    Toolbar
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      drawerActiveName: ''
    }
  },
  methods: {
    // drawer
    on_click_drawer (args) {
      this.drawer = args
    },
    on_click_minivariant (args) {
      this.miniVariant = args
    },
    on_click_clipped (args) {
      this.clipped = args
    }
  }
}
</script>
