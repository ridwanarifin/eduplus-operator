import Vue from 'vue'
import _ from 'lodash'
import {
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import {
  confirmed,
  required,
  email,
  double
} from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} is required.'
})

extend('email', {
  ...email,
  message: '{_field_} is not valid.'
})

extend('confirmed', confirmed)

extend('double', double)

const components = [{
  name: 'ValidationObserver',
  component: ValidationObserver
}, {
  name: 'ValidationProvider',
  component: ValidationProvider
}]

_.each(components, ({ name, component }) => {
  Vue.component(name, component)
})
