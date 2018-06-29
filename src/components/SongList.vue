<template>
  <div class="music-list-component background"
       :class="{'padding-bottom': songMsg.id !== undefined}"
       :style="{'backgroundImage': 'url(' + creator.backgroundUrl + ')'}">
    <div class="flex music-list-header">
      <icon-back></icon-back>
      <h3 class="music-list-title text-ellipsis">排行榜</h3>
      <div class="music-list-search background">
        <i class="icon icon-ellipsis-white"></i>
        <i class="icon icon-playing" @click="goPlay()"></i>
      </div>
    </div>
    <div class="flex music-list-message">
      <div class="music-list-message-cover-container">
        <img :src="songListInfo.coverImgUrl" class="music-list-cover">
        <div class="music-list-message-listen-count ">
        </div>

        <div class="music-list-message-info background"></div>
      </div>
      <div class="music-list-message-detail">
        <div class="music-list-message-name">{{ songListInfo.name }}</div>
        <div class="music-list-message-creator-info">
          <div class="music-list-message-creator-avatar-container">
            <img :src="creator.avatarUrl" class="music-list-message-creator-avatar">
            <img src="../../static/images/icon_identity.png" class="music-list-message-creator-identity">
          </div>
          <div class="flex music-list-message-creator-name">
            <span>{{ creator.nickname }}</span>
            <i class="icon icon-arrow"></i></div>

        </div>
      </div>
    </div>
    <div class="flex music-list-operation">
      <div class="operation-collect">
        <div class="operation-collect-icon background"></div>
        <div class="operation-collect-count font-size-10 align-center">{{ songListInfo.subscribedCount| wan }}</div>
      </div>
      <div class="operation-comment">
        <div class="operation-comment-icon background"></div>
        <div class="operation-comment-count font-size-10 align-center">{{ songListInfo.commentCount | wan}}</div>
      </div>
      <div class="operation-share">
        <div class="operation-share-icon background"></div>
        <div class="operation-share-count font-size-10 align-center">{{ songListInfo.shareCount| wan }}</div>
      </div>
      <div class="operation-download">
        <div class="operation-download-icon background"></div>
        <div class="operation-download-string font-size-10 align-center">下载</div>
      </div>
    </div>
    <div class="music-list-playlist">
      <div class="flex music-list-playlist-header">
        <div class="music-list-playlist-icon-title background"></div>
        <h3 class="music-list-playlist-title ">播放全部<span class="music-list-playlist-count">(共{{ songlength }}首)</span></h3>
        <div class="music-list-playlist-icon-setting background"></div>
      </div>
      <ul class="music-list">
        <li v-for="(item, index) in tracks" class="flex music-list-item" 
          @click="playThis(item, index)" 
          :key=item.id>
          <div v-if="songMsg.id !== item.id" class="music-list-item-index" style="height: .5rem">
            <p class="rank" style="margin:.02rem 0 .05rem">{{ index + 1 }}</p>
            <p class="rank" style="color:red" v-if="index<item.lastRank">↑{{ (index - item.lastRank )|abs  }}</p>
            <p class="rank" v-else>↓{{ (index - item.lastRank )|abs }}</p>
          </div>
          <div v-else class="music-list-item-playing background"></div>
          <div class="flex music-item-container">
            <div class="music-item text-ellipsis">
              <div class="flex music-detail">
                <p class="music-name text-ellipsis">{{ item.name }}</p>
                <div v-if="item.mvid !== 0" 
                  @click.stop="goToMvPlayer(item.mvid)" 
                  class="icon-mv background">
                </div>
              </div>
              <div class="music-singer text-ellipsis">{{item.ar[0].name}}  - {{item.al.name}}</div>
            </div>
            <div class="icon-ellipsis background"></div>
          </div>
        </li>
      </ul>
    </div>

    <FootBar></FootBar>
  </div>
