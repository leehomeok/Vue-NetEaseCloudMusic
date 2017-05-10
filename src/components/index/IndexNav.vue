<template>
  <div class="index-nav-component">
    <ul class="tabs flex">
      <template v-for="(item, index) in tabs">
        <li @click="goToRouter(item.routerName, index)" class="tab-item font-size-14 align-center"
            :class="{'tab-item-active':index === tabIndex}">{{ item.name }}</li>
      </template>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        tabs: [
          { name: '个性推荐',  routerName: 'MyList' },
          { name: '歌单',routerName: 'SongMenu' },
          {name: '主播电台',routerName: 'MvList' },
          { name: '排行榜', routerName: 'RankingList' }
        ],
        tabIndex: 0 //  默认激活tab索引
      }
    },
    methods: {
      goToRouter (name, index) {
        if (this.tabIndex === index) return
        this.tabIndex = index
        this.$router.push({name})
      }
    },
    created () {
    },
    components: {
    }
  }
</script>


<style scoped>
  li {
    list-style: none;
  }
  .tabs {
    background-color: #feffff;
    position: fixed;
    top:50px;
    width: 100%;
    z-index: 1000;
  }
  .tabs .tab-item {
    width: 25%;
    color: #666;
    line-height: .5rem;
    border-bottom: 0.05rem solid #feffff;
  }
  .tabs .tab-item-active {
    color: #d33a31;
    border-bottom-color: #d33a31;
  }
</style>
