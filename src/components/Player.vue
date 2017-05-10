<template>
  <div class="flex player-component background">
    <canvas class="blur-background" id="blurBackground"></canvas>
    <div class="flex player-header">
      <icon-back></icon-back>
      <div class="player-music-item">
        <h4 class="player-music-name  text-ellipsis">{{ songMsg.name }}</h4>
        <p class="player-music-singer text-ellipsis">{{ songMsg.artists | transformArtistList }}</p>
      </div>
      <div class="player-share background"></div>
    </div>
    <div class="flex player-diskette">
      <div class="player-diskette-pole background" :class="{'pausing': !playStatus}"></div>
      <div class="player-diskette-bg">
        <div class="flex player-diskette-rotate background" :class="{'pausing': !playStatus}">
          <img crossorigin="anonymous" class="player-diskette-album" @load="imgLoaded" @error="imgError" id="album" :src="'http://demo.guojingfeng.com/api/music.php?url=' + songMsg.album.picUrl" />
        </div>
      </div>
    </div>
    <lyric></lyric>
    <div class="player-footer">
      <div class="flex player-timeline">
        <div class="player-timeline-time player-timeline-time-left">{{ songCurrentTime | transformTime}}</div>
        <slider class="slider-wrap"></slider>
        <div class="player-timeline-time font-size-10 player-timeline-time-right">{{ songDuration | transformTime}}</div>
      </div>
      <div class="flex player-controllers">
        <div @click="changePlayMode" class="player-mode background" :class="{'player-mode-listRandom': playMode === 'listRandom', 'player-mode-singleCycle': playMode === 'singleCycle'}"></div>
        <div @click="preControl" class="player-pre background"></div>
        <div @click="playControl" class="player-pause background" :class="{'player-play': !playStatus}"></div>
        <div @click="nextControl" class="player-next background"></div>
        <div @click="showPlaylist = true" class="player-playing-list background"></div>
      </div>
    </div>
    <playlist :component-mounted="showPlaylist" v-if="playlist.list.length !== 0" @close="showPlaylist = false"></playlist>
  </div>
</template>

