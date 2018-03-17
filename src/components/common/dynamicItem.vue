<template>
   <div class="dynamic flex">
      <div class="user-avatar">
        <img v-bind:src="avatar">
      </div>
     <div class="dynamic-content">
       <div >
          <span class="dynamic-top"><a class="nick">{{nickname}}</a> 分享单曲：</span>  <span style="color:#d33a31;float: right">+ 关注</span>
          <p> {{  time|| '最近' }}</p>
          <p style="margin:.2rem 0 .15rem">{{title}}</p>

         <div class="dynamic-img clearfix">
            <div v-if="pics.length==1">
               <img style="width: 60%"
                v-for="item in pics" 
                :key="item.originUrl"
                :src="item.originUrl">
            </div>

           <div v-else-if="pics.length==2||pics.length==4">
             <ul class="tow-one">
               <li v-for="item in pics">
                 <img style="width:100%"  v-bind:src="item.originUrl">
               </li>
             </ul>
           </div>

           <div v-else>
             <ul class="third-one">
               <li  v-for="item in pics">
                 <img v-bind:src="item.originUrl" style="width:100%;height: 1.5rem;">
               </li>
             </ul>
           </div>
         </div>


         <div v-if="songPic" class="song-item flex">
           <div style="flex:1;margin-right: 5px;">
             <img v-bind:src="songPic">
           </div>
           <div style="flex:5;padding: 5px 0; ">
             <p class="song-name">{{songName}}</p>
             <p class="artist-name">{{artist}}</p>
           </div>
         </div>

         <div v-else>
           <div>
              <img v-bind:src="videoImgUrl" @click="playVideo()" style="margin-bottom: .1rem;">
              <video v-show="videoSrc" :id="videoId" width="100%" height="200px;" :src="videoSrc" controls ></video>
           </div>
         </div>


          <p  class="reason">{{subTitle}}</p>

         <div class="flex">
            <div class="dynamic-btm">
              <i class="icon icon-zan"></i>
              <span v-if="zan>0">{{zan}}</span>
            </div>
           <div class="dynamic-btm">
             <i class="icon icon-cmt"></i>
             <span v-if="comment>0">{{comment}}</span>
           </div>
           <div class="dynamic-btm">
             <i class="icon icon-share"></i>
             <span v-if="share>0">{{share}}</span>
             <span v-else>分享</span>
           </div>
           <div class="dynamic-btm">
             <img class="btm-img" src="/static/images/find_music/ellipse.png">
           </div>
         </div>
       </div>
     </div>
   </div>
</template>
<script>
  import Song from './songItem.vue'
   export default{
      props:{
        videoId:{
          type:Number
        },
         avatar:{
             type:String
         },
         nickname:{
             type:String
         },
         time:{
             type:String
         },
        pics:{
             type:Array
        },
        title:{
          type:String
        },
        songInfo:{
          type:Object
        },
        songPic:{
          type:String
        },
        songName:{
             type:String
        },
        artist:{
             type:String
        },
        subTitle:{
             type:String
        },
        videoSrc:{
          type:String
        },
        videoImgUrl:{
          type:String
        },
        zan:{
             type:Number
        },
        comment:{
             type:Number
        },
        share:{
             type:Number
        },


      },
      data(){
          return{

          }
      },
     methods:{
       playVideo(){
           var vid=this.videoId.toString();
           document.getElementById(vid).setAttribute('src',this.videoSrc);
       }
     },
     components:{
       Song,
     }
  }

</script>
<style scoped>
  .dynamic{padding: 10px 6px;overflow: hidden;border-bottom: .002rem solid #e6e6e6}
img{max-width: 100%;}
  .user-avatar{flex: 1}
  .dynamic-content{flex:7}
  .user-avatar img{border-radius: 50%;}
  .nick{color:#3879d9;margin-right: 10px;}
  .dynamic-top{}
  .dynamic-img{margin-bottom: .05rem;}
  .third-one li{width:33%;float: left;margin-right: .5%;margin-bottom: .01rem;}
  .third-one li:nth-child(3n){margin-right: 0;}

  .reason{color:#888;margin-bottom: .2rem;}
  .dynamic-btm{flex:1;height: .32rem;line-height: .32rem;}
  .btm-img{width: .32rem;height: .32rem;}
  .icon {width: .32rem;height: .32rem;display: inline-block;background-size: contain!important;}
  .icon-zan{background-image: url(../../../static/images/find_music/zan.png);background-position: 0 1px }
  .icon-cmt{background-image: url(../../../static/images/find_music/comment.png);background-position: 0 4px}
  .icon-share{background-image: url(../../../static/images/find_music/icon-share.png);background-position: 0 1px}
  .dynamic-btm span{line-height: .32rem;}
  .tow-one li{width: 40%;float: left;margin-right: 1%;}
  .tow-one li img{height:2rem;}
  .tow-one li:nth-child(2n){margin-right: 0;}
</style>
