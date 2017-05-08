<template>
  <div class="my-list-component">
    <index-banner></index-banner>
    <Links></Links>
    <cate-title title="推荐歌单"></cate-title>
    <div class="flex song-list-container">
      <song-list :id="447039671"></song-list>
      <song-list :id="560801222"></song-list>
      <song-list :id="506954473"></song-list>
    </div>
    <div class="flex song-list-container">
      <song-list :id="506913893"></song-list>
      <song-list :id="505347469"></song-list>
      <song-list :id="323396962"></song-list>
    </div>
    <cate-title title="独家放送"></cate-title>
    <SoleBroadcast></SoleBroadcast>

    <cate-title title="推荐MV"></cate-title>
    <div class="flex mv-recommend-container">
      <mv-recommend :id="372204"></mv-recommend>
      <mv-recommend :id="320111"></mv-recommend>
    </div>
    <div class="flex mv-recommend-container">
      <mv-recommend :id="306013"></mv-recommend>
      <mv-recommend :id="5342314"></mv-recommend>
    </div>

    <cate-title title="主播电台"></cate-title>
    <DjList class="clearfix"></DjList>
  </div>
</template>
<script>
  import DjList from '../common/DjList.vue'
  import IndexBanner from './IndexBanner.vue'
  import CateTitle from '../common/CateTitle.vue'
  import SongList from '../common/SongList.vue'
  import MvRecommend from '../common/MvRecommend.vue'
  import Links from '../common/links.vue'
  import SoleBroadcast from '../common/SoleBroadcast.vue'
  export default{
    components: {
      IndexBanner, CateTitle, SongList, MvRecommend,Links,SoleBroadcast,DjList
    }
  }
</script>

<style scoped>
  .song-list-container,
  .mv-recommend-container,
  .dj-container
  {
    display:flex;
    justify-content: space-between;
    display:-webkit-box;
  }
  .mv-recommend-container:last-child {
    padding-bottom: .25rem;
  }
</style>