<script>
  import IconBack from './common/IconBack.vue'
  import Slider from './common/Slider.vue'
  import Lyric from './player/Lyric.vue'
  import Playlist from './Playlist.vue'
  import StackBlur from 'stackblur-canvas'
  import albumUrl from '../../static/images/player/album.png'
  export default{
    data () {
      return {
        showPlaylist: false,
        canvasDomElement: '', //  用于高斯模糊背景的canvas对象
        albumDomElement: '' //  封面专辑图片对象
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
      playMode () {
        return this.$store.state.playMode
      },
      songCurrentTime () {
        return this.$store.state.songCurrentTime
      },
      songDuration () {
        return this.$store.state.songDuration
      }
    },
    methods: {
      playControl () { //  播放控制
        if (this.playStatus) {
          this.$store.commit('pauseControl')
        }
        else {
          this.$store.commit('playControl')
        }
      },
      preControl () { //  上一首
        this.$store.dispatch('preControl')
      },
      nextControl () { //  下一首
        this.$store.dispatch('nextControl')
      },
      changePlayMode () {
        this.$store.commit('setPlayMode')
      },
      imgLoaded () {
        StackBlur.image(this.albumDomElement, this.canvasDomElement, 180)
      },
      imgError () {
        this.albumDomElement.src = albumUrl
      }
    },
    mounted () {
      this.canvasDomElement = document.getElementById('blurBackground')
      this.albumDomElement = document.getElementById('album')
    },
    components: {
      IconBack, Slider, Lyric, Playlist
    }
  }
</script>


<style scoped>
  .player-component {
    position: relative;
    height: 100%;
    flex-direction: column;
  }
  .blur-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%!important;
    height: 100%!important;
  }
  .player-header {
    padding: 0 0.125rem;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }
  .player-music-item {
    overflow: hidden;
    height: 100%;
    padding: 5px 0;text-align: center;
  }
  .player-music-name {
    line-height: 2;
    font-size: 14px;
    color: #fff;
  }
  .player-music-singer {
    color: rgba(255, 255, 255, .5);
    line-height: 0.5rem;
    font-size:12px;
  }
  .player-share {
    flex-shrink: 0;
    width: .32rem;
    height: .32rem;
    background-image: url("../../static/images/player/icon_share.png");
  }
  .player-diskette {
    position: relative;
    flex-grow: 1;
    justify-content: center;
    overflow: hidden;
  }
  .play-line {
    position: absolute;
    width: 100%;
    height: 0.0625rem;
    top: 0;
    left: 0;
    z-index: 99;
    background-image: url("../../static/images/player/icon_line.png");
  }
  .player-diskette-pole {
    position: absolute;
    top: -0.4rem;
    left: 63%;
    z-index: 9;
    margin-left: -0.8125rem;
    width: 2.02rem;
    height: 3.10rem;
    background-image: url("../../static/images/player/icon_diskette_pole.png");
    -webkit-transition: transform .5s;
    -moz-transition: transform .5s ;
    -ms-transition: transform .5s ;
    -o-transition: transform .5s ;
    transition: transform .5s ;
    transform-origin: 0.8125rem 0.8125rem;
  }
  .player-diskette-pole.pausing {
    transform: rotate(-25deg);
  }
  .player-diskette-bg {
    position: absolute;
    top: 20%;
    left: 50%;
    z-index: 5;
    margin-left: -2.5rem;
    width: 5rem;
    height: 5rem;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 50%;
    overflow: hidden;
  }
  .player-diskette-rotate {
    width: 5rem;
    height: 5rem;
    justify-content: center;
    align-items: center;
    background-image: url("../../static/images/player/icon_diskette.png");
    border-radius: 50%;
    -webkit-animation: disketteRotate 20s linear infinite;
    -o-animation: disketteRotate 20s linear infinite;
    animation: disketteRotate 20s linear infinite;
    -webkit-animation-play-state: running;
    -moz-animation-play-state: running;
    -o-animation-play-state: running;
    animation-play-state: running;
  }
  .player-diskette-rotate.pausing {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -o-animation-play-state: paused;
    animation-play-state: paused;
  }
  @-webkit-keyframes disketteRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      -moz-transform: rotate3d(0, 0, 1, 0deg);
      -ms-transform: rotate3d(0, 0, 1, 0deg);
      -o-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      -moz-transform: rotate3d(0, 0, 1, 360deg);
      -ms-transform: rotate3d(0, 0, 1, 360deg);
      -o-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  @keyframes disketteRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
      -moz-transform: rotate3d(0, 0, 1, 0deg);
      -ms-transform: rotate3d(0, 0, 1, 0deg);
      -o-transform: rotate3d(0, 0, 1, 0deg);
      transform: rotate3d(0, 0, 1, 0deg);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
      -moz-transform: rotate3d(0, 0, 1, 360deg);
      -ms-transform: rotate3d(0, 0, 1, 360deg);
      -o-transform: rotate3d(0, 0, 1, 360deg);
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
  .player-diskette-album {
    width: 3.66rem;
    height: 3.66rem;
    border-radius: 50%;
  }
  .player-footer {
    height: 2.25rem;
  }
  .player-timeline {
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 1rem;
    width: 100%;
  }
  .player-timeline-time {
    flex: 1;
    width: 2.625rem;
    color: rgba(255, 255, 255, .8);
    line-height: 0.625rem;
    text-align: center;
  }
  .player-timeline-time-left {
  }
  .player-timeline-time-right {
  }
  .slider-wrap {
    flex: 6;
  }

  .player-controllers {
    margin-top: .25rem;
    padding: 0 .125rem;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 20px;
    left:0;
    width:100%;

  }
  .player-mode,
  .player-playing-list,
  .player-pre,
  .player-next {
    width: .32rem;
    height: .32rem;

  }
  .player-mode {
    background-image: url('../../static/images/player/icon_loop_mode.png');
  }
  .player-mode-listRandom {
    background-image: url('../../static/images/player/icon_random_mode.png');
  }
  .player-mode-singleCycle {
    background-image: url('../../static/images/player/icon_single_mode.png');
  }
  .player-playing-list {
    background-image: url('../../static/images/player/icon_playing_list.png');
  }
  .player-pre {
    background-image: url('../../static/images/player/icon_pre.png');
  }
  .player-next {
    background-image: url('../../static/images/player/icon_next.png');
  }
  .player-pause {
    width:.5rem;height: .5rem;

    background-image: url('../../static/images/player/icon_pause.png');
  }
  .player-play {
    background-image: url('../../static/images/player/icon_play.png');
  }
  .player-mode,
  .player-playing-list,
  .player-pre,
  .player-next,
  .player-play,  .player-pause{flex: 1;flex: 1;background-size: contain; align-items: center;
  background-position: center}
  .slider-button-container,.slider-button{
    width: .2rem;
    height: .2rem;
  }
  .mint-tabbar{display: none;}
</style>
