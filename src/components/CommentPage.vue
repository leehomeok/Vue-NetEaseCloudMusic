<template>
  <div style="position: relative">
    <div class="flex cmt-top">
      <div class="icon-back background" @click="goBack()"></div>
      <div class="cmt-count">评论({{commentlength}})</div>
      <div class="icon-playing">
        <a class="block" @click="goPlay()">
          <IconPlaying></IconPlaying>
         </a>
      </div>
    </div>
    <div style="background: #fff">
      <div class="flex comment">
        <div class="song-pic">
          <img class="song-picture" v-bind:src="songMsg.album.picUrl" >
          <div class="icon icon-play"></div>
        </div>
        <div class="song-msg">
          <p class="song-name">{{songMsg.name}}</p>
          <p>{{songMsg.artists| transformArtistList}}</p>
        </div>
      </div>

      <div class="commnt-titile">精彩评论</div>
      <ul>
        <li v-for="item in hotCommentList" v-bind:key="item.commentId">
          <CommentItem :avatar="item.user.avatarUrl" :nickname="item.user.nickname"
           :zan="item.likedCount" :content="item.content" :time="item.time"></CommentItem>
      </li>
      </ul>

      <div class="commnt-titile">最新评论({{commentlength}})</div>
      <ul>
        <li v-for="item in commentList" v-bind:key="item.commentId">
          <CommentItem :avatar="item.user.avatarUrl" :nickname="item.user.nickname"
                       :zan="item.likedCount" :content="item.content" :time="item.time"></CommentItem>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import API from '../api'
  var api =new API();
  import {mapState, mapGetters }from 'vuex'
  import { InfiniteScroll } from 'mint-ui';
  import IconPlaying from './common/playing.vue'
  import CommentItem from './common/commentItem.vue'

  export default{
      data(){
          return{
              commentlength:0,
              hotCommentList:[],
              commentList:[]
          }
      },
    created(){
     this.hotCommentList=[]
      this.commentList=[]
    },
    mounted(){

      this.getCommentList();
    },
    computed:{
      ...mapState[('comment','songMsg')],
        songMsg(){
            return this.$store.state.songMsg
        },
        artists(){
            var arts=this.$store.state.songMsg.artists;
        },
      songId(){
        return this.$store.state.songMsg.id
      }

    },
    watch: {
      songId (newValue) {
        if (newValue)
          this.commentList=[];//清空上一首歌的评论
          this.getCommentList()
      }
    },
    methods:{
      goPlay(){
        this.$router.push({ name: 'Play'})
      },
      goBack () {
        this.$router.go(-1)
      },
      getCommentList(){
          api.get('/comment/music?id='+ this.songMsg.id + '&limit=20',{}, (res)=> {
             if(res.code==200){
                  this.commentlength=res.total;
                  this.hotCommentList=res.hotComments;
                  this.commentList =this.commentList.concat(res.comments) ;
             }
          })
      }
    },
    components:{
      InfiniteScroll , IconPlaying , CommentItem
    }
  }

</script>
<style>
  .cmt-top{padding-top: .15rem ;padding-bottom: .15rem;
    padding-left: 2%;padding-right: 2%;
    height:.5rem;border-bottom: 1px solid #e6e6e6;position: fixed;top:0;left: 0;z-index: 1000;width: 96%;overflow: hidden;
    background: #f2f4f5;
  }
  .comment{padding: .15rem;margin-top:.8rem;z-index: 100;}
  .song-pic{flex:1}
  .song-msg{   flex:3;padding: 15px 0 15px 15px;}
  .song-name{color:#333;font-weight: 700;margin-bottom: 10px;}
.song-picture{width:100%;}
  .commnt-titile{background: #e6e6e6;line-height: .4rem;height: .4rem;padding-left: .15rem;}
 .cmt-count{flex:8;text-align: center;line-height: .5rem;font-size: 16px;color:#333;font-weight: 700;}
  .icon-back,.icon-playing{flex:1;height: 32px;
    width:32px;}
  .icon-back{background-image: url(../../static/images/find_music/back1.png)}
</style>
