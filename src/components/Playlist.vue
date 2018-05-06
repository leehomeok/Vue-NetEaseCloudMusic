<template>
  <div class="playlist-component">
    <transition name="fade">
      <div v-if="componentMounted" @click="close" class="mask"></div>
    </transition>
    <transition name="up">
      <div v-if="componentMounted" class="playlist font-size-14">
        <div class="flex playlist-header">
          <div @click="changePlayMode" class="flex playlist-header-left">
            <div class="flex play-mode">
              <div class="play-mode-icon background" :class="{'play-mode-icon-random': playMode === 'listRandom','play-mode-icon-single': playMode === 'singleCycle'}"></div>
              <div v-if="playMode === 'listCycle'" class="play-mode-name">列表循环({{ playlist.list.length }})</div>
              <div v-else-if="playMode === 'listRandom'" class="play-mode-name">随机播放({{ playlist.list.length }})</div>
              <div v-else class="play-mode-name">单曲循环</div>
            </div>
          </div>
          <div class="flex playlist-header-right">
            <div class="playlist-trash-icon background"></div>
            <div @click="resetPlaylist" class="playlist-trash-name">清空</div>
          </div>
        </div>
        <ul class="playlist-list">
          <li class="flex playlist-item" v-for="(item, index) in playlist.list"
            :key="index">
            <template>
            <div v-if="item.id === songMsg.id" class="playing-icon background"></div>
            <div @click="playThis(item, index)" class="playlist-item-msg text-ellipsis">
              <span class="playlist-item-msg-name">{{ item.name }}</span>
              <span class="playlist-item-msg-singers font-size-12"> - {{ item.artists | transformArtistList }}</span>
            </div>
            <div @click="removeThis(item, index)" class="playlist-icon-remove background"></div>
            </template>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default{
    props: {
      componentMounted: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      playlist () {
        return this.$store.state.playlist
      },
      songMsg () {
        return this.$store.state.songMsg
      },
      playMode () {
        return this.$store.state.playMode
      }
    },
    methods: {
      close () { //  关闭显示
        this.$emit('close')
      },
      playThis (item, index) { //  播放当前项
        if (item.id === this.songMsg.id) { //  点击正在播放的歌曲进行跳转到播放界面
          this.$router.push({
            name: 'Player'
          })
          return
        }
        this.$store.dispatch('playFromPlaylist', index)
      },
      removeThis (item, index) { //  移除当前项
        if (item.id === this.songMsg.id) { //  删除正在播放的歌曲则进行下一首播放
          this.$store.dispatch('nextControl')
        }
        //  先播放下一首再删除
        this.$store.commit('removeItemFromPlaylist', index)
      },
      //  清空播放列表
      resetPlaylist () {
        this.$store.commit('resetPlaylist')
        //  暂停当前正在播放的歌曲
        this.$store.commit('pauseControl')
      },
      changePlayMode () {
        this.$store.commit('setPlayMode')
      }
    }
  }
</script>
<style scoped>
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 1;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .playlist {
    position: fixed;
    padding-bottom: 0.25rem;
    width: 100%;
    height: 7rem;
    bottom: 0;
    left: 0;
    z-index: 99;
    line-height: 1rem;
    color: #333;
    background-color: #fff;
  }
  .up-enter-active, .up-leave-active {
    transition: all .3s;
  }
  .up-enter, .up-leave-active {
    -webkit-transform: translateY(100%);
    -moz-transform: translateY(100%);
    -ms-transform: translateY(100%);
    -o-transform: translateY(100%);
    transform: translateY(100%);
  }
  .playlist-header {
    height: .8rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
  }
  .playlist-header-left,
  .playlist-header-right
  {
    padding: 0 0.25rem;
    height: 100%;
  }
  .playlist-header-right {
    align-items: center;
  }
  .play-mode {
    margin-right: 0.625rem;
    align-items: center;
  }
  .playlist-trash-icon,
  .play-mode-icon {
    margin-right: 0.375rem;
    width:.32rem;
    height: .32rem;
  }
  .play-mode-icon {
    background-image: url("../../static/images/icon_loop_mode.png");
  }
  .play-mode-icon-random {
    background-image: url("../../static/images/icon_random_mode.png");
  }
  .play-mode-icon-single {
    background-image: url("../../static/images/icon_single_mode.png");
  }
  .playlist-trash-icon {
    background-image: url("../../static/images/icon_trash.png");
  }
  .playlist-list {
    padding-left:5%;
    width: 95%;
    height: 70%;
    overflow: scroll;
    position: fixed;
  }
  .playlist-item {
    height: .5rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
  }
  .playing-icon {
    flex-shrink: 0;
    margin-right: 0.2rem;
    width: .36rem;
    height: 0.32rem;
    background-image: url("../../static/images/icon_loudspeaker_playing.png");
  }
  .playlist-icon-remove {
    flex-shrink: 0;
    padding: 0  .05rem;
    width: .24rem;
    height: .24rem;
    background-image: url("../../static/images/icon_remove.png");
    background-size: contain;
    background-position: center center;
  }
  .playlist-item-msg {
    flex-grow: 1;
    padding-right: .125rem;
    height: 100%;
    line-height:2.5;
  }
  .playlist-item-msg-singers {
    color: #808080;
  }
</style>
