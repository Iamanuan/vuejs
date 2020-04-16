<template>
  <div class="shopcart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list/>

    <!--底部汇总-->
    <cart-bottom-bar />
  </div>
</template>

<script>

  import CartList from "./childComps/CartList";

  import NavBar from "components/common/navbar/NavBar";

  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Shopcar",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // cartLength(){
      //   // return this.$store.state.cartList.length
      //   return this.$store.getters.cartLength
      // }

      //两种语法
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  .shopcart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
