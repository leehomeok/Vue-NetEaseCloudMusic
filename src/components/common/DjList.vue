<template>
  <div class="dj-list" >
    <ul class="clearfix">
      <li  v-for="item in djList" @click="goToDJList(songListInfo.id)" v-bind:key="item.id">
        <div class="dj-item">
          <img class="dj-list-detail-cover" :src="item.picUrl">
          <div class="dj-detail-brand">
            <span>{{ item.program.dj.brand }}</span><i class="icon-broad background"></i>
        </div>
        </div>
        <p class="song-list-name">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import API from '../../api'
  var api =new API();
  export default{
    data () {
      return {
        componentWidth: 0, //  当前组件宽度
        componentHeight: 0, //  当前组件高度
        djList: []
      }
    },
    computed: {
      phoneResolutionWidth () {
        return this.$store.state.phoneResolutionWidth
      }
    },
    methods: {
      loadData () {
          var _this=this;
         api.get('personalized/djprogram',{},function (res) {
            if(res.code==200){
                _this.djList=res.result;
            }
         })
      },
      goToDJList (id) {
        this.$router.push({
          name: 'MusicList',
          params: {
            id: id
          }
        })
      }
    },
    beforeMount () {
      var dpr = window.devicePixelRatio || 1
      //  设置组件宽度 = （当前手机分辨率宽度 - （2px间距）* 2 * 设备像素比) / 3
      this.componentWidth = (this.phoneResolutionWidth - 2 * 2 * dpr) / 3
      //  组件高度和宽度比为1:1
      this.componentHeight = this.componentWidth

    },
    mounted(){
      this.loadData()
    }
  }
</script>


<style scoped>
  .dj-list {
    width:100%;
  }
  .dj-list ul{padding-bottom:.2rem}
  .dj-detail-brand{color: #fff;position: absolute;bottom: 0;width: 100%;height: 20px;line-height: 20px;}
  .dj-detail-brand span{float: left;}
  .dj-list ul li{float: left;width: 33%;margin-right: .5% ;}
  .dj-item{position: relative;}
  .dj-list ul li:nth-child(3n){margin-right:0!important;}
  .dj-list ul li p{height:.4rem;line-height: .2rem;padding: 0 5px;}
  .song-list-detail {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .dj-list-detail-cover {
    width: 100%;
    height: 100%;
  }
   .icon-broad {
    display:block;
    float: right;
    width: 0.32rem;
    height: 0.32rem;
    background-image: url('../../../static/images/find_music/icon_broad.png');
  }
  .song-list-detail-listen-count {
    position:absolute;
    right:0.05rem;
    top:0.05rem;

    color: #fff;
  }
  .song-list-name {
    margin:.05rem 0 .15rem ;text-align:left;
  }
</style>

