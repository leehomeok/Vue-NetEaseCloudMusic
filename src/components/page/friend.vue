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

      <Dynamic  v-for="item in eventList" :avatar="item.user.avatarUrl"  :pics="item.pics"
         :nickname="item.user.nickname"
         :time="item.showTime|datetime"
         :title="item.obj.msg"
         :songName=" isUndefined(item.obj.song)? '' : item.obj.song.name   "
         :artist="isUndefined(item.obj.song)? '' : item.obj.song.artists|transformArtistList   "
         :songPic="isUndefined(item.obj.song)? '' : item.obj.song.album.picUrl"
         :videoSrc="isUndefined(item.obj.video)? '' :item.obj.video.urlInfo.url"
         :videoImgUrl="isUndefined(item.obj.video)? '': item.obj.video.coverUrl"
         :videoId="isUndefined(item.obj.video)? '': item.obj.video.vid"
         :subTitle="isUndefined(item.rcmdInfo)? '': item.rcmdInfo.reason "
         :comment="item.info.commentCount"     :zan="item.info.likedCount"
         :share="item.info.shareCount"
      ></Dynamic>

     </div>


    <FootTab></FootTab>
  </div>
</template>
<script>
  import Dynamic from '../common/dynamicItem.vue'
  import IconPlaying from '../common/playing.vue'
  import FootTab from '../common/footTabBar.vue'
  import API from '../../api'
  var api =new API();
  export  default {
    data(){
      return{
          item:  {
            "actName": null,
            "showTime": 1496030239806,
            "json": "{\"msg\":\"“蒙面美女”现场挑战崔健经典，一开口唱得观众和评委直想流泪\",\"video\":{\"vid\":1999895,\"coverUrl\":\"http://p1.music.126.net/Cwx6jUMGil2KljDkbqu_Hw==/109951162936542086.jpg\",\"duration\":252,\"playTime\":1911,\"height\":480,\"width\":854,\"size\":33160506,\"nosType\":1,\"nosKey\":\"8f8868c09c30a45d15df635e73a10aa5.mp4\",\"bucketName\":\"cloudmusic\",\"state\":1,\"coverType\":0,\"urlInfo\":{\"url\":\"http://sv1.music.126.net/20170529145019/da2e42c6ccb041d58809d10106b4469e/cloudmusic/8f8868c09c30a45d15df635e73a10aa5.mp4\",\"size\":33160506,\"validityTime\":3600}}}",
            "actId": 0,
            "uuid": "18AF9CB091E9107D755AC79733862254",
            "user": {
              "defaultAvatar": false,
              "province": 1000000,
              "authStatus": 0,
              "followed": false,
              "avatarUrl": "http://p1.music.126.net/21UoAax9CSjh5RrCwU_ptw==/18545462627599987.jpg",
              "accountStatus": 0,
              "gender": 1,
              "city": 1000100,
              "birthday": 631123200000,
              "userId": 52571568,
              "userType": 0,
              "nickname": "环球童声音乐",
              "signature": "每天分享好音乐，带你听遍全球经典童声，让音乐属于每一位少儿！",
              "description": "",
              "detailDescription": "",
              "avatarImgId": 18545462627599987,
              "backgroundImgId": 2002210674180204,
              "backgroundUrl": "http://p1.music.126.net/5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg",
              "authority": 0,
              "mutual": false,
              "expertTags": null,
              "djStatus": 10,
              "vipType": 0,
              "remarkName": null,
              "backgroundImgIdStr": "2002210674180204",
              "avatarImgIdStr": "18545462627599987",
              "urlAnalyze": false,
              "avatarImgId_str": "18545462627599987"
            },
            "tmplId": 0,
            "forwardCount": 5,
            "expireTime": 0,
            "rcmdInfo": {
              "reason": "最in的选秀资讯速递",
              "alg": "qrt_event",
              "type": 1,
              "scene": "social"
            },
            "pics": [

            ],
            "eventTime": 1496037243162,
            "id": 1632327438,
            "type": 39,
            "topEvent": false,
            "info": {
              "commentThread": {
                "id": "A_EV_2_1632327438_52571568",
                "resourceInfo": {
                  "id": 1632327438,
                  "userId": 52571568,
                  "name": "发布的短视频",
                  "imgUrl": null,
                  "creator": null,
                  "eventType": 39
                },
                "resourceType": 2,
                "commentCount": 11,
                "likedCount": 7,
                "shareCount": 3,
                "hotCount": 3,
                "latestLikedUsers": [
                  {
                    "s": 448813256,
                    "t": 1496039288146
                  },
                  {
                    "s": 342470666,
                    "t": 1496038147683
                  },
                  {
                    "s": 361370951,
                    "t": 1496037860341
                  },
                  {
                    "s": 449700061,
                    "t": 1496035719859
                  },
                  {
                    "s": 110467761,
                    "t": 1496034508207
                  },
                  {
                    "s": 338223825,
                    "t": 1496034462510
                  },
                  {
                    "s": 68458602,
                    "t": 1496030495190
                  }
                ],
                "resourceId": 1632327438,
                "resourceOwnerId": 52571568,
                "resourceTitle": "发布的短视频"
              },
              "latestLikedUsers": null,
              "liked": false,
              "comments": null,
              "resourceType": 2,
              "resourceId": 1632327438,
              "commentCount": 11,
              "likedCount": 7,
              "shareCount": 3,
              "threadId": "A_EV_2_1632327438_52571568"
            }
          },
        eventList:[]
       }
    },
    mounted(){
        console.log((JSON.parse(this.item.json)))
        this.getDynamicList();
    },
    methods:{
         getDynamicList(){
             api.get('/event',{},(res)=>{
                 if(res.code==200){
                   res.event.forEach(function (item) {
                        // console.log(item)
                         item.obj=JSON.parse(item.json)
                   })
                   this.eventList=res.event;
                    //console.log(this.eventList)
                 }
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