</template>
<script>
  import IconBack from './common/IconBack.vue'
  import FooterPlayer from './common/FooterPlayer.vue'
  import FootBar from './common/footTabBar.vue'
  import API from '../api'
  var api =new API();
  export default{
    created () {
      this.loadData()
    },
    components: {
      IconBack, FooterPlayer,FootBar
    },
    data () {
      return {
        songListInfo: {},
        creator: {},
        tracks:[],
        songList: [],
        songlength:0
      }
    },
    computed: {
      pId () {
        return this.$route.params.song_id
      },
      playlist () {
        return this.$store.state.playlist
      },
      songMsg () {
        return this.$store.state.songMsg
      }
    },
    watch: {
      pId (newValue) {
        if (newValue) this.loadData()
      }
    },
    methods: {
        abs(r){
            return Math.abs(r);
        },
      loadData () {
        api.get(`/top/list?idx=${this.pId}`,{},(res)=> {
          if(res.code == 200){
            // console.log(res)
            let rdata=res.playlist;
            this.songListInfo = rdata;
            this.creator = rdata.creator;
            this.tracks = rdata.tracks;
            this.songlength=rdata.tracks.length;
          }
        })
      },
      playThis (songMsg, index) {
        var _this=this;
        //  如果正在播放当前音乐，那么点击变为跳转到播放界面
        if (_this.songMsg.id === songMsg.id) {
          _this.$router.push({
            name: 'Play'
          })
          return
        }
        // debugger
        //  设置播放的音频信息
        _this.$store.dispatch('setSongMsg', {
          id: songMsg.id, //  歌曲id
          name: songMsg.name, // 歌曲名称
          artists: songMsg.artists || songMsg.ar, //  演唱歌手
          album: songMsg.album || songMsg.al, //  专辑信息
          mvid: songMsg.mvid || songMsg.mv //  mv链接ID，0为没有id
        })
        //  设置当前播放音频在列表中的索引
        _this.$store.commit('setSongMsgIndex', index)
        //  将该列表推送至正在播放列表,并进行避免重复推送校验
        if (_this.playlist.type !== 'list' || (_this.playlist.type === 'list' && _this.playlist.id !== _this.songListInfo.id)) {
          var songList = []; //  优化列表在store中的大小，删除不必要的属性
          _this.tracks.forEach(function (value) {
            songList.push({
              id: value.id, //  歌曲id
              name: value.name, // 歌曲名称
              artists: value.artists || value.ar, //  演唱歌手
              album: value.album || value.al, //  专辑信息
              mvid: value.mvid || value.mv //  mv链接ID，0为没有id
            })
          })
          _this.$store.commit('setPlaylist', {
            id: _this.songListInfo.id,
            type: 'list',
            list: songList
          })
          /*_this.$router.push({
            name: 'Player'
          })*/
        }
      },
      goToMvPlayer (mvId) { //  前往MV播放界面
        this.$router.push({
          name: 'mvPlayer',
          params: {
            id: mvId
          }
        })
      },
      goPlay(){
        this.$router.push({ name: 'Play'})
      }
    }
  }
</script>

