<template>
  <div class="index-banner-component">
    <swipe class="my-swipe" :auto="auto">
      <swipe-item class="slide" v-for="item in bannerList">
        <img class="slide-img" :src="item.pic">
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vue-swipe'
  import API from '../../api';
  const api=new API();
  export default{
    data () {
      return {
        auto: 5000,
        bannerList:[]
      }
    },
    methods:{
       getBanners(){
           var _this=this;
           api.get('/banner',{},function (res) {
               if(res.code==200){
                    _this.bannerList=res.banners;
               }
           })
       }
    },
    mounted(){
       this.getBanners()
    },
    components: {
      Swipe, SwipeItem
    }
  }
</script>


<style scoped>
  @import "~vue-swipe/dist/vue-swipe.css";
  .my-swipe {
    width: 100%;
    height: 3rem;
  }
  .slide {
    width: 100%;
    height: 100%;
  }
  .slide-img {
    width: 100%;
    height: 100%;
  }
</style>
