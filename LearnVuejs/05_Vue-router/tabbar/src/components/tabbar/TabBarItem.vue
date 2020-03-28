<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type: String,
        default: '#d81e06'
      }
    },
    data(){
      return{
        // isActive: true
      }
    },
    methods:{
      itemClick(){
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        //要检索的字符串没有出现，则返回-1
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 13px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top: 3px;
  }
</style>
