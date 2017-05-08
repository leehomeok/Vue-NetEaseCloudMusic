import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import MyList from '@/components/index/MyList' //  我的歌单
import SongMenu from '@/components/index/SongMenu' //  歌单列表
import MvList from '@/components/index/MvList' //  MV列表
import RankingList from '@/components/index/RankingList' //  排行榜

Vue.use(Router)

//  异步加载非首页模块
const Player = resolve => {
  //  require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/Player.vue'], () => {
    resolve(require('@/components/Player.vue'))
  })
}
const Play = resolve => {
  //  require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['@/components/Play.vue'], () => {
    resolve(require('@/components/Play.vue'))
  })
}
const MvPlayer = resolve => {
  require.ensure(['@/components/MvPlayer.vue'], () => {
    resolve(require('@/components/MvPlayer.vue'))
  })
}
const MusicList = resolve => {
  require.ensure(['@/components/MusicList.vue'], () => {
    resolve(require('@/components/MusicList.vue'))
  })
}
const Search = resolve => {
  require.ensure(['@/components/Search.vue'], () => {
    resolve(require('@/components/Search.vue'))
  })
}
const SongList = resolve => {
  require.ensure(['@/components/SongList.vue'], () => {
    resolve(require('@/components/SongList.vue'))
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '',
          name: 'MyList',
          component: MyList
        },
        {
          path: 'songMenu',
          name: 'SongMenu',
          component: SongMenu
        },
        {
          path: 'mvList',
          name: 'MvList',
          component: MvList
        },
        {
          path: 'rankingList',
          name: 'RankingList',
          component: RankingList
        }
      ]
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/mvPlayer/:id',
      name: 'mvPlayer',
      component: MvPlayer
    },
    {
      path: '/musicList/:id',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/songList/:id',
      name: 'SongList',
      component: SongList
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 定位滚动条到顶部
  window.scrollTo(0, 0)
  next()
})

export default router
