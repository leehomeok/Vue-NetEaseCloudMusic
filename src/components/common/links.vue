<template>
  <div class="flex">
    <div class="flex-item" >
      <div class="item">
        <i class="fm"></i>
      </div>
      <p>私人FM</p>
    </div>
    <div class="flex-item">
      <div class="item">
        <i class="daily"></i>
      </div>
      <p>每日推荐</p>
    </div>
    <div class="flex-item" >
      <div class="item" @click="go('SongMenu')">
        <i class="music_menu"></i>
      </div>
      <p>歌单</p>
    </div>
    <div class="flex-item" @click="go('RankingList')">
      <div class="item">
        <i class="hot"></i>
      </div>
      <p>排行榜</p>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        list:[
          {className:'fm',  itemName:'私人FM'},
          {className:'daily',  itemName:'每日歌曲推荐'},
          {className:'hot',  itemName:'云音乐热歌榜'},
        ]
      }
    },
    methods:{
      go(name){
        this.$router.push({
          name: name
        })
      }
    }
  }
</script>
<style scoped>
  .flex{display: flex;justify-content: space-around;}
  .flex-item{padding: 10px 0 5px;width:33.3333333333%;text-align: center;}
  i{display: block;width: 32px;height: 32px;margin: 9px auto;}
  .fm{background: url("../../../static/images/find_music/fm.png");}
  .music_menu{
    background: url("../../../static/images/find_music/music-menu.svg");
  }
  .daily{background: url("../../../static/images/find_music/dailysong.png");}
  .hot{background: url("../../../static/images/find_music/ranklist.png");}
  .item{border:2px solid #d33a31;height: 50px;width: 50px;margin:0 auto .1rem;
    -webkit-border-radius:50%;
    -moz-border-radius:50%;
    border-radius:50%;}
</style>
