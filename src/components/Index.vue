<template>
  <div class="index-component" :class="{'padding-bottom': songMsg.id !== undefined}">
    <index-top></index-top>

    <index-nav></index-nav>

    <FootBar></FootBar>
  </div>
</template>


<script>
  import IndexTop from './index/IndexTop.vue'
  import IndexNav from './index/IndexNav.vue'
  import FooterPlayer from './common/FooterPlayer.vue'
  import FootBar from './common/footTabBar.vue'

  export default {
    name: 'index',
    data () {
      return {}
    },
    computed: {
      songMsg () {
        return this.$store.state.songMsg
      }
    },
    components: {
      IndexTop, IndexNav, FooterPlayer,FootBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .padding-bottom {
    padding-bottom: .625rem;
  }
</style>
