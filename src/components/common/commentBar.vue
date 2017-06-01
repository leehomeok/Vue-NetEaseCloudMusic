<template>
 <div class="flex cmt-componet">
   <div>
      <div class="icon icon-like" @click="liked=!liked" v-bind:class="{liked : liked ==true }"></div>
   </div>
   <div>
     <div class="icon icon-download"></div>
   </div>
   <div @click="goComment()">
     <div class="icon icon-cmt">
       <span>999+</span>
     </div>
   </div>
   <div>
     <div class="icon icon-menu"></div>
   </div>
 </div>
</template>
<script>
  import { mapActions }from 'vuex';
  export default{
      props:{
        count:{
            type:String
        }
      },
      data(){
          return{
              liked:false

          }
      },
    computed:{
      song_id(){
          return this.$store.state.songMsg;
      }
    },
    methods:{
      goComment(){
          this.$router.push({name:'comment',params:{
              id:this.$store.state.songMsg.id
          }})
      }
    },
  }

</script>

<style>
  /* 评论栏*/
  .cmt-componet>div{-webkit-box-flex:1;flex:1}
  .cmt-componet .icon{width:.32rem;height:.32rem;background-position: center;background-repeat: no-repeat;margin: 0 auto;background-size: contain!important;display: block!important;}
  .cmt-componet .icon-like{ background-image: url("../../../static/images/find_music/heart.png")}
  .cmt-componet .icon-download{ background-image: url("../../../static/images/icon_download.png")}
  .cmt-componet .icon-cmt{ background-image: url("../../../static/images/find_music/icon_cmt.png");color:#fff;font-size: 11px;position: relative;}
  .icon-cmt span{position: absolute;right:-.5rem;top:-.1rem;}
  .cmt-componet .icon-menu{ background-image: url("../../../static/images/find_music/ellipse_white.png");transform: rotate(90deg)}
.cmt-component>div{display: flex;}
</style>
