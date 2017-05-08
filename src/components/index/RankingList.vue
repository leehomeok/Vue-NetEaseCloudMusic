<template>
  <div class="ranking-list-component">
    <CateTitle title="云音乐官方榜"></CateTitle>
    <div style="margin-top: 10px" >
      <div class="clearfix" v-for="item in officialList" style="width: 100%" @click="play(item.rankId)">
        <div style="float: left;">
          <img :src="item.picUrl" style="width: 120px;">
        </div>
        <div style="margin-left: 15px;float: left;padding-top: 10px;">
          <p class="top-three" v-for="(item,index) in item.tracks" v-if="index<3">{{index+1}}.{{item.name}}-{{item.artists[0].name}}</p>
        </div>
      </div>
    </div>


    <CateTitle title="全球榜"></CateTitle>
    <ul class="global clearfix">
      <li v-for="item in globalList" class="item-three" @click="play(item.id)">
        <div style="display: inline-block;width: 100%">
          <img :src="item.picUrl" width="100%" style="border:1px solid #eeeeee">
          <p style="padding:0 3px ">{{item.name}}</p>
        </div>
      </li>
    </ul>

  </div>
</template>
<style scoped>
  .global{padding-bottom: 0.3rem;}
  .global li:nth-child(3n){margin-right: 0;}
  .item-three{width: 33%;float: left;margin-right: 1px;margin-bottom: 10px;}
  .top-three{line-height: 24px;margin-bottom: 6px;}
</style>
<script>
  import axios from 'axios'
  //var api =new API();
  import CateTitle from '../common/CateTitle.vue'
  import {mapState,mapMutations,mapGetters } from 'vuex'
  export default{
      computed:{
        ranklist(){
            return this.$store.getters.getRankList
        }
      },
    data () {
      return {
          loading:true,
          officialList:[
            {id:"3",name:'云音乐飙升榜',picUrl:"http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150"},
            {id:"0",name:'云音乐新歌榜',picUrl:"http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150"},
            {id:"2",name:'网易原创歌曲榜',picUrl:"http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150"},
            {id:"1",name:'云音乐热歌榜',picUrl:"http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150"}
            ],
          globalList:[
            {id:"12",name:'云音乐ACG榜',picUrl:"http://p4.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=150y150"},
            {id:"13",name:'云音乐古典音乐榜',picUrl:"http://p3.music.126.net/BzSxoj6O1LQPlFceDn-LKw==/18681802069355169.jpg?param=150y150"},
            {id:"4",name:'云音乐电音榜',picUrl:"http://p3.music.126.net/4mh2HWH-bd5sRufQb-61bg==/3302932937414659.jpg?param=150y150"},
            {id:"5",name:'UK排行榜周榜',picUrl:"http://p4.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=150y150"},
            {id:"6",name:'美国Billboard周榜',picUrl:"http://p4.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=150y150"},
            {id:"7",name:'KTV嗨榜',picUrl:"http://p3.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=150y150"},
            {id:"8",name:'iTunes榜',picUrl:"http://p4.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=150y150"},
            {id:"9",name:'Hit FM Top榜',picUrl:"http://p3.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=150y150"},
            {id:"10",name:'日本Oricon周榜',picUrl:"http://p3.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=150y150"},
            /*{id:"11",name:'韩国Melon排行榜周榜',picUrl:""},
            {id:"12",name:'韩国Mnet排行榜周榜',picUrl:""},
            {id:"13",name:'韩国Melon原声周榜',picUrl:""},*/
            {id:"14",name:'中国TOP排行榜(港台榜)',picUrl:"http://p3.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=150y150"},
            {id:"15",name:'中国TOP排行榜(内地榜)',picUrl:"http://p4.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=150y150"},
            {id:"16",name:'香港电台中文歌曲龙虎榜',picUrl:"http://p4.music.126.net/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=150y150"},
            {id:"17",name:'华语金曲榜',picUrl:"http://p3.music.126.net/N2whh2Prf0l8QHmCpShrcQ==/19140298416347251.jpg?param=150y150"},
            {id:"18",name:'中国嘻哈榜',picUrl:"http://p4.music.126.net/8gUF9TrXGNoRO6cKVaCzrQ==/5972547162256485.jpg?param=150y150"},
            {id:"19",name:'法国 NRJ Vos Hits周榜',picUrl:"http://p3.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=150y150"},
            {id:"20",name:'台湾Hito排行榜',picUrl:"http://p4.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=150y150"},
            {id:"21",name:'Beatport全球电子舞曲榜',picUrl:"http://p3.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=150y150"},
            ],
      }
    },
    methods: {
        getOfficialRank(){
          if (this.ranklist > 0) {
              console.log(this.ranklist)
            this.Loading = false;
            return;
          }
          let list = [];
          let L = [3,0,2, 1];
          let P = (item) => {
            return new Promise((resolve, reject) => {
              axios.get('/nodeApi/top/list?idx='+ item ).then(res => {
                resolve(res);
              });
            })
          };
          new Promise((resolve, reject) => {
            Promise.all(L.map(item => {
              P(item).then(res => {
                if (item == 0) {
                  res.data.result.picUrl = 'http://p4.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150';
                  res.data.result.rankId = 0;
                }
                if (item == 1) {
                  res.data.result.picUrl = 'http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150'
                  res.data.result.rankId = 1;
                }
                if (item == 2) {
                  res.data.result.picUrl = 'http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150'
                  res.data.result.rankId = 2;
                }
                if (item == 3) {
                  res.data.result.picUrl = 'http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150'
                  res.data.result.rankId = 3;
                }
                list.push(res.data.result);
                resolve(res.data.result)
              });
            }));
          }).then(result => {
            this.Loading = false;
            this.$store.commit('set_rank_list', list);
            this.officialList = list;
          });
        },
        play(id){
          this.$router.push({path: '/songList/' + id});
      }
    },
    created () {
    },
    mounted(){
      this.getOfficialRank()
    },
    components: {
      CateTitle,
    }
  }
</script>
