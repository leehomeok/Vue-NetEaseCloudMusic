<template>
  <div>
     <ul class="sole clearfix" >
       <li v-bind:key="item.id"  v-bind:class="{lastone:$index==2}" v-for="item,$index in soleList " >
           <img class="sole_img" v-bind:src="item.picUrl">
           <p>{{item.copywriter}}</p>
       </li>
     </ul>
  </div>

</template>
<script>
  import API from '../../api'
  var api =new API();
  export default{
      data(){
          return{
             soleList:[],
             last:{}
          }
      },
      methods:{
            getSoleList(){
                var _this=this;
                api.get('personalized/privatecontent',{},function (res) {
                   if(res.code==200){
                       _this.soleList=res.result;
                   }
                })

            }
      },
     mounted(){
          this.getSoleList()
     },
  }


</script>
<style scoped>

  .sole_img{width: 100%;height: 2rem}
  .sole li{width:49.5%;float: left;margin-bottom: .2rem;}
  .sole li:nth-child(2n){float: right;}
  .sole li p{padding: 0 2px;}
  .sole .lastone{float:none; width: 100%;margin-right: 0;}
</style>
