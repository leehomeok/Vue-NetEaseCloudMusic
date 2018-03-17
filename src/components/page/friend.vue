<template>
  <div class="page">
    <div class="page-header flex">
      <div class="flex-item left-item"  >
        <img src="/static/images/my-music/user-plus.png" >
      </div>
      <p class="flex-item">动态</p>
      <div class="flex-item flex">
        <div class="inner-item"></div>
        <div class="inner-item"></div>
        <IconPlaying class="inner-item"></IconPlaying>
      </div>
    </div>

    <div class="page-body">
      <Dynamic
        v-for="item in eventList" 
        :key="item.id"
        :avatar="item.user.avatarUrl"  
        :pics="item.pics"
        :nickname="item.user.nickname"
        :time="item.showTime|datetime"
        :title="item.obj.msg"
        :songName=" isUndefined(item.obj.song)? '' : item.obj.song.name   "
        :artist="isUndefined(item.obj.song)? '' : item.obj.song.artists|transformArtistList   "
        :songPic="isUndefined(item.obj.song)? '' : item.obj.song.album && item.obj.song.album.picUrl"
        :videoSrc="isUndefined(item.obj.video)? '' : item.obj.video.urlInfo && item.obj.video.urlInfo.url"
        :videoImgUrl="isUndefined(item.obj.video)? '': item.obj.video.coverUrl"
        :videoId="isUndefined(item.obj.video)? 0: item.obj.video.vid"
        :comment="item.info.commentCount"     
        :zan="item.info.likedCount"
        :share="item.info.shareCount"
      ></Dynamic>
      <!-- :subTitle="isUndefined(item.rcmdInfo.reason) ? '': item.rcmdInfo.reason" -->
     </div>


    <FootTab />
  </div>
</template>
<script>
  import Dynamic from '../common/dynamicItem.vue'
  import IconPlaying from '../common/playing.vue'
  import FootTab from '../common/footTabBar.vue'
  import axios from 'axios'
  import API from '../../api'
  var api =new API();
  export  default {
    data(){
      return{
        eventList:[]
       }
    },
    mounted(){
      this.getDynamicList();
    },
    methods:{
      getDynamicList(){
        api.get('/event',{},(res)=>{
          if(res.code==200){
            if (res.event && res.event.length) {
              res.event.forEach(function (item) {
                item.obj=JSON.parse(item.json)
              })
              this.eventList=res.event;
            }
          }else {
            this.getStaticJson()
          }
        })
      },
      getStaticJson (){
        axios.get('../../../static/event.json').then((res) => {
          var result = res.data.event
          result.forEach((item)=> {
            item.obj=JSON.parse(item.json)
          })
          this.eventList = result
        })
      },
      isUndefined(obj){
        return typeof(obj)=="undefined"
      }
    },
    computed:{
      obj(){
        return JSON.parse(this.item.json)
      }
    },
    components: {
      FootTab,IconPlaying,Dynamic
    }
  }

</script>
<style>
  .left-item{padding-left: .2rem;text-align: left;font-size: .32rem;line-height: 40px;color:#333;}
 .left-item img{margin-top: .1rem;width: .32rem;height: .32rem;}
</style>
