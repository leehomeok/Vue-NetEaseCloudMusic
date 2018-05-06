<template>
  <div class="song-list-component" >
    <div class="song-list-detail" @click="goToMusicList(item.id)" >
      <img class="song-list-detail-cover" :src="item.picUrl">
      <div class="flex song-list-detail-listen">
        <div class="song-list-detail-listen-count">
        <i class="song-list-detail-listen-icon background"></i>
        {{ item.playCount | transformNumberCount }}</div>
      </div>
    </div>
    <p class="song-list-name">{{item.name }}</p>
  </div>
</template>

<script>
  export default{
    props: {
      item: Object
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
    }
  }
</script>


<style scoped>
  .song-list-component {
    width: 32.33333%;
    margin-bottom:.2rem;
    float: left;
    padding: 0 .5%;
  }
  .flex .song-list-component:last-child{margin:0!important;}
  .song-list-detail {
    position: relative;
    float: left;
    height: 100%;
  }
  .song-list-detail-cover {
    width: 100%;
    height: 100%;
  }
  .song-list-detail-listen {
    
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

