<template>
  <div class="flex search-component">
    <div class="flex search-header primary-bg-color">
      <icon-back></icon-back>
      <div class="search-container">
        <input class="search-input" placeholder="搜索音乐、歌手、歌词、用户" type="text" v-model="keyword">
      </div>
    </div>
    <div class="search-suggestion">
      <div class="flex artists-classification">
        <div class="icon-artist background"></div>
        <div class="artists-classification-name font-size-14">歌手分类</div>
        <div class="icon-arrow background"></div>
      </div>
      <div class="keywords-hot">
        <p class="keywords-hot-title">热门搜索</p>
        <ul class="flex keyword-hot-list">
          <li class="keyword-hot-item">借我</li>
          <li class="keyword-hot-item">告白气球</li>
          <li class="keyword-hot-item">一首写给她的歌</li>
          <li class="keyword-hot-item">成都</li>
          <li class="keyword-hot-item">大唐荣耀</li>
          <li class="keyword-hot-item">陈奕迅</li>
          <li class="keyword-hot-item">薛之谦</li>
          <li class="keyword-hot-item">防弹少年团</li>
          <li class="keyword-hot-item">莫文蔚</li>
        </ul>
      </div>
      <ul class="search-history-list">
        <li :key="item.id" class="flex search-history-item" v-for="item in searchHistory">
          <div class="search-history-icon-time background"></div>
          <div class="flex search-history-item-content">
            <div class="search-history-item-name">{{item.name}}</div>
            <div class="search-history-icon-remove background" @click="removeHistory(item)"></div>
          </div>
        </li>
      </ul>
    </div>
    <FootBar></FootBar>
  </div>
</template>

<script>
  import IconBack from './common/IconBack.vue'
  import FootBar from './common/footTabBar.vue'
  export default{
    data () {
      return {
        keyword: '', //  搜索关键字,
        searchHistory:[
          {id:1,name:'龙卷风'},
          {id:2,name:'演员'},
          {id:3,name:'告白气球'}
        ],

      }
    },
    methods: {
        removeHistory(i){
          var _this = this;
          var index = _this.searchHistory.indexOf(i);
          if (index !==-1) {
            _this.searchHistory.splice(index, 1);
          }
        }
    },
    created () {
    },
    components: {
      IconBack ,FootBar
    }
  }
</script>


<style scoped>
  .search-component {
    height: 100%;
    flex-direction: column;
  }
  .search-header {
    padding-right: .25rem;
    padding-left: .25rem;
    height: 1rem;
    flex-shrink: 0;
    justify-content: space-between;
    align-items: center;
  }
  .search-container {
    position: relative;
    flex-grow: 1;
    margin-left: 1.125rem;
    height: 1.25rem;
  }
  .search-input
  {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    line-height: 1.25rem;
  }
  .search-input {
    z-index: 9;
    padding: 0;
    color: #fff;
    height: 1.25rem;
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #fff;
  }
  /*  搜索建议及历史  */
  .search-suggestion {
    flex-grow: 1;
  }
  .artists-classification {
    height: 1rem;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #e8e9ea;
  }
  .icon-artist {
    flex-shrink: 0;
    width: .4rem;
    height: .4rem;
    background-image: url("../../static/images/icon_artist.png");
  }
  .icon-arrow {
    flex-shrink: 0;
    width: 0.25rem;
    height: 0.4rem;
    background-image: url("../../static/images/icon_arrow.png");
  }
  .artists-classification-name {
    margin-right: 0.6875rem;
    margin-left: 0.4375rem;
    color: #616262;
    line-height: 1;
  }
  .keywords-hot-title {
    color: #797a7b;
    padding-left: 5px;
    line-height: 2;
  }
  .keyword-hot-list {
    padding-right: .25rem;
    padding-left: 0.25rem;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .keyword-hot-item {
    list-style: none;
    flex-shrink: 0;
    margin-top: 0.25rem;
    margin-right: 0.125rem;
    padding-right: 0.25rem;
    padding-left: 0.25rem;
    line-height: 2;
    border: 1px solid #ced0d0;
    border-radius: 0.5rem; /*  14px  */
  }
  .search-history-list {
    margin-top: .2rem;
  }
  .search-history-item {
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .search-history-icon-time {
    flex-shrink: 0;
    width: .34rem;
    height: 0.34rem;
    background: url("../../static/images/icon_time.png") center center;
    background-size: contain;
  }
  .search-history-item-content {
    flex-grow: 1;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e8e9ea;
  }
  .search-history-item-name {
    flex-grow: 1;
    line-height: 2;
    padding-left: .2rem;
  }
  .search-history-icon-remove {
    flex-shrink: 0;
    width: .32rem;
    height: .32rem;
    background: url("../../static/images/icon_remove.png")center center;
    background-size: contain;
  }
</style>
