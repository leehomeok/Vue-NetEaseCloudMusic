<template>
  <div class="page-header flex">
    <div class="flex-item">
      <icon-back class="back-icon"/>
    </div>
    <p class="flex-item">{{title}}</p>
    <div class="flex-item flex">
      <div class="inner-item"></div>
      <div class="inner-item"></div>
      <icon-playing class="inner-item"></icon-playing>
    </div>
  </div>
</template>
<script>
import IconBack from './IconBack'
import IconPlaying from './playing'
export default {
  props:{
    title: String
  },
  components: {
    IconBack,IconPlaying
  },
  data() {
    return {}
  }
}
</script>
<style>
.back-icon{
  margin-top: .2rem;
}
</style>
