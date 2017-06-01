<template>
   <div @click="goPlay()" class="music" v-bind:class="{'active': playStatus}">
     <i ></i>
     <i ></i>
     <i ></i>
     <i ></i>
   </div>

</template>
<script>
  import {mapState  }from 'vuex'
  export default{
      data(){
          return{
          }
    },
    methods:{

        goPlay(){
          this.$router.push({ name: 'Play'})

        }
    },
    computed:{
          ...mapState (['playStatus'])
    }
  }
</script>
<style>
  .music{width: 50px;height: 20px;margin:10px auto;position: relative;padding-left: -10px;}
  .music i{width: 2px;position: absolute;bottom:0;background-color: #333;}
  .music i:nth-of-type(1){left:0;height: 12px;}
  .music i:nth-of-type(2){left:8px;height:24px;}
  .music i:nth-of-type(3){left:16px;height: 12px;}
  .music i:nth-of-type(4){left:24px;height: 24px;}
  .music.active i:nth-of-type(1){-webkit-animation:wave 0.66s linear infinite;animation:wave 0.66s linear infinite;}
  .music.active i:nth-of-type(2){-webkit-animation:wave 0.8s linear infinite;animation:wave 0.8s linear infinite;}
  .music.active i:nth-of-type(3){-webkit-animation:wave 0.7s linear infinite;animation:wave 0.7s linear infinite;}
  .music.active i:nth-of-type(4){-webkit-animation:wave 0.5s linear infinite;animation:wave 0.5s linear infinite;}
  @-webkit-keyframes wave{
    0%{height:8px}
    50%{height: 28px}
    100%{height: 12px}
  }
  @keyframes wave{
    0%{height:8px}
    50%{height: 28px}
    100%{height: 12px}
  }
</style>
