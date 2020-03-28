import Vue from 'vue'
import Vuex from 'vuex'

import {INCREMENT} from "./mutation-types";

//1、安装插件
Vue.use(Vuex)

//2、创建对象
const moduleA = {
  state:{
    name: 'zhangsan'
  },
  mutations:{
    updateName(state,payload){
     state.name =  payload
    }
  },
  getters:{
    fullName(state){
      return state.name + '11111'
    },
    fullName2(state,getter){
      return getter.fullName + '222222'
    },
    fullName3(state,getter,rootState){
      return getter.fullName2 + rootState.counter
    }
  },
  actions:{
    aUpdateName(context){
      console.log(context);
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      },1000)
    }
  }
}

const store = new Vuex.Store({
  state:{
    counter:1000,
    student:[
      {id: 110, name: 'fy', age: 16},
      {id: 111, name: 'kobe', age: 18},
      {id: 112, name: 'james', age: 20},
      {id: 113, name: 'curry', age: 22}
    ],
    info:{
      name: 'kobe',
      age: 41,
      height: 1.98
    }
  },
  mutations:{
    // 方法
    [INCREMENT](state){
      state.counter++
    },
    decrement(state){
      state.counter--
    },
    incrementCount(state,payload){
      // console.log(count);
      // state.counter += count
      state.counter += payload.count
    },
    incrementStudent(state,stu){
      state.student.push(stu)
    },
    updateInfo(state){
      state.info.name = 'fy'

      // setTimeout(() => {
      //   state.info.name = 'fy'
      // },1000)

      // 以下方式做不到响应式
      // state.info['address'] = '洛杉矶'
      // delete state.info.age

      // 响应式
      // Vue.set(state.info,'address', '洛杉矶')
      // Vue.delete(state.info,'age')
    }
  },
  actions:{
    // context 上下文
    // aUpdateInfo(context,payload){
    //   setTimeout(() => {
    //     context.commit('updateInfo')
    //     console.log(payload.message);
    //     payload.success()
    //   },1000)
    // }

    aUpdateInfo(context,payload){
      return new Promise((resolve, reject) =>{
        setTimeout(() => {
          context.commit('updateInfo')
          console.log(payload);
          resolve('111111')
        },1000)
      })
    }

  },
  getters:{
    powerCounter(state){
      return state.counter * state.counter
    },
    more20stu(state){
      return state.student.filter(s => s.age >= 20)
    },
    more20stuLength(state,getters){
      return getters.more20stu.length
    },
    moreAgeStu(state){
      // return function (age) {
      //   return state.student.filter(s => s.age >= age)
      // }

      return age => {
        return state.student.filter(s => s.age >= age)
      }
    }
  },
  modules:{
    a: moduleA
  }
})

//3、导出store对象
export default store

// 对象的解构
const obj = {
  name: 'fy',
  age: 16,
  height: 1.66,
  address: '洛杉矶'
}

const {age, name, height} = obj
console.log(name);
