<template>
  <div>
    <a class="cell cell_access" href="javascript:;">
      <div class="cell-hd">
        <img v-bind:src="imgsrc" class="cover-img">
      </div>
      <div class="cell-bd">
        <p style="margin-bottom: 5px;font-size: .24rem;color:#333;">{{title}}</p>
        <p v-if="subTitle" style="font-size: .18rem;color:#666">{{subTitle}}</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default{
    props:{
      title:{
        type:String
      },
      subTitle:{
        type:String
      },
      imgsrc:{
        type:String
      }
    },
    data(){
      return{
      }
    }
  }
</script>
<style>
  .cover-img{width:40px;margin-right:5px;display:block}
  a{text-decoration: none;}
  .cells:before{
    content: " ";position: absolute;;
    left:0;top:0;height: 1px;
    border-top:1px solid #e5e5e5;color:#e5e5e5;
    right:0;
    -webkit-transform-origin:0 0;
    transform-origin:0 0;
    -webkit-transform:scaleY(0.5);
    transform: scaleY(0.5);
    z-index:2
  }
  .cell_access{
    -webkit-tap-highlight-color:rgba(0,0,0,0);color: inherit;
  }
  .cell{
    background: #fff;
    padding: 5px 10px 2px;position: relative;display: -webkit-box;
    display: -webkit-flex;display: flex;-webkit-box-align:center;
    -webkit-align-items:center;align-items:center;
  }
  .cell-bd{
    -webkit-box-flex:1;
    -webkit-flex: 1;
    flex:1;
    border-bottom:1px solid #cdcdcd;
    padding: 5px 0;
  }
  .cell_access {
    padding-right: 0px;position: relative;
  }
</style>
