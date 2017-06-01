<template>
  <div>
    <div class="page page-account">
    <div class="page-header flex">
      <div class="flex-item">
      </div>
      <p class="flex-item" >账号</p>
      <div class="flex-item flex">
         <div class="inner-item"></div>
        <div class="inner-item"></div>
         <IconPlaying class="inner-item"></IconPlaying>
      </div>
    </div>
     <div class="page-body">
       <div class="page-top flex">
         <div class="flex">
           <img class="user-avatar" src="http://p1.music.126.net/O28gACP8YOAQGCC2Rf3cxg==/109951162917067399.jpg">
           <div class="user-name">
             <div class="uname">Leehoka</div>
             <div class="user-level">Lv.6</div>
           </div>
         </div>
         <div class="flex sign" @click="is_signed=true">
           <div class="sign-in" v-if="is_signed==false">
             <i class="icon icon-point"></i>
             <span>签到</span>
           </div>
           <div v-else class="signed">
             <span>已签到</span>
           </div>
         </div>
       </div>

       <div class="flex page-middle">
         <div class="">
           <p class="item-title">动态</p>
           <p>1</p>
         </div>
         <div>
           <p class="item-title">关注</p>
           <p>5</p>
         </div>
         <div>
           <p class="item-title">粉丝</p>
           <p>1</p>
         </div>
         <div>
           <i class="icon-pencil"></i>
           <p>我的资料</p>
         </div>
       </div>
     </div>
      <div class="weui-cells">
        <Cell  :imgsrc="'static/images/find_music/icon-msg.png'" :title="'我的消息'"></Cell>
      </div>
      <div class="weui-cells">
        <Cell  :imgsrc="'static/images/find_music/icon-diamond.png'" :title="'会员中心'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon-cart.png'" :title="'商城'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon_box.png'" :title="'在线听歌免流量'"></Cell>
      </div>

      <div class="weui-cells">
        <Cell  :imgsrc="'static/images/find_music/icon-setting.png'" :title="'设置'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon_scan.png'" :title="'扫一扫'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon-pifu.png'" :title="'个性换肤'"></Cell>
        <div >
          <a class="weui-cell weui-cell_access" href="javascript:;">
            <div class="weui-cell__hd">
              <img v-bind:src="'static/images/find_music/icon-light.png'" class="icon-img">
            </div>
            <div class="weui-cell__bd">
              <p>夜间模式</p>
            </div>
            <div class="weui-cell_ft">
              <ToggleButton ></ToggleButton>
             </div>
          </a>
        </div>
        <Cell  :imgsrc="'static/images/find_music/icon-zhong.png'" :title="'定时关闭'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon-naozhong.png'" :title="'音乐闹钟'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon_box.png'" :title="'驾驶模式'"></Cell>
      </div>

      <div class="weui-cells">
        <Cell  :imgsrc="'static/images/find_music/icon-share.png'" :title="'分享网易云音乐'"></Cell>
        <Cell  :imgsrc="'static/images/find_music/icon-about.png'" :title="'关于'"></Cell>
      </div>


        <FootTab></FootTab>
  </div>
  </div>
</template>
<script>
  import Cell from '../common/Cell.vue'
  import IconPlaying from '../common/playing.vue'
  import FootTab from '../common/footTabBar.vue'
  import ToggleButton from '../common/ToggleButton.vue'
  export  default {
    data(){
      return{
          is_night:false,
        is_signed:false
      }
    },
    methods:{
        sign(){

        }
    },
    components: {
      FootTab,IconPlaying,Cell,ToggleButton
    }
  }

</script>
<style>

</style>
