<template>
  <div class="song-item flex">
    <div style="flex:1;margin-right: 5px;">
      <img v-bind:src="songPic">
    </div>
    <div style="flex:5;padding: 5px 0; ">
      <p class="song-name">{{songName}}</p>
      <p class="artist-name">{{artist}}</p>
    </div>
  </div>
</template>
<script>
  export default{
     props:{
       songName:{
           type:String
       },
       songPic:{
         type:String
       },
       artist:{
         type:String
       }
     }     ,
    data(){
         return {

         }
    }

  }


</script>
<style>
  .song-item{background: #dbdbdb;padding: 5px;margin-bottom: .1rem;}
  .song-name{margin-bottom: .1rem;font-size: .24rem;color:#333}
  .artist-name{color:#888;font-size: .18rem}

</style>
