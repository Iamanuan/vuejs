import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}). $mount('#app')

//继承
// class Animal {
//   run(){}
// }
//
// class Person extends Animal{
//   // run(){}
// }
//
// class Dog extends Animal{
//   // run(){}
// }
