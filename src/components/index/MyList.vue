<template>
  <div class="my-list-component">
    <index-banner></index-banner>
    <Links></Links>
    <cate-title title="推荐歌单"></cate-title>
    <div class="song-list-container clearfix">
      <SongList v-for="item in recommendList" 
        :key="item.id"
        :item="item" />
    </div>

    <cate-title title="独家放送"></cate-title>
    <SoleBroadcast></SoleBroadcast>

    <cate-title title="推荐MV"></cate-title>
    <div class="mv-recommend-container clearfix">
      <mv-recommend class="mv-recommend"
        v-for="item in MVList"
        :key="item.id"
        :mv="item"
        @click.native="goToMvPlayer(item.id)"
      />
    </div>

    <cate-title title="主播电台"></cate-title>
    <DjList class="clearfix"></DjList>
  </div>
</template>
<script>
import axios from 'axios'
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
  },
  created () {
    this.getRecommendList()
    this.getMVList()
  },
  data () {
    return {
      recommendList: [],
      MVList:[]
    }
  },
  methods: {
    getRecommendList () {
      axios.get(`/nodeApi/personalized`, {}).then(res => {
        if (res.status == 200) {
          this.recommendList = res.data.result
        }
      })
    },
    goToMusicList (id) {
      this.$router.push({
        name: 'MusicList',
        params: {
          id: id
        }
      })
    },
    getMVList () {
      axios.get(`/nodeApi/personalized/mv`, {}).then(res => {
        if (res.status == 200) {
          this.MVList = res.data.result
        }
      })
    },
    goToMvPlayer (id) { //  跳转到MV播放界面
      this.$router.push({
        name: 'mvPlayer',
        params: {
          mvid: id
        }
      })
    }
  }
}
</script>

<style scoped>
  .dj-container
  {
    display:flex;
    justify-content: space-between;
    display:-webkit-box;
  }
  .song-list-container{
    width: 100%;
  }
  .mv-recommend-container .mv-recommend:nth-child(2n){
    float: right;
  }
  .mv-recommend{
    width: 49.5%;
    float: left;
  }
</style>

