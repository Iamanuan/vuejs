<template>
  <div id="home">
    <test/>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scorll/Scroll";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {POP,SELL,NEW} from 'common/const'

  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import test from "../test";

  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]}
        },
        currentType: POP,
        offsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mixins:[itemListenerMixin, backTopMixin],
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      test
    },
    created() {
      //1、请求多个数据
      this.mGetHomeMultidata()

      //2、请求商品数据
      this.mGetHomeGoods(POP)
      this.mGetHomeGoods(NEW)
      this.mGetHomeGoods(SELL)

    },
    mounted() {
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      //2、取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position){
        //1、判断BackTop是否显示
        this.listenShowBackTop(position)

        //2、决定tabControl是否吸顶（position: fixed）
        this.isTabFixed = (-position.y) > this.offsetTop
      },
      loadMore(){
        this.mGetHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      mGetHomeMultidata(){
        getHomeMultidata().then(res =>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      mGetHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control{
    /*position: sticky;*/
    /*top: 44px;*/
    position: relative;
    z-index: 9;
  }

  /*.fixed{*/
  /*  position: fixed;*/
  /*  top: 44px;*/
  /*  left: 0px;*/
  /*  right: 0px;*/
  /*  right: 0px;*/
  /*  z-index: 10;*/
  /*}*/

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }

  /*.content {*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
