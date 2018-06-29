<template>
  <div class="flex cmt-item">
     <div class="avatar">
       <img class="avat" v-bind:src="avatar">
      </div>

     <div class="comment-content">
       <div class="flex item-top">
         <div class="item-left">
            <p>{{nickname}}</p>
            <p class="time">{{time |time }}</p>
         </div>
         <div class="zan " @click="like()" v-bind:class="{like :liked==true}">
            
            <span v-show="zan>0" class="like_count">{{zan| wan}}</span>
            <span class="icon icon-zan"></span>
         </div>
         </div>
       <div>

       <p>{{content}}</p>
       </div>
     </div>
  </div>

</template>
<script>
  export default{
      props:{
         avatar:{
              type:String
          },
         nickname:{
             type:String
         },
        time:{
             type:Number
        },
        zan:{
             type:Number
        },
        content:{
             type:String
        },
        liked:{
             type:Boolean
        }

      },
    data(){
          return{

          }
    },
    methods:{
      like(){
        this.liked=!this.liked;
        if(this.liked==true){
            this.zan++
        }else{
            this.zan--
        }
      }
    }
  }

</script>
<style>
  .cmt-item{padding: 5px }
  .avatar{flex:1}
  .time{color:#666;}
  .item-top{margin-bottom: 4px;}
  .comment-content{flex:7;border-bottom:1px solid #e6e6e6;padding-bottom: 5px; }
.avat{width: 40px;height: 40px;border-radius: 50%;}
  .item-left{flex:5}
  .zan{flex:1}
  .icon{width:.32rem;height:.32rem;
    -webkit-background-size:contain!important;
    background-size:contain!important;
    display: inline-block;}
  .icon-zan{background-image: url("../../../static/images/find_music/zan.png");}
  .like_count{line-height: .4rem;float: left;}
  .like span{color:#ea0606;}
  .like .icon-zan{background-image: url("../../../static/images/find_music/liked.png")}
</style>
