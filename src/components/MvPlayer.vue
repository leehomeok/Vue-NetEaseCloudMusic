<template>
  <div class="flex mv-player-component">
    <div class="flex mv-player-header">
      <icon-back></icon-back>
    </div>
    <div class="mv-player-container">
      <video class="mv-player" :src="videoUrl" id="mvPlayer" controls autoplay></video>
    </div>
    <div class="scroll-content">
      <div class="mv-info">
        <h4 class="mv-player-title font-size-18">{{ mvInfo.name }}</h4>
        <div class="flex mv-info-detail">
          <div class="mv-info-artists text-ellipsis">歌手：{{ mvInfo.artists | transformArtistList }}</div>
          <div class="mv-info-vertical-line"></div>
          <div class="mv-info-play-count text-ellipsis">播放：{{ mvInfo.playCount | transformNumberCount }}次</div>
        </div>
        <div class="publish-time font-size-10">发行时间：{{ mvInfo.publishTime }}</div>
      </div>
      <div class="flex mv-player-buttons">
        <div class="definition-tip">当前视频清晰度：</div>
        <div class="flex mv-player-buttons-group">
          <button v-if="brsType[240]" @click="changeBrs('SD')" class="btn-definition" :class="{'btn-definition-active': videoBrs === 'SD'}">标清</button>
          <button v-if="brsType[480]" @click="changeBrs('HD')" class="btn-definition" :class="{'btn-definition-active': videoBrs === 'HD'}">高清</button>
          <button v-if="brsType[720]" @click="changeBrs('HC')" class="btn-definition" :class="{'btn-definition-active': videoBrs === 'HC'}">超清</button>
          <button v-if="brsType[1080]" @click="changeBrs('1080P')" class="btn-definition" :class="{'btn-definition-active': videoBrs === '1080P'}">1080P</button>
        </div>
      </div>
      <div class="definition-tips">注意，加载超清或者1080P的MV资源可能会出错</div>
    </div>
    <toast v-if="toastShow" :text="ToastText"></toast>
  </div>
</template>

<script>
  import IconBack from './common/IconBack.vue'
  import Toast from './common/Toast.vue'
  export default{
    name: 'MvPlayer',
    data () {
      return {
        mvInfo: {}, //  MV信息对象
        videoDomElement: '', //  视频DOM对象
        videoUrl: '', //  视频链接
        videoBrs: 'SD', //  视频的清晰度,SD->标清、HD->高清、HC->超清
        brsType: {}, //  拥有的视频清晰度对象
        toastShow: false, //  显示提示信息对象
        ToastText: '' //  提示信息
      }
    },
    computed: {
      mvId () {
        return this.$route.params.id
      }
    },
    watch: {
      mvId (newValue) {
        if (newValue) {
          this.videoUrl = ''
          this.loadData()
        }
      }
    },
    methods: {
      loadData () {
        this.$http({url: 'music.php', params: {mvId: this.mvId}}).then(function (res) {
          this.mvInfo = res.data.data
          for (var key in this.mvInfo.brs) {
            this.brsType[key] = true
          }
          this.getUrl()
        })
      },
      changeBrs (type) { //  更换视频源
        if (this.videoBrs === type) return
        this.videoBrs = type
        if (type !== 'SD' || type !== 'HD') {
          this.toastShow = true
          this.ToastText = '正在为您切换资源文件，请稍等...'
        } else {
          this.toastShow = true
          this.ToastText = '正在切换清晰度，如长时间不能播放请切换回标清或高清播放'
        }
        this.closeToast(3000)
        this.videoDomElement.pause()
        this.getUrl()
      },
      getUrl () {
        var url = ''
        if (this.videoBrs === 'SD') {
          url = this.mvInfo.brs[240]
        } else if (this.videoBrs === 'HD') {
          url = this.mvInfo.brs[480]
        } else if (this.videoBrs === 'HC') {
          url = this.mvInfo.brs[720]
        } else {
          url = this.mvInfo.brs[1080]
        }
        this.$http({url: 'music.php', params: {video: url, filename: this.videoBrs + '-' + this.mvInfo.id}}).then(function (res) {
          this.videoUrl = res.data
        }).catch(function () {
          this.toastShow = true
          this.ToastText = '服务器出错了o(╯□╰)o'
          this.closeToast(3000)
        })
      },
      getVideoDomElement () {
        this.videoDomElement = document.getElementById('mvPlayer')
        this.videoDomElement.addEventListener('play', this.onMediaPlay)
        this.videoDomElement.addEventListener('error', this.onMediaError)
      },
      onMediaPlay () {
        this.$store.commit('pauseControl')
      },
      onMediaError () {
        this.toastShow = true
        this.ToastText = '请稍等，服务器正在处理资源请求...'
        this.closeToast(3000)
      },
      closeToast (time) { //  提示信息关闭时间
        var self = this
        var timer = setTimeout(function () {
          self.toastShow = false
          clearTimeout(timer)
        }, time)
      }
    },
    created () {
      this.loadData()
    },
    mounted () {
      this.getVideoDomElement()
    },
    beforeDestroy () {
      this.videoDomElement.removeEventListener('loadedmetadata', this.onMediaLoadedmetadata)
      this.videoDomElement.removeEventListener('play', this.onMediaError)
      this.videoDomElement.removeEventListener('error', this.onMediaError)
    },
    components: {
      IconBack, Toast
    }
  }
</script>


<style scoped>
  .mv-player-component {
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: #fff;
  }
  .mv-player-header {
    flex-shrink: 0;
    padding-left: .25rem;
    height: 1rem;
    align-items: center;
    background: rgba(255,255,255,0);
    position: absolute;
    top:0;left: 0;
    z-index: 1000;
  }
  .mv-player-title {
    flex-grow: 1;
    padding-right: 1.125rem;
    padding-left: 1.125rem;
    color: #fff;
  }
  .scroll-content {
    flex-grow: 1;
    overflow: scroll;
  }
  /*  MV信息-start  */
  .mv-info {
    padding: 0.05rem 0.25rem ;
  }
  .mv-info .mv-player-title {
    padding: 0;
    color: #333;
    line-height: .5rem;
  }
  .mv-info-detail {
    padding-top: 0.1875rem;
    height: .5rem;
    line-height: .5rem;
  }
  .mv-info-artists {
    color: #507daf;
  }
  .mv-info-vertical-line {
    flex-shrink: 0;
    width: 0.025rem;
    height: 100%;
    margin:0 .5rem;
    background-color: #dadcdd;
  }
  .mv-info-play-count {
    flex-grow: 1;
    color: #919293;
  }
  .publish-time {
    padding-top: 0.25rem;
    color: #999;
    line-height: 1;
  }
  /*  MV信息-end  */
  /*  MV播放器控件  */
  .mv-player-container {
    flex-shrink: 0;
    overflow: hidden;
  }
  .mv-player {
    width: 100%;
    object-fit: inherit;
  }
  /*  视频清晰度选择按钮  */
  .mv-player-buttons {
    padding: 0.25rem;
    flex-shrink: 0;
    justify-content: flex-start;
    align-items: center;
  }
  .definition-tip,
  .definition-tips
  {
    color: #999;
  }
  .definition-tips {
    padding-left: 0.625rem;
  }
  .btn-definition {
    display: inline-block;
    margin: 0;
    padding: 0.1875rem 0.375rem;
    color: #666;
    line-height: 0.875rem;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background: none;
    border: none;
  }
  .btn-definition-active {
    color: #507daf;
  }
</style>
