<template>
  <div class="page">
    <div class="page-header flex">
      <div class="flex-item left-item"  >
        更多
      </div>
      <p class="flex-item">我的音乐</p>
      <div class="flex-item flex">
        <div class="inner-item"></div>
        <div class="inner-item"></div>
        <IconPlaying class="inner-item"></IconPlaying>
      </div>


    </div>
    <div class="page-body">
      <div class="weui-cells" style="margin-top: 0;">
        <Cell  :imgsrc="'static/images/my-music/music.png'" :title="'本地音乐'" :subTitle="'1'"></Cell>
        <Cell  :imgsrc="'static/images/my-music/play.png'" :title="'最近播放'" :subTitle="'100'"></Cell>
        <Cell  :imgsrc="'static/images/my-music/radio.png'" :title="'我的电台'" :subTitle="'1'"></Cell>
        <Cell  :imgsrc="'static/images/my-music/cellect.png'" :title="'我的收藏'" :subTitle="'2'"></Cell>
      </div>

      <div class="list-title flex" @click="myListVisible=!myListVisible">
        <i class="icon-arrow arrow-down" v-show="myListVisible"></i>
        <i class="icon-arrow arrow-right" v-show="!myListVisible"></i>
        <p>我创建的歌单({{myList.length}})</p>
      </div>
      <ul v-show="myListVisible">
        <li v-for="item in myList" v-bind:key="item.id">
          <LinkCell :imgsrc="item.coverImgUrl" :title="item.name" :subTitle="item.trackCount+'首'"></LinkCell>
          </li>
      </ul>
      <div class="list-title flex" @click="collectVisible=!collectVisible">
        <i class="icon-arrow arrow-down" v-show="collectVisible"></i>
        <i class="icon-arrow arrow-right" v-show="!collectVisible"></i>
        <p>我收藏的歌单({{collectList.length}})</p>
      </div>
      <ul v-show="collectVisible">
        <li v-for="item in collectList" v-bind:key="item.id">
          <LinkCell :imgsrc="item.coverImgUrl" :title="item.name" :subTitle="item.trackCount+'首,by '+ item.creator.nickname"></LinkCell>
        </li>
      </ul>
    </div>
    <FootTab></FootTab>
  </div>
</template>
<script>
  import Cell from '../common/Cell.vue'
  import LinkCell from '../common/linkCell.vue'
  import IconPlaying from '../common/playing.vue'
  import FootTab from '../common/footTabBar.vue'
  import API from '../../api';
  const api=new API();
  export  default {
      data(){
          return{
              myListVisible:true,
              collectVisible:true,
              myList:[],
              collectList:[]
          }
      },
    methods:{
       getDataList(){
           var _this=this;
           api.get('/user/playlist?uid='+this.$store.state.user.id ,{},function (res) {
               if(res.code==200){
                   for(var i=0,len=res.playlist.length;i<len;i++){
                       if(res.playlist[i].ordered){
                           _this.collectList.push(res.playlist[i]);
                       }else{
                           _this.myList.push(res.playlist[i]);
                       }
                   }
               }
              //console.log(res);
           })
       }
    },
    mounted(){
          this.getDataList()
    },
    components: {
      FootTab,LinkCell,Cell,IconPlaying
      }
  }

</script>
<style>
.left-item{padding-left: .2rem;text-align: left;font-size: .32rem;line-height: 40px;color:#333;}
  .icon-img{margin-right: .4rem!important;}
  .list-title{padding: 5px 10px;}
  .icon-arrow{ width: .16rem;height: .16rem;display: inline-block;background-size: contain;margin-right: 5px;}
  .arrow-down{background-image: url("../../../static/images/my-music/arrow-d.png");}
  .arrow-right{background-image: url("../../../static/images/my-music/arrow-r.png")!important;}
</style>
