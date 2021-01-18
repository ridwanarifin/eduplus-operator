
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s',
    title: 'Edu Plus',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    middleware: ['auth']
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  styleResources: {
    scss: [
      './assets/styles/_main.scss'
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vee-validate'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
    '@nuxtjs/style-resources',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/toast',
    'vue-sweetalert2/nuxt'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URL || 'https://backend.edukasiplus.com'
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/styles/_variables.scss'],
    options: { customProperties: true },
    optionsPath: './vuetify.options.js',
    treeShake: true
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },

  optimizedImages: {
    optimizeImages: true
  },

  // Auth module configureation (https://dev.auth.nuxtjs.org)
  auth: {
    cookie: {
      options: {
        sameSite: true
      }
    },
    strategies: {
      local: {
        token: {
          property: 'access_token'
        },
        endpoints: {
          login: { url: '/api/attempt/login', method: 'post' },
          user: false,
          logout: false
        }
      }
    },
    autoFetchUser: false,
    resetOnError: true
  },

  // vue toasted, configuration (https://github.com/nuxt-community/community-modules/tree/master/packages/toast)
  toast: {
    position: 'top-center',
    fullWidth: true,
    iconPack: 'mdi',
    containerClass: 'px-5',
    action: {
      text: 'Close',
      onClick: (e, obj) => {
        obj.goAway(0)
      }
    },
    register: [
      {
        name: 'api_error',
        message: msg => !msg ? 'Oops...Something went wrong' : msg,
        options: {
          type: 'error',
          theme: 'outline',
          duration: 9000
        }
      },
      {
        name: 'app_loading',
        message: 'Please wait ..',
        options: {
          type: 'info',
          theme: 'outline',
          // duration: 9000,
          icon: 'mdi-information-outline'
        }
      },
      {
        name: 'app_error',
        message: msg => msg,
        options: {
          type: 'error',
          theme: 'outline',
          duration: 9000,
          icon: 'mdi-alert-circle-outline'
        }
      },
      {
        name: 'app_success',
        message: msg => msg,
        options: {
          type: 'success',
          theme: 'outline',
          duration: 9000,
          icon: 'mdi-checkbox-marked-circle-outline'
        }
      }
    ]
  }
}
