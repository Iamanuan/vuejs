<template>
  <div>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  import {backTopMixin} from "common/mixin";

  export default {
    name: "Category",
    mixins:[backTopMixin],
  }
</script>

<style scoped>

</style>
