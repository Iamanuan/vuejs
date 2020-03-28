<template>
  <div>
    <h2>我是用户界面</h2>
    <p>我是用户界面内容，嘻嘻嘻</p>
    <h2>{{userId}}</h2>
    <h2>{{$route.params.userId}}</h2>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script>
  export default {
    name: "User",
    created() {
      console.log('User created');
      // document.title=('用户')
    },
    destroyed() {
      console.log('User destroyed');
    },
    computed: {
      userId() {
        return this.$route.params.userId
      }
    },
    methods: {
      btnClick() {
        //所有的组件都继承自Vue类的原型
        console.log(this.$router)
        console.log(this.$route)

        // this.test()

        console.log(this.name)
      }
    },
    beforeRouteLeave(to,from,next){
      // console.log('User beforeRouteLeave');
      next()
    }
  }
</script>

<style scoped>

</style>
