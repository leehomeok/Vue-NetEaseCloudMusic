<template>
  <div>
  <a class="weui-cell weui-cell_access" href="javascript:;">
    <div class="weui-cell__hd" v-if="imgsrc">
      <img v-bind:src="imgsrc" class="icon-img">
    </div>
    <div class="weui-cell__bd">
      <p>{{title}}</p>
    </div>
    <div class="weui-cell__ft">{{subTitle}}</div>
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
  .icon-img{width:20px;margin-right:5px;display:block}
  a{text-decoration: none;}
  .weui-cells{background: #fff;}
  .weui-cells{
    margin-top:.618647059em;line-height: 1.47058824;font-size: 16px;overflow: hidden;position: relative;
    background-color:#fff;
  }
  .weui-cells:before{
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
  .weui-cell_access{
    -webkit-tap-highlight-color:rgba(0,0,0,0);color: inherit;
  }
  .weui-cell{
    padding: 10px 15px;position: relative;display: -webkit-box;
    display: -webkit-flex;display: flex;-webkit-box-align:center;
    -webkit-align-items:center;align-items:center;
  }
  .weui-cell__bd{
    -webkit-box-flex:1;
    -webkit-flex: 1;
    flex:1
  }
  .weui-cell_access .weui-cell__ft{
     padding-right: 13px;position: relative;
  }
  .weui-cell__ft{text-align: right;color: #999}
  .weui-cell_access .weui-cell__ft:after{
    content: " ";display: inline-block;height: 6px;width: 6px;border-width: 2px 2px 0 0;
    border-color: #C8C8CD;border-style: solid;
    -webkit-transform:matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;top: -2px;
    position: absolute;
    top:50%;
    margin-top: -4px;right: 2px;
  }
</style>
