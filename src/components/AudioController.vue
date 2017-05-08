<template>
  <div class="audio-controller-component">
    <audio id="audioElement" src="http://m2.music.126.net/zaGgmMZiqLCzJTv2GYKkaA==/1365593465215365.mp3"></audio>
  </div>
</template>
<style scoped>
</style>
<script>
  export default{
    data () {
      return {
      }
    },
    methods: {
    },
    created () {
    },
    mounted () {
      //  设置全局音频控制对象
      this.$store.commit('setAudioDomElement')
      //  注册播放相关事件
      this.$store.dispatch('registerPlayEvent')
    },
    components: {
    }
  }
</script>
