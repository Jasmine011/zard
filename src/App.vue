<template>
  <div id="app">
    <header-index></header-index>
    <router-view/>
    <!-- 在home、search显示，在登陆、注册页面隐藏 -->
    <footer-index v-show="$route.meta.show"></footer-index>
  </div>
</template>
<script>
import HeaderIndex from '@/components/header/index.vue'
import FooterIndex from '@/components/footer/index.vue'
export default {
  name:"",
  mounted(){
    //执行vuex里面的函数，请求三级联动数据
    this.$store.dispatch('getCategoryList')
  },
  components:{
        HeaderIndex,
        FooterIndex
    }
}
</script>
<style lang="less">

</style>
