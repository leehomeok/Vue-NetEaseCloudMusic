<template>
  <div class="song-list-component" >
    <div class="song-list-detail" @click="goToMusicList(songListInfo.id)" >
      <img class="song-list-detail-cover" :src="songListInfo.coverImgUrl">
      <div class="flex song-list-detail-listen">

        <div class="song-list-detail-listen-count">
        <i class="song-list-detail-listen-icon background"></i>
        {{ songListInfo.playCount | transformNumberCount }}</div>
      </div>
    </div>
    <p class="song-list-name">{{ songListInfo.name }}</p>
  </div>
</template>

<script>
  export default{
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        componentWidth: 0, //  当前组件宽度
        componentHeight: 0, //  当前组件高度
        songListInfo: {} //  当前歌单信息
      }
    },
    computed: {
      phoneResolutionWidth () {
        return this.$store.state.phoneResolutionWidth
      }
    },
    methods: {
      loadData () {
        this.$http({url: 'music.php', params: {pIdOld: this.id}}).then(function (res) {
          if (res.data.code === 200) {
            this.songListInfo = res.data.result
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
    beforeMount () {
      var dpr = window.devicePixelRatio || 1
      //  设置组件宽度 = （当前手机分辨率宽度 - （2px间距）* 2 * 设备像素比) / 3
      this.componentWidth = (this.phoneResolutionWidth - 2 * 2 * dpr) / 3
      //  组件高度和宽度比为1:1
      this.componentHeight = this.componentWidth
      this.loadData()
    }
  }
</script>


<style scoped>
  .song-list-component {
    height: 2.25rem;
    width:1rem;
    margin-right:.05rem;
    margin-bottom:.5rem;
    flex:1
  }
  .flex .song-list-component:last-child{margin:0!important;}
  .song-list-detail {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .song-list-detail-cover {
    width: 100%;
    height: 100%;
  }
  .song-list-detail-listen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
  }
  .song-list-detail-listen-icon {
    display:block;
    float:left;
    width: 0.25rem;
    height: 0.25rem;
    background-image: url('../../../static/images/index/vn.png');
  }
  .song-list-detail-listen-count {
    position:absolute;
    right:0.05rem;
    top:0.05rem;

    color: #fff;
  }
  .song-list-name {
    margin:.05rem 0 .15rem ;text-align:center;
  }
</style>

