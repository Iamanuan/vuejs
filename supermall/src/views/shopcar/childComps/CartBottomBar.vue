<template>
  <div class="bottom-bar">
    <check-button class="select-all"
                  :is-checked="isSelectAll" @click.native="checkedClick"/>
    <span>全选</span>
    <span class="total-price">合计: {{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>

  import CheckButton from "components/content/checkButton/CheckButton";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return '¥  ' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) =>{
          return item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if (this.cartList.length === 0) return false

        //1、使用filter
        // return !(this.cartList.filter(item => !item.checked).length)

        //2、使用find
        return !(this.cartList.find(item => !item.checked))

        //3、普通遍历
        // for(let item of this.cartList){
        //   if (!item.checked){
        //     return false
        //   }
        // }
        //
        // return true
      }
    },
    methods:{
      checkedClick(){
        if(this.isSelectAll){ // 全部选中
          this.cartList.forEach(item => item.checked = false)
        }else{  //部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000 )
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #EEEEEE;

    position: relative;
    box-shadow: 0 -2px 3px rgba(0,0,0,.2);
    font-size: 14px;
    color: #888888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-bar .select-all{
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price{
    margin-left: 15px;
    font-size: 16px;
    color: #666666;
  }

  .bottom-bar .buy-product{
    background-color: orangered;
    color: #ffffff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
