// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import bar from './plug/bar'
import barAudio from './plug/barAudio'


Vue.config.productionTip = false
Vue.component('bar', bar)
Vue.component('barAudio', barAudio)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
