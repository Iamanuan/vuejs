<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" :probe-type="3 " @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shopInfo" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"/>
      <goods-list :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scorll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  // import Toast from "components/common/toast/Toast";

  import {getDetail,getRecommend, Goods, Shop, GoodsParam} from "network/datail";

  import {itemListenerMixin, backTopMixin} from "common/mixin";
  import {debouce} from "common/utils";

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components:{
      Scroll,
      GoodsList,
      // Toast,
      DetailNavBar,
      DetailBottomBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo
    },
    data(){
      return{
        iid: null,
        topImages: [],
        goods: {},
        shopInfo:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        message:'',
        show:false
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid

      //2、根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        //1、获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        //2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns , data.shopInfo.services)

        //3、创建店铺信息的对象
        this.shopInfo = new Shop(data.shopInfo)

        //4、保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5、获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6、取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }

        //根据最新的数据，对应的DOM已经被渲染出来
        //但是图片依然没有加载完
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        //   console.log(this.themeTopYs);
        // })
      })

      //3、获取推荐信息
      getRecommend().then(res => {
        // console.log(res);
        this.recommendList = res.data.list
      })

      //4、给getThemeTopY赋值、防抖
      this.getThemeTopY = debouce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      })
    },
    methods:{
      ...mapActions(['addCart']),
      detailImageLoad(){
        this.newRefresh()
        // this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      contentScroll(position){

        //1、获取Y值
        const positionY = -position.y

        //2、positionY和主题中值进行对比
        let length = this.themeTopYs.length
        //普通做法：
        // for(let i = 0; i < length; i++){
        //
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     this.$refs.detailNav.currentIndex = this.currentIndex
        //   }
        // }

        //hack做法
        for (let i =0; i < length - 1; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }

        //3、是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        //1、获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2、将商品添加到购物车里(1.Promise 2.mapActions)
        // this.$router.cartList.push(product)
        // this.$store.commit('addCart',product )
        console.log(product);

        // this.addCart(product).then(res => {
        //   console.log(res);
        // })

        this.$store.dispatch('addCart',product).then(res => {
          // this.show = true
          // this.message = res
          //
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)
          //
          // console.log(res);

          console.log(this.$toast);

          this.$toast.show(res,1500)
        })

      }
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('detailImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }

  .content{
    height: calc(100% - 44px - 58px);
  }

</style>
