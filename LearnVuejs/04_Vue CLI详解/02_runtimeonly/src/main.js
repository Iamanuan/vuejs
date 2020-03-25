import Vue from 'vue'
import App from './App'

console.log(App);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // render: h => h(App)
  render: function (h) {
      return h(App)
  }

  //runtime-only(v2)
  //render -> vdom -> UI
})

