import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
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