<style scoped>
  .rank{line-height: .25rem}
  .music-list-component {
    display: flex;
    flex-direction: column;
    background-size: 100% ;
  }
  .music-list-header {
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
  }
  .music-list-title {
    flex-grow: 1;
    color: #fff;
    line-height: 1;text-align: center;
  }
  .music-list-search {
    width: 1rem;
    height: .25rem;
  }
  .music-list-message {
    flex-shrink: 0;
    padding: 0 5%;
    margin: 10px 0;
    height: 2rem;
  }
  .music-list-message-cover-container {
    position: relative;
    flex: 2;
    margin-right: .25rem;
    width: 2rem;  height: 2rem;
  }
  .music-list-cover {
    width: 100%; height: 100%;
  }
  .music-list-message-listen-icon {
    display: block; float:right; width: 0.32rem; height: 0.32rem;
    background-image: url('../../static/images/find_music/iconfont-listen.png');
    background-size: contain;
  }
  .music-list-message-listen-count {
    position: absolute;right: 0;top:0;color: #fff;  width: 100%;
  }
  .music-list-message-listen-count>span{
    float: right;line-height: .32rem;margin:0 .05rem;
  }
  .music-list-message-info {
    position: absolute; right: 0.15rem; bottom: 0.15rem;width: .32rem; height: .32rem;
    background-image: url('../../static/images/icon_info.png');
  }
  .music-list-message-name { color: #fff;font-size: 14px; height: 50%;}
  /*  用户信息 */
  .music-list-message-creator-avatar-container { position: relative; width: .5rem; height: .5rem; float: left; }
  .music-list-message-creator-avatar {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 50%;
  }
  .music-list-message-creator-identity{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
  }
  .music-list-message-creator-name {
    margin-left: 0.7rem;
    line-height: .5rem;
    color: #f2eeee;

  }
  /*  收藏、评论、分享、是否已下载等信息  */
  .music-list-operation {
    justify-content: space-around;
    margin-top: 0.125rem;
    margin-bottom: 0.15rem;
    flex-shrink: 0;
  }
  .operation-collect,
  .operation-comment,
  .operation-share,
  .operation-download
  {
    flex-grow: 1;
  }
  .operation-collect-icon,
  .operation-comment-icon,
  .operation-share-icon,
  .operation-download-icon
  {
    margin: 0 auto;
    width: .25rem;
    height: .25rem;
  }
  .operation-collect-icon {
    background-image: url("../../static/images/icon_collection.png");
  }
  .operation-comment-icon {
    background-image: url("../../static/images/icon_comment.png");
  }
  .operation-share-icon {
    background-image: url("../../static/images/icon_share.png");
  }
  .operation-download-icon {
    background-image: url("../../static/images/icon_download.png");
  }
  .operation-collect-count,
  .operation-comment-count,
  .operation-share-count,
  .operation-download-string
  {
    color: #fff;
    line-height: 1;
  }
  /*  列表头部  */
  .music-list-playlist {
    flex-grow: 1;
    background-color: #fff;
  }
  .music-list-playlist-header {
    padding: 0 0.5rem;
    justify-content: space-between;
    align-items: center;
  }
  .music-list-playlist-icon-title,
  .music-list-playlist-icon-setting
  {
    width: .25rem;
    height: .25rem;
  }
  .music-list-playlist-icon-title
  {
    margin-right: 0.375rem;
    background-image: url("../../static/images/icon_play_all.png");
  }
  .music-list-playlist-icon-setting
  {
    background-image: url("../../static/images/icon_setting.png");
  }
  .music-list-playlist-title {
    flex-grow: 1;
    font-weight: normal;
    line-height: 1;
  }
  .music-list-playlist-count {
    color: #919293;
  }
  /*  列表  */
  .music-list {
    border-top: 1px solid #e5e7e8;
  }
  .music-list-item {
    align-items: center;
    justify-content: space-between;

  }
  .music-list-item-index {
    flex-shrink: 0;
    width: .25rem;
    height: .5rem;
    color: #919293;
    line-height: .5rem;
    text-align: center;
    flex:1;
  }
  .music-list-item-playing {
    flex: 1;
    width: .25rem;
    height: .25rem;
    background: url("../../static/images/icon_loudspeaker_playing.png") center  no-repeat;
    background-size: contain;
  }
  .music-item-container {
    flex-grow: 1;
    height: .5rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7e8;
    overflow: hidden;
    flex:9;
    padding: 5px 0;
  }
  .music-item {
    flex-grow: 1;
  }
  .music-detail {
    height:.3rem;
    padding-right: .2rem;
    align-items: center;
  }
  .music-name {
    line-height: .5rem;
    font-size:14px;
  }
  .icon-mv {
    flex-shrink: 0;
    margin-left: 0.125rem;
    width: .5rem;
    height: 100%;
    background-image: url("../../static/images/icon_mv.png");
  }
  .music-singer {
    padding-right: .15rem;
    color: #797a7b;
    line-height: 1;
    font-size:12px;
  }
  .icon-ellipsis {
    flex-shrink: 0;
    padding: 0 .16rem;
    width: 0.16rem;
    height: 100%;
    background-image: url("../../static/images/ellipse.png");
    background-size: cover;
    background-position: center center;
  }
  .icon-ellipsis-white{
    background-image: url("../../static/images/find_music/ellipse.png");
  }
  .icon{
    width: .32rem;height: .32rem;
    display: inline-block;
    background-size: contain;
  }
  .icon-playing{
    background-image: url("../../static/images/find_music/playing-white.png");
    margin-left: .2rem;
  }
  .icon-arrow{
    background:url(../../static/images/find_music/arrow_right.png) center right no-repeat;
    width: .2rem;height: .2rem;margin-left: .1rem;float: left;
  }
  .music-list-message-detail{padding: .25rem 0;flex:3}
  .music-list-message-creator-info{height: 50%;}
  .music-list-message-creator-name span{float: left;}
  .music-list-message-creator-name{align-items:center}
</style>

