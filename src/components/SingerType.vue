<template>
  <div class="page  page-account"
    style="padding-bottom: 0">
    <div class="page-header flex">
      <div class="flex-item">
        <icon-back class="back-icon"/>
      </div>
      <p class="flex-item">歌单</p>
      <div class="flex-item flex">
        <div class="inner-item"></div>
        <div class="inner-item"></div>
        <icon-playing class="inner-item"></icon-playing>
      </div>
    </div>
    <div style="margin-top:42px;">
      <div v-for="(list,index) in singerList" 
         :key="index"
         class="cell-group">
        <Cell  is-link
          v-for="item in list" 
          :key="item.label"
          :title="item.label">
        </Cell>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell } from 'mint-ui';
import IconBack from './common/IconBack'
import IconPlaying from './common/playing'
export default {
  components:{
    IconBack,IconPlaying,Cell
  },
  data () {
    const types = [{
      label: '华语',
      value: 1000
    },{
      label: '欧美',
      value: 2000
    },{
      label: '日本',
      value: 6000
    },{
      label: '韩国',
      value: 7000
    },{
      label:'其他',
      value: 4000
    }]
    const options = ['男歌手', '女歌手', '乐队/组合']
    let singerList = []
    types.forEach(t => {
      let res = []
      options.forEach((op,index) => {
        res.push({
          label: t.label + op,
          value: t.value + index + 1
        })
      })
      singerList.push(res)
    })
    return{
      singerList
    }
  }
}
</script>

<style>
.back-icon{
  margin-top: .2rem;
}
.cell-group{
  margin-bottom: .2rem;
}
</style>
