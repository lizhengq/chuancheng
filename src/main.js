
// import Vue from 'vue'
import App from './App'
import router from '@/router'
import Local from 'com/li-local'
import Model from 'com/li-model'
import Tool from 'com/li-tool'


Vue.config.productionTip = false
Vue.prototype.$local=Local
Vue.prototype.$model=Model
Vue.prototype.$tool=Tool

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
