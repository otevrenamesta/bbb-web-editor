/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import C from './index.js'
import DynComponents from './bootstrap-vue-dynamic-form/index.js'
// import { 
//   WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR 
// } from './bootstrap-vue-dynamic-form/components/file.js'

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
// VeeValidate.extend('required', VeeValidateRules.required)
// VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)
Vue.component('DynamicForm', )

new Vue({
  store,
  components: { mycomponent: C.List },
  template: `
  <mycomponent :cfg="{url: '/api/tasks'}" />
  `
}).$mount('#app')
