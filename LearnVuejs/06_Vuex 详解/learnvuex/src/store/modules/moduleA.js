export default {
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
