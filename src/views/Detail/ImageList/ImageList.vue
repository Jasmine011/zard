<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage,index) in skuImageList"
        :key="skuImage.id"
      >
        <img :src="skuImage.imgUrl" @click="setCurrentIndex(index)" :class="{active:index==currentIndex}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data(){
    return {
      //决定哪个图片处于选中状态
      currentIndex:0
    }
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.swiper, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          //轮播图一次显示3张图
          slidesPerView: 3
        });
      });
    },
  },
  methods:{
    setCurrentIndex(index){
      //把点击图片的索引值给currentIndex，这样它就获得样式了
      this.currentIndex = index
      //把点击的图片索引值告诉大图组件，在大图组件上展示点击的图片
      this.$bus.$emit('getIndex',index)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>