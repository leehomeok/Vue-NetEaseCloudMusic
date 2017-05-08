<template>
  <div class="flex lyric-component">
    <ul class="lyric">
      <template v-for="(item, index) in lyricArr">
        <transition name="slide-fade">
          <li v-show="currentLyricArrIndex === index" class="lyric-container">
            <div v-if="item.lyric" class="lyric-language-other">{{ item.lyric }}</div>
            <div v-if="item.translateLyric" class="lyric-language-chinese">{{ item.translateLyric }}</div>
          </li>
        </transition>
      </template>
    </ul>
  </div>
</template>

<script>
  export default{
    data () {
      return {
      }
    },
    computed: {
      lyricArr () { //  歌词数组
        return this.$store.state.lyricArr
      },
      currentLyricArrIndex () { //  当前显示的歌词索引值
        return this.$store.state.currentLyricArrIndex
      }
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style scoped>
  .lyric-component {
    flex-shrink: 0;
    padding-right: .25rem;
    padding-left: .25rem;
    height: 1.8rem;
    justify-content: center;
  }
  .lyric {
    position: relative;
    flex-grow: 1;
    /*color: rgba(255, 255, 255, .8);*/
    color: #fff;
    line-height: 1rem; /*  16px  */
  }
  .lyric-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    list-style: none;
    text-align: center;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active
  {
    transition: opacity .5s ease,top .5s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-active
  {
    opacity: 0;
  }
  .slide-fade-enter {
    top: 2rem; /*  32px  */
  }
  .slide-fade-leave-active{
    top: -2rem; /*  -32px  */
  }
</style>
