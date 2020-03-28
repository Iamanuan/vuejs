import {INCREMENT} from "./mutation-types";

export default {
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
}
