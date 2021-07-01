/* global Vue, VueMarkdown */
import './vuecustoms.js'
import store from './store.js'
import C from '../index.js'
import DynComponents from './bootstrap-vue-dynamic-form/index.js'
import DynamicForm from './components/dynamicform.js'
// import { 
//   WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR 
// } from './bootstrap-vue-dynamic-form/components/file.js'

// axios.defaults.headers.common['Cache-Control'] = 'no-cache';

const router = new VueRouter({
  routes: [{ 
    path: '/', 
    component: C, 
    props: {
      cfg: {
        label: 'Editor webu',
        url: '/api/tasks',
        routesUrl: '/api/routes.json',        
        apiUrl: '/api/',
        dataUrl: '/data/',
        parent: '/'
      }
    } 
  }]
})

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
// VeeValidate.extend('required', VeeValidateRules.required)
// VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)
Vue.component('DynamicForm', DynamicForm)

new Vue({
  router,
  store,
  template: '<router-view :key="$route.fullPath"></router-view>'
}).$mount('#app')
