<template>
  <div class="page page-account">
    <div class="page-header flex">
      <div class="flex-item">
        <IconBack class="back-icon"/>
      </div>
      <p class="flex-item">歌单</p>
      <div class="flex-item flex">
        <div class="inner-item"></div>
        <div class="inner-item"></div>
        <IconPlaying class="inner-item"></IconPlaying>
      </div>
    </div>

    <div class="top-banner clearfix">
      <div class="top-left">
        <img class="main_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493827424958&di=259221c1a2ecef7b0a3f5a7a2bb25bea&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fuser%2F435%2F43594%2F13458253735efcf59ddeb7486b.jpg">
      </div>
      <div class="top-right">
        <h2 class="title"><i class="icon icon-king"></i>{{title}}<i class="icon icon-arrow-right"></i></h2>
        <p class="main_title">{{main_title}}</p>
        <p>{{sub_title}}</p>
      </div>
    </div>

    <div class="song-nav clearfix">
      <div class=" allsong">
        全部歌单<i class="icon icon-arrow-right-sm"></i>
      </div>
       <ul class="styles" style="float: right;">
         <li class="song-style" 
          v-for="(item,index) in styleList"
          :key="index">
          {{item}}
        </li>
       </ul>
    </div>

     <ul class="songs clearfix">
       <li class="song-list" v-bind:key="item.id" v-for="item in songList">
         <a class="song-container" @click="goToMusicList(item.id)">
           <span class="listen-cnt"><i class="icon song-list-detail-listen-icon"></i>{{item.playCount | wan}}</span>
           <img v-bind:src="item.coverImgUrl">
           <p class="creator"><i class="icon icon-user"></i>{{item.creator.nickname}}</p>
         </a>
         <p class="song-list-name">{{item.name}}</p>
       </li>
     </ul>
     <FootBar></FootBar>
  </div>
</template>

<script>
  import API from '../../api'
  import FootBar from '../common/footTabBar.vue'
  import IconBack from '../common/IconBack.vue'
  import IconPlaying from '../common/playing.vue'
  var api =new API();
  export default{
    components: {
      IconPlaying,FootBar,IconBack
    },
    data () {
      return {
        songList:[],
        title:"精品歌单",
        main_title:"『乐器与电影』一部电影一种乐器",
        sub_title:"领略光影下的器乐之魂",
        styleList:[
          '华语','R&B/Soul','民谣'
        ],
        tabIndex: 1
      }
    },
    methods: {
        getSongList(){
            var _this=this;
            api.get('top/playlist/highquality',{},function (res) {
                if(res.code==200){
                    _this.songList=res.playlists;
                }
            })
        },
       goToMusicList (id) {
        this.$router.push({
          name: 'MusicList',
          params: {
            id: id
          }
        })
      }
    },
    created () {
        this.getSongList();
    }
  }
</script>
<style scoped>
  .song-container{display: block;position: relative;}
  .song-list{width: 49.55%;float: left;list-style: none;color: white;margin-bottom: 5px;}
  .songs{padding-bottom: .3rem}
  .songs .song-list:nth-child(2n){float: right}
  .song-list img{width: 100%;}
  .song-nav{padding: 10px 5px;}
  .creator{position: absolute;bottom: 2px;left: 2px;line-height: 26px;}
  .icon-user{
    display: block;
    width: 20px;height: 24px;
    background-size: contain;
    background: url("../../../static/images/find_music/user_white.png")center no-repeat;
    float: left;
  }
  .song-list-detail-listen-icon{
    background-size: contain;
    float: left;
  }
  .listen-cnt{position: absolute;top:2px;right: 2px;}
  .song-list-name{color: #333;height: 28px;line-height: 14px;padding: 0 3px;}

  .allsong{border:1px solid #ced0d0;border-radius: 0.5rem;padding: 5px;width: 20%;float: left;line-height: 1;}
  .song-style{float: left;list-style: none;}
  .song-style:after{content: " | ";}
  .styles .song-style:last-child:after{content: ""}
  .icon-arrow-right{float: right ;display: inline-block;margin-left: 5px;background-size: contain;background-repeat: no-repeat;
    background-image: url(../../../static/images/find_music/arrow_right.png);}
  .icon-arrow-right-sm{
    display: inline-block;margin-left: 5px;background-size: contain;background-repeat: no-repeat;
    background-image: url(../../../static/images/find_music/arrow-right-grey.png);width: .22rem;height: .22rem;
  }
  .title{font-size: .24rem;margin-bottom: .15rem;line-height: 1.6;padding-left: 5px;}
  .icon-king{border:1px solid #f4ea2a;border-radius: 50%;  background: url(../../../static/images/find_music/king.png) 0 0 no-repeat;width: .32rem;height: .32rem;float: left;background-size: contain;}
  .main_img{width: 2rem;height: 2rem;}
  .top-banner{
    margin-top:.7rem;
    padding: .4rem .3rem .3rem;
    color: #fff;
    background-image:  -webkit-gradient(linear, 0 0, right 0, from(#95c931), to(#1b402f)) ;
    background: -moz-linear-gradient(left, #95c931, #1b402f);
  }
  .top-banner>div{float: left;}
  .main_title{margin-bottom: .2rem;}
  .top-left{margin-right: .2rem;}
  .bg-blur { float: left;  width: 100%;overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
    z-index: -10;
  }
  .back-icon{
    height: .4rem;
    margin-top: 8%;
    color: #333;
  }
</style>
