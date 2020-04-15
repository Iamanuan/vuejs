<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
  </div>
</template>

<script>
  export default {
    name: "DetailRecommendInfo",
    props:{
      recommendList:{
        type: Array
      }
    }
  }
</script>

<style scoped>
  .recommend-info{
    padding: 5px;
  }

  .recommend-info .info-header{
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333333;
  }
</style>
