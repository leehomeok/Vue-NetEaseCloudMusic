<template>
  <div id="app">
    <transition name="slide">
      <keep-alive exclude="MvPlayer,FooterPlayer">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <audio-controller></audio-controller>
  </div>
</template>

<script>
  import AudioController from './components/AudioController.vue'
  import FootBar from './components/common/footTabBar.vue'
  export default {
    name: 'app',
    beforeCreate () {
      //  获取当前设备像素比
      var dpr = window.devicePixelRatio || 1;
      //  获取当前手机分辨率宽度
      this.$store.commit('setPhoneResolutionWidth', document.body.clientWidth * dpr)
      //  动态获取手机的DPR设备像素比，对总体字体大小进行设置
      var viewport = document.querySelector('meta[name="viewport"]')
      var html = document.getElementsByTagName('html')[0]
      var body = document.getElementsByTagName('body')[0]
      //  设置比例
      //html.style.fontSize = 16 * dpr + 'px'
      html.dataset.dpr = dpr
     // body.style.fontSize = 12 * dpr + 'px'
      //viewport.content = 'width=device-width, initial-scale=' + 1 / dpr + ', maximum-scale=' + 1 / dpr + ', minimum-scale=' + 1 / dpr + ', user-scalable=no'
    },
    computed:{
      playing:function () {
        var url=window.location.href;
        return  url.indexOf('play')>-1? this.isPlaying=true:this.isPlaying=false;
      }

    },
    data(){
        return{
          isPlaying:false
        }
    },
    components: {
      AudioController,FootBar

    }
  }
</script>

<style>
  @import "~normalize.css/normalize.css";
  .index-component{padding-bottom: 40px;}
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .clearfix{*+height:1%;}
  .icon{display: block;}
  html {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }
  body {
    background-color: #f2f4f5;
    font-size: 12px;
  }
  html, body, #app {
    height: 100%;
  }
  /*  重置样式  */
  ul, h4, p {
    margin: 0;
    padding: 0;
  }
  input{outline:none;}
  /*  主色调  */
  .primary-color {
    color: #d33a31;
  }
  .primary-bg-color {
    background-color: #d33a31;
  }
  /*  常用样式  */
  .flex {
    display: flex;
  }
  .align-center {
    text-align: center;
  }
  .text-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .background {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 0;
  }
  .keyword-hot-item {
    list-style: none;
    flex-shrink: 0;
    margin-top: 0.25rem;
    margin-right: 0.125rem;
    padding-right: 0.25rem;
    padding-left: 0.25rem;
    line-height: 2;
    border: 1px solid #ced0d0;
    border-radius: 0.5rem; /*  14px  */
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .2s linear 0s;
  }
  .slide-enter, .slide-leave-active {
    -webkit-transform: translate3d(0, 3.25rem, 0);
    transform: translate3d(0, 3.25rem, 0);
    opacity: .8;
  }
  .icon-arrow-right {
    flex-shrink: 0;
    width: 0.2rem;
    height: 0.26rem;
    margin-top: .06rem ;
    line-height:.4rem;
    background-image: url('../static/images/index/yv.png');
  }
  .song-list-detail-listen-icon {
    display:block;
    float:left;
    width: 0.25rem;
    height: 0.25rem;
    background-image: url('../static/images/index/vn.png');
  }
  ul li{list-style: none;}
  .my-list-component,.mv-list-component{margin-top:1.38rem;}
  .ranking-list-component{margin-top:1.5rem;}
  .container{border-color:#fff;}
  .liked{background-image:url("../static/images/find_music/red_heart.png")!important; }
  .page-account{background: #efefef;}
  .page{padding-bottom: 45px;}
  .page-header{border-bottom: .02rem solid #e6e6e6;background: #f8f8f8;}
  .page-header p{line-height:40px;font-size: .32rem;color:#333; text-align: center}
  .page-header .right-item,.inner-item{flex: 1;}
  .flex-item{flex :2;}
  .page-top{padding: .2rem;justify-content:space-between;border-bottom: .005rem solid #e6e6e6;background: #fff;}
  .user-avatar{width: 1rem;height: 1rem;border-radius: 50%;margin-right: 10px;}
  .user-name{padding: .2rem 0;}
  .uname{margin-bottom: .1rem;font-size: 14px;color:#333;}
  .user-level{border-radius: .3rem;border: 1px solid #cdcdcd;padding: .02rem;text-align: center;}
  .sign{height:.3rem;justify-content: center;margin-top: .25rem;}
  .sign-in{padding:.1rem .2rem .1rem 0.5rem; border: 1px #d81e06 solid ;border-radius: .3rem;position: relative;
    height: .2rem;}
  .icon{width: .32rem;height: .32rem;background-repeat: no-repeat;background-size: contain!important;}
  .icon-point{  background-image:url(../static/images/find_music/icon-points.png) ; display: inline-block;
    position: absolute; left: .1rem;top:.05rem; }
  .sign-in span {line-height: .2rem;color:#d81e06;}
  .signed{
    padding:.1rem .2rem ;
    border: 1px #cdcdcd solid ;border-radius: .3rem;
    height: .2rem;
  }
  .page-top,.page-middle{background: #fff}
  .page-middle{padding:.1rem 0;}
  .page-middle>div{width:24.5%;text-align: center;border-right: .01rem solid #e6e6e6; }
  .page-middle>div:last-child{border: 0;}
  .item-title{color:#8a8a8a;margin-bottom: .02rem;}
  .icon-pencil{display: block;background: url("../static/images/find_music/icon_pencil.png")no-repeat;width: .32rem; height: .32rem;background-size: contain;margin: 0 auto .02rem;}
  .mint-tabbar{z-index: 10000;}

</style>
