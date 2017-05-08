<template>
  <div class="slider-component">
    <div class="slider">
      <input type="range" class="slider-input" :min="min" :max="songDuration" :step="step" v-model="value">
      <div class="slider-bg"></div>
      <div class="slider-process-bg" :style="{'width': sliderButtonLeft + 'px'}"></div>
      <div class="slider-button-container" :style="{'left': sliderButtonLeft + 'px'}">
        <div v-show="isBuffering" class="slider-button-loading background"></div>
        <div class="slider-button"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      min: {
        type: Number,
        default: 0
      },
      step: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        width: 0 //  当前组件宽度
      }
    },
    computed: {
      value: { //  slider滑块的当前值
        get () {
          return this.$store.state.songCurrentTime
        },
        set (newValue) {
          this.$store.commit('setSongCurrentTime', newValue)
        }
      },
      isBuffering () {
        return this.$store.state.isBuffering
      },
      songDuration () {
        return Math.ceil(this.$store.state.songDuration)
      },
      sliderButtonLeft () {
        return this.value / this.songDuration * this.width
      }
    },
    mounted () {
      this.width = this.$el.offsetWidth
    }
  }
</script>


<style scoped>
  .slider {
    position: relative;
    width: 100%;
    height: 1rem;
  }
  .slider-input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 50;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .slider-bg,
  .slider-process-bg
  {
    position: absolute;
    top: 0.4375rem;
    z-index: 1;
    line-height: 0;
    width: 100%;
    height: 0.1rem;
    background-color: rgba(255, 255, 255, .8);
    border-radius: 0.125rem;
  }
  .slider-process-bg
  {
    width: 0;
    z-index: 2;
    background-color: #d33a31;
  }
  .slider-button-container,
  .slider-button,
  .slider-button-loading
  {
    position: absolute;
    top: 0.2rem;
    left: -0.1rem;
    z-index: 5;
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
  }
  .slider-button {
    background-color: #fff;
  }
  .slider-button-loading {
    z-index: 9;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -o-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    -webkit-animation: scaleRotate 5s linear infinite;
    -o-animation: scaleRotate 5s linear infinite;
    animation: scaleRotate 5s linear infinite;
    background-image: url("../../../static/images/player/icon_loading.png");
  }
  @-webkit-keyframes scaleRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -moz-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -ms-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -o-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -moz-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -ms-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -o-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
    }
  }
  @keyframes scaleRotate {
    from {
      -webkit-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -moz-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -ms-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      -o-transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
      transform: rotate3d(0, 0, 1, 0deg) scale3d(0.8, 0.8, 1);
    }
    to {
      -webkit-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -moz-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -ms-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      -o-transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
      transform: rotate3d(0, 0, 1, 360deg) scale3d(0.8, 0.8, 1);
    }
  }
</style>
