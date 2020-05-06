import {debouce} from './utils'
import {BACKTOP_DISTANCE} from "./const";

import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      newRefresh:null
    }
  },
  mounted(){
    //1、图片加载完成的事件监听、防抖操作
    this.newRefresh = debouce(this.$refs.scroll.refresh,500)

    // 对监听事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return{
      isShowBackTop:false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}
