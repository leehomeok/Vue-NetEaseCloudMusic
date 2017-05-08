<template>
  <div class="footer-player-component">
    <div class="flex footer-player">
      <div @click="goToPlayer" class="footer-player-album-container">
        <img class="footer-player-album" :src="songMsg.album.picUrl">
      </div>
      <div @click="goToPlayer" class="footer-player-songmsg">
        <h4 class="footer-player-name font-size-14 text-ellipsis">{{ songMsg.name }}</h4>
        <div v-if="(!lyric.noLyric && playStatus) || (!lyric.uncollected  && playStatus) || (!lyric.unScroll  && playStatus)" class="footer-player-singer-or-lyric text-ellipsis">{{ lyric.lyric }}</div>
        <div v-else class="footer-player-singer-or-lyric text-ellipsis">{{ songMsg.artists | transformArtistList }}</div>
      </div>
      <div @click="playControl" class="footer-player-playstatus background" :class="{'footer-player-playstatus-false': !playStatus}"></div>
      <div @click="showPlaylist = true" class="footer-player-playlist background"></div>
    </div>
    <playlist :component-mounted="showPlaylist" v-if="playlist.list.length !== 0" @close="showPlaylist = false"></playlist>
  </div>
</template>

<script>
  import Playlist from '../Playlist.vue'
  export default{
    name: 'FooterPlayer',
    data () {
      return {
        showPlaylist: false
      }
    },
    computed: {
      playlist () {
        return this.$store.state.playlist
      },
      songMsg () {
        return this.$store.state.songMsg
      },
      playStatus () {
        return this.$store.state.playStatus
      },
      currentLyricArrIndex () {
        return this.$store.state.currentLyricArrIndex
      },
      lyric () {
        return this.$store.state.lyricArr[this.currentLyricArrIndex]
      }
    },
    methods: {
      goToPlayer () { //  跳转到播放界面
        this.$router.push({name: 'Player'})
      },
      playControl () { //  按钮的播放控制
        if (this.playStatus) {
          this.$store.commit('pauseControl')
        } else {
          this.$store.commit('playControl')
        }
      }
    },
    components: {
      Playlist
    }
  }
</script>


<style scoped>
  .footer-player-component {
    flex-shrink: 0;
  }
  .footer-player
  {
    width: 100%;
    height: 1.25rem;
  }
  .footer-player {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    justify-content: flex-start;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
  }
  .footer-player-album-container {
    flex-shrink: 0;padding:0 5%;
    width: 1rem;
    height: 1rem;
  }
  .footer-player-album {
    width: 100%;
    height: 100%;
    border: none;
  }
  .footer-player-songmsg {
    flex-grow: 1;
    padding-right: 0.5625rem;
    padding-left: 0.5625rem;
    overflow: hidden;
  }
  .footer-player-name {
    color: #333;
    line-height: 1.25rem;
  }
  .footer-player-singer-or-lyric {
    color: #808080;
    line-height: 1rem;
  }
  .footer-player-playstatus {
    flex-shrink: 0;
    width: .32rem;
    height: .32rem;
    background-image: url("../../../static/images/icon_playing_pause.png");
  }
  .footer-player-playstatus-false {
    background-image: url("../../../static/images/icon_play_all.png");
  }
  .footer-player-playlist {
    flex-shrink: 0;
    width: .32rem;
    height: .32rem;
    background-image: url("../../../static/images/icon_playing_list.png");
  }
</style>
