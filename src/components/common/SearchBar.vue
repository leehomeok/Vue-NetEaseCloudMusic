<template>
  <div class="head-center">
    <div class="search_wrapper flex">
      <i class="icon icon-search "></i>
      <input @click="goToSearch()" type="search" class="search-input" placeholder="搜索音乐、歌词、电台"/>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{

          }
      },
    methods:{
      goToSearch(){
          //console.log(this.$router);
          var locNow=window.location.href;
          if(locNow.indexOf("Search")==-1){
            this.$router.push({name:"Search"})
          }
      }
    }

  }

</script>
<style>
  .head-center{flex:6}
  .icon-search{width:16px;height: 16px;flex:1;background:url(../../../static/images/find_music/search.png);position: absolute;left:50px;top:10px;}
  .search-input{border: 0;height: .5rem;border-radius:30px;width:100%;margin: 0 0;background: #e6e6e6;padding: 0 10%;flex:3;}
  .search-input:focus{border: none;}
</style>
<style scoped>

</style>
