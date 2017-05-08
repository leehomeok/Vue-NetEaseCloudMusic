<template>
    <div class="container">
      <div class="head-left">
         <a class="block" href=""><i class="icon mai"></i></a>
      </div>
      <div class="head-center">
        <div class="search_wrapper">
          <i class="icon icon-sm search "></i>
          <input type="search" class="search-input" placeholder="搜索音乐、歌词、电台"/>
        </div>
      </div>
      <div class="head-right">
         <a class="block" @click.native="gotoPlaying()"><i class="icon playing"></i></a>
      </div>
    </div>
</template>
<script>
export default{
     data(){
         return{
            player:'player'
         }
     },
    methods:{
        gotoPlaying(){
            this.$router.push({name:'Player'})
        }
    }

}
</script>
<style>
.container{display:flex;justify-content: space-around;padding: 5px 0}
.icon{width: 32px;height: 32px;display: block;margin: 0 auto;}
.icon-sm{width:16px;height: 16px;}
.mai{background:url(../../../static/images/find_music/MICROPHONE.png);}
.playing{background:url(../../../static/images/find_music/playing.png);}
.search{background:url(../../../static/images/find_music/search.png);position: absolute;left: 20%;top:4px;}
.search-input{border: 0;height: 100%;border-radius:30px;width:100%;margin: 0 0;background: #e6e6e6;padding: 0 20%;}
.search-input:focus{border: none;}
.head-left{flex:1;}
.head-center{flex:6}
.head-right{flex:1;padding-left: 10px;}
.search_wrapper{background: #fff;font-size: 12px;height: 26px;line-height: 26px;border-radius:30px;position: relative; margin-top:3px;}
::-webkit-input-placeholder {color:#999;text-align: center}
:-moz-placeholder {color:#999;}
:-ms-input-placeholder {color:#999;}
</style>
