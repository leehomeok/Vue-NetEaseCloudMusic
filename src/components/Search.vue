<template>
  <div class="flex search-component">
    <div class="container clearfix">
      <div class="head-center">
        <div class="search_wrapper flex">
          <i class="icon icon-sm icon-search "></i>
          <input  type="search"
            v-on:keyup.13="search()" 
            v-model="keyword"  
            class="search-input" 
            placeholder="搜索音乐、歌词、电台"/>
        </div>
      </div>
      <div class="head-right">
        <a class="block" @click="goBack()">取消</a>
      </div>
    </div>

    <div class="search-suggestion">
      <div class="flex artists-classification">
        <div class="icon-artist background"></div>
        <div class="artists-classification-name font-size-14" @click="goSinger()">歌手分类</div>
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
        <li :key="item.id" class="flex search-history-item" v-for="item in searchList">
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
  import SearchBar from './common/SearchBar.vue'

  export default{
    data () {
      return {
        keyword: '', //  搜索关键字,
        searchList:[ ],

      }
    },
    methods: {
      removeHistory(item){
        var _this = this;
        var  index=_this.searchList.indexOf(item);
              _this.searchList.splice(index, 1);
      },
      search(){
        var _this=this;
        var isExist=false;
        _this.searchList.forEach(function (item) {
             if(item.name==_this.keyword){
                 isExist=true;
             }
        })
        if(!isExist){
          _this.searchList.push({id:_this.searchList.length+1, name:_this.keyword })
        }
      },
      goBack () {
        this.$router.push({name:"Index"})
        //this.$router.go(-1)
      },
      goSinger () {
        this.$router.push({path:"singer-type"})
      }
    },
    computed:{
      searchHistory(){

      }
    },
    created () {
      var _this=this,
        list= localStorage.getItem("searchList");
      if(list){
        _this.searchList=JSON.parse(list);
      }else{

      }
    },
    watch: {
      searchHistory (newValue) {
        if (newValue){

        }
      }
    },
    updated(){
      const  searchHistory=JSON.stringify(this.searchList);
      localStorage.setItem('searchList',searchHistory);
      console.log('hehe');
    },
    beforeDestory(){

    },
    components: {
      IconBack ,FootBar,SearchBar
    }
  }
</script>


<style scoped>
  .container{padding: 5px 10px;display: flex;justify-content:space-between}
  .head-center{flex:5;}
  .head-right{line-height: 30px;font-size: 14px;text-align: right;flex: 1;}
  .header-center {width: 80%;float: left;}
  .search_wrapper .search{left: 20px;}
  .search-component {
    height: 100%;
    flex-direction: column;
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
    height: .8rem;
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
  .icon-sm{left: 20px;}
</style>
