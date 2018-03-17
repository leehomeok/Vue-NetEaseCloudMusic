<template>
  <div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1" 
        :class="{active:selected=='find_music'}" 
        @click.native="setTab('find_music')">
        <img v-if="selected=='find_music'" slot="icon" src="../../../static/images/find_music/icon_logo_hover.png">
        <img v-else slot="icon" src="../../../static/images/find_music/icon_logo.png">
        发现
      </mt-tab-item>

      <mt-tab-item id="tab2" 
        :class="{active:selected=='my_music'}" 
        @click.native="setTab('my_music')">
        <img v-if="selected=='my_music'" slot="icon" src="../../../static/images/find_music/music_hover.png">
        <img v-else slot="icon" src="../../../static/images/find_music/music.png">
        我的
      </mt-tab-item>

      <mt-tab-item id="tab3" 
        :class="{active:selected=='friends'}" 
        @click.native="setTab('friends')">
        <img v-if="selected=='friends'" slot="icon" src="../../../static/images/find_music/friend_hover.png">
        <img v-else  slot="icon"  src="../../../static/images/find_music/friend.png">
        朋友
      </mt-tab-item>

      <mt-tab-item id="tab4" 
        :class="{active:selected=='account'}" 
        @click.native="setTab('account')">
        <img v-if="selected=='account'" slot="icon" src="../../../static/images/find_music/user_hover.png">
        <img v-else slot="icon" src="../../../static/images/find_music/user.png">
        账号
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name:'footbar',
  components: {
    Tabbar, TabItem
  },
  data(){
    return{}
  },
  methods:{
    setTab(tab){
      this.$store.dispatch('SET_TABBAR',{
        selected:tab
      })
      switch(tab){
        case "find_music": this.$router.push('/');break;
        case "my_music" : this.$router.push('myMusic');break;
        case "friends" :this.$router.push('friend'); break;
        case "account" :this.$router.push('account'); break;
      }
    }
  },
  computed:{
    selected: {
    get () {
      return this.$store.getters.selected
    },
    set (val) {
      this.$store.dispatch('SET_TABBAR',{
        selected:val
      })
    }
    }
  }
}
</script>

<style scoped>
 .mint-tabbar{ position:  fixed}
 .mint-tab-item{padding: 3px 0;}
  .active{color:#d33a31;}
</style>
