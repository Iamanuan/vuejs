// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

console.log(App);
const Cpn = {
  template: "<div>我是组件{{message}}</div>",
  data(){
    return {
      message:'fy'
    }
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'


  render:function (createElement) {
    //1、普通用法
    // return createElement("h2",
    //   {class:"box"},
    //   ["hello world",
    //   createElement("button",["按钮"])
    //   ])

    //2、传入组件对象
    // return createElement(Cpn)

    return createElement(App)
  }


  //runtime-compiler(v1)
  //template -> ast -> render -> vdom -> UI

  //runtime-only(v2)
  //1、性能更高
  //2、代码量更少，比v1少6kb
  //render -> vdom -> UI
})

