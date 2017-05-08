<template>
  <div @click="goBack" class="icon-back-component background"></div>
</template>
<style scoped>
  .icon-back-component {
    flex-shrink: 0;
    width: .32rem;
    height: .32rem;
    background-image: url("../../../static/images/find_music/arrow.png");

  }
</style>
<script>
  export default{
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>
