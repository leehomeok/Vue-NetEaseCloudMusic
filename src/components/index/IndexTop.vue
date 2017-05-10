<template>
   <div class="container">
      <div class="head-left">
         <a class="block" href=""><i class="icon mai"></i></a>
      </div>
      <SearchBar></SearchBar>
      <div class="head-right">
         <a class="block" @click="goPlay()">
           <!--<i class="icon playing"></i>-->
           <IconPlaying></IconPlaying>
         </a>
      </div>
    </div>
</template>

<script>
  import IconPlaying from '../common/playing.vue'
  import SearchBar from '../common/SearchBar'
  export default{
    data(){
       return{
         name: 'top',
         yangshi:{
           color:'#333'
         }
       }
    },

    methods: {
      goToSearch () {
        this.$router.push({name: 'Search'})
      },
      goPlay(){
        this.$router.push({ name: 'Play'})
      }
    },
    components:{
      SearchBar,IconPlaying
    }
  }
</script>
<style scoped>
  .index-top {
    height: 3.25rem;
    padding-right: 0.875rem;
    justify-content: space-between;
    align-items: center;
  }
  .index-top .logo {
    width: 9.357rem;
    height: 3rem;
    background-image: url("../../../static/images/index/logo.png");
  }
  .index-top .search {
    width: 1.25rem;
    height: 1.25rem;
    background-image: url("../../../static/images/index/m5.png");
  }
  .container{display:flex;justify-content: space-around;padding: 5px 0;background:#fff;position: fixed;top:0;width: 100%;z-index: 1001;}
.icon{width: 32px;height: 32px;display: block;margin: 0 auto;}

.mai{background:url(../../../static/images/find_music/MICROPHONE.png);}
.playing{background:url(../../../static/images/find_music/playing.png);}
  .icon-sm{width:16px;height: 16px;}
.search{background:url(../../../static/images/find_music/search.png);position: absolute;left: 20%;top:4px;}
.search-input{border: 0;height: 100%;border-radius:30px;width:100%;margin: 0 0;background: #e6e6e6;padding: 0 20%;}
.search-input:focus{border: none;}
.head-left{flex:1;}
.head-center{flex:6}
.head-right{flex:1;padding-left: 15px;}
.search_wrapper{background: #fff;font-size: 12px;height: 26px;line-height: 26px;border-radius:30px;position: relative; margin-top:3px;}
::-webkit-input-placeholder {color:#999;text-align: center}
:-moz-placeholder {color:#999;}
:-ms-input-placeholder {color:#999;}
</style>
