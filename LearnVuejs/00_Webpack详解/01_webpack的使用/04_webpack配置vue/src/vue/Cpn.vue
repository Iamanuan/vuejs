<template>
  <div>
    <h2>我是Cpn组件的标题</h2>
    <p>我是Cpn组件的内容</p>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
  export default {
    name: "Cpn",
    data(){
      return{
        name:"fy"
      }
    }
  }
</script>

<style scoped>

</style>