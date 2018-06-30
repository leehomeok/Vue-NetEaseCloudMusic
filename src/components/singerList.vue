<template>
  <div class="page  page-account"
    style="padding-bottom: 0">
    <HeaderCommon  title="热门"
    />
    <div style="margin-top: 40px;">
      <cell v-for="(item,index) in list" 
        :key="index"
        :title="item.name + ((item.alias && item.alias.length) ? ( '(' + item.alias[0] + ')') : '')">
        <img slot="icon" :src="item.picUrl" width="40" height="40">
      </cell>
    </div>
  </div>
</template>

<script>
import HeaderCommon from './common/HeaderCommon'
import { Cell } from 'mint-ui'
import axios from 'axios'
export default {
  components:{
    HeaderCommon,Cell
  },
  mounted() {
    this.getData()
  },
  updated() {
    // this.
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  watch: {
    id(val, oldVal) {
      if (val !== oldVal) {
        this.list = []
        this.getData()
      }
    }
  },
  data () {
    return{
      list: [],
      more:true
    }
  },
  methods:{
    getData() {
      if (!this.id) {
        return
      }
      axios.get(`/nodeApi/artist/list?cat=${this.id}`).then((res)=> {
        // console.log(res)
        if(res.data.code == 200){
          let rdata = res.data
          this.list = this.list.concat(rdata.artists)
          this.more = rdata.more
        }
      })
    }
  }
}
</script>

<style>

</style>
