import API from '../api';
const api=new API();

var storeConfig = {
        state: {
            audioDomElement: '', //  音频Dom对象
            phoneResolutionWidth: 0, //  手机分辨率宽度
            playlist: {
                id: 0, //  类型不为搜索的歌单ID
                type: 'list', //  当前播放列表来源类型 { list: 歌单列表, search: 搜索列表}
                list: []
            }, //  正在播放的列表
            login: false,
            /*
             songMsg：当前准备播放或者正在播放音乐的信息
             数据类型：
             id: 歌曲id
             name: 歌曲名称
             artists: 演唱歌手
             album: 专辑信息
             mp3Url: 播放链接
             mvid: mv链接ID，0为没有id
             */
            selected:'find_music',
            songMsg: {},
            lyricArr: [], //  歌词数组
            currentLyricArrIndex: 0, //  当前显示的歌词索引值
            songCurrentTime: 0, //  当前正在播放音频的播放时间
            songDuration: 0, //  当前正在播放音频的总时长
            songMsgIndex: 0, //  当前正在播放音频在正在播放列表中的索引位置,默认0
            playStatus: false, //  当前播放状态：true为正在播放，false为暂停或者未播放
            isBuffering: false, //  当前音频是否在缓冲状态
            playMode: 'listCycle', //  播放模式，三种：listCycle（列表循环），listRandom（列表随机）,singleCycle(单曲循环)
            user: {
                id: '392871477'
            },
            ranklist:[],
            DJlist:[],
        },
        actions: {
          SET_DJ_LIST(context,payload){
            context.commit('set_dj_list',payload)
          },
            SET_RANK_LIST(context,payload){
              context.commit('set_rank_list',payload)
            },
            SET_TABBAR(context,object){
              context.commit('set_tabbar',object)
            },
          //  上一首
            PRECONTROL({ dispatch, commit, state }) {
                if (state.playStatus) {
                    commit('pauseControl')
                }
                state.audioDomElement.currentTime = 0
                var listLength = state.playlist.list.length
                    //  遵循播放模式进行控制
                if (state.playMode !== 'listRandom') { //  只要不是随机，就进行上一首音频信息切换
                    if (state.songMsgIndex === 0) { //  当前为列表第一首的时候
                        dispatch('setSongMsg', state.playlist.list[listLength - 1])
                        state.songMsgIndex = listLength - 1
                    } else {
                        dispatch('setSongMsg', state.playlist.list[state.songMsgIndex - 1])
                        state.songMsgIndex -= 1
                    }
                } else { // 列表随机
                    dispatch('randomMode')
                }
            },
          //  下一首
            nextControl({ dispatch, commit, state }) {
                if (state.playStatus) {
                    commit('pauseControl')
                }
                state.audioDomElement.currentTime = 0
                    //  遵循播放模式进行控制
                if (state.playMode !== 'listRandom') { //  只要不是随机，就进行下一首音频信息切换
                    if (state.songMsgIndex === state.playlist.list.length - 1) { //  当前为列表最后一首的时候
                        dispatch('setSongMsg', state.playlist.list[0])
                        state.songMsgIndex = 0
                    } else {
                        dispatch('setSongMsg', state.playlist.list[state.songMsgIndex + 1])
                        state.songMsgIndex += 1
                    }
                } else { // 列表随机
                    dispatch('randomMode')
                }
            },
          //  从正在播放列表中选中播放
            playFromPlaylist({ dispatch, state }, index) {
                dispatch('setSongMsg', state.playlist.list[index])
                state.songMsgIndex = index
            },
            //  随机播放模式音频信息设置
            randomMode({ dispatch, state }) {
                var randomNumber = randomRange(0, state.playlist.list.length)
                if (randomNumber === state.songMsgIndex) { //  防止随机到当前正在播放的音频
                    return dispatch('randomMode')
                }
                dispatch('setSongMsg', state.playlist.list[randomNumber])
                state.songMsgIndex = randomNumber
            },
          //  注册播放过程中的相关事件
            registerPlayEvent({ dispatch, commit, state }) {
               //  注册音乐结束后自动播放下一首事件
                state.audioDomElement.onended = function() {
                        state.playStatus = false //  结束歌曲后重置播放状态
                        if (state.playMode !== 'singleCycle') { //  不是单曲循环的都自动播放下一首
                            dispatch('nextControl')
                        } else { //  单曲循环模式，1.5秒后继续播放当前音频
                            var timer = setTimeout(function() {
                                commit('playControl')
                                clearTimeout(timer)
                            }, 1500)
                        }
                    }
                 //  当加载完元数据时，获取当前音乐总时长
                state.audioDomElement.onloadedmetadata = function() {
                        state.songDuration = this.duration
                    }
                    //  当需要为下一帧进行缓冲时
                state.audioDomElement.onwaiting = function() {
                        state.isBuffering = true
                    }
                    //  当可以准备播放或者已经足够的缓冲时
                state.audioDomElement.oncanplay = function() {
                        state.isBuffering = false
                    }
                    //  当前播放位置改变时，获取当前播放位置
                state.audioDomElement.ontimeupdate = function() {
                    state.songCurrentTime = this.currentTime
                        //  通知更改歌词位置
                    commit('setCurrentLyricArrIndex', this.currentTime)
                }
            },
          //  更改音频源时，进行播放操作
            setSongMsg({ dispatch, commit, state }, payload) {
                //  设置正在播放音乐的信息
                state.songMsg = payload
                    //  异步请求获取歌曲的URL
                var xhr = new XMLHttpRequest()
                var url = process.env.NODE_ENV !== 'production' ? 'http://demo.guojingfeng.com/api/music.php' : '/api/music.php'
                xhr.open('POST', url, true)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText)
                        if (data.code === 200) {
                            state.audioDomElement.src = data.data[0].url
                            commit('playControl')
                        }
                    }
                }
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                xhr.send('mp3Url=' + payload.id)
                    //  加载歌曲歌词
                dispatch('loadLyric', payload.id)
            },
            //  异步请求获取歌曲的歌词并进行解析
            loadLyric({ state }, lyricId) {
                var xhr = new XMLHttpRequest()
                var url = process.env.NODE_ENV !== 'production' ? 'http://demo.guojingfeng.com/api/music.php' : '/api/music.php'
                xhr.open('POST', url, true)
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText)
                        if (data.code === 200) {
                            var timeReg = /\[\d\d:\d\d\.?\d*\]/g //  匹配时间段，如[00:14.879]
                            var timeFormatReg = /\d\d:\d\d\.?\d*/g //  匹配时间格式用来进行必要的转换，如[00:14.879] => 转化为秒
                            var lyric = [] // 歌词
                            var lyricTranslate = [] //  翻译
                            var times
                            if (data.nolyric) { //  纯音乐
                                state.lyricArr.push({
                                    lyric: '纯音乐，请欣赏',
                                    noLyric: true
                                })
                                state.currentLyricArrIndex = 0
                                return
                            }
                            if (data.uncollected) { //  暂无歌词
                                state.lyricArr.push({
                                    lyric: '抱歉，暂无歌词',
                                    uncollected: true
                                })
                                state.currentLyricArrIndex = 0
                                return
                            }
                            times = data.lrc.lyric.match(timeReg) //  时间段
                            if (times == null) { //  不支持时间轴滚动
                                state.lyricArr.push({
                                    lyric: '抱歉，该歌词不支持滚动',
                                    unScroll: true
                                })
                                state.currentLyricArrIndex = 0
                                return
                            }
                            data.lrc.lyric.split('\n').forEach(val => { // 歌词
                                    if (timeReg.test(val)) {
                                        lyric.push({
                                            lyric: val.replace(timeReg, ''),
                                            time: val
                                        })
                                    }
                                })
                             // 过滤[00:14.879][00:16.557]双时间匹配的歌词,只取开始时间
                            lyric.forEach((value, index) => { // 时间的格式化以及加入列表
                                value.times = value.time.match(timeFormatReg)[0]
                                let min = value.times.split(':')[0] //  获取分钟
                                let sec = value.times.split(':')[1] //  获取秒
                                value.time = min * 60 + sec * 1 // 先把时间字符串转化为数字再进行叠加
                            })
                            if (data.tlyric.lyric != null) { // 翻译,根据原语言时间来匹配翻译
                                lyricTranslate = data.tlyric.lyric.split('\n')
                                for (var i = 0; i < lyric.length; i++) {
                                    let reg = new RegExp(lyric[i].times) // 将时间作为正则匹配对象,与\[\d\d:\d\d\.?\d*\]保持一致
                                    for (var j = 0; j < lyricTranslate.length; j++) {
                                        if (reg.test(lyricTranslate[j])) { // 匹配出对应时间的翻译
                                            lyric[i].translateLyric = lyricTranslate[j].replace(timeReg, '') //  去除时间
                                            continue
                                        }
                                    }
                                }
                            }
                            lyric.forEach((value, index) => { //  过滤空白歌词
                                if (value.lyric === '') {
                                    lyric.splice(index, 1)
                                }
                            })
                            state.lyricArr = lyric
                            state.currentLyricArrIndex = 0
                        }
                    }
                }
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                xhr.send('lyricId=' + lyricId)
            },

        },
        mutations: {
          set_rank_list(state,object){
              state.ranklist=object;
          },
          set_dj_list(state,object){
            state.DJlist=object;
          },
          set_tabbar(state,object){
             state.selected=object.selected;
          },
            setAudioDomElement(state) {
                state.audioDomElement = document.getElementById('audioElement')
            },
            playControl(state) { //  播放控制
                state.audioDomElement.play()
                state.playStatus = true
            },
            pauseControl(state) { //  暂停控制
                state.audioDomElement.pause()
                state.playStatus = false
            },
            setPhoneResolutionWidth(state, width) { //  获取手机分辨率宽度
                state.phoneResolutionWidth = width
            },
            setPlaylist(state, payload) { //  设置正在播放列表
                state.playlist = payload
            },
            removeItemFromPlaylist(state, index) { //  从播放列表中移除一个元素
                state.playlist.list.splice(index, 1)
            },
            setCurrentLyricArrIndex(state, time) {
                if (state.lyricArr.length === 0) {
                    //  歌词为空的情况下，暂时不做任何处理
                    return
                }
                //  纯音乐
                if (state.lyricArr[0].noLyric) return
                    //  暂无歌词
                if (state.lyricArr[0].uncollected) return
                    //  不支持滚动的歌词
                if (state.lyricArr[0].unScroll) return
                var length = state.lyricArr.length
                for (var i = 0; i < length; i++) {
                    if (i !== (length - 1)) { //  不为最后一句歌词时
                        if (time > state.lyricArr[i].time && time < state.lyricArr[i + 1].time) { //  当大于当前歌词时间戳并且小于下一帧歌词时间戳
                            state.currentLyricArrIndex = i
                        }
                    } else {
                        //  最后一句歌词暂时不做处理
                        // state.currentLyricArrIndex = i
                    }
                }
            },
            setSongCurrentTime(state, time) { //  设置当前正在播放音频的播放时间
                state.songCurrentTime = time
                state.audioDomElement.currentTime = time
            },
            setSongDuration(state, time) { //  设置当前正在播放音频的总时长
                state.songDuration = time
            },
            setSongMsgIndex(state, index) { //  设置正在播放歌曲在列表的索引位置
                state.songMsgIndex = index
            },
            setPlayMode(state) { //  更改播放模式，
                //  三种：listCycle（列表循环），listRandom（列表随机）,singleCycle(单曲循环)
                if (state.playMode === 'listCycle') {
                    state.playMode = 'listRandom'
                } else if (state.playMode === 'listRandom') {
                    state.playMode = 'singleCycle'
                } else {
                    state.playMode = 'listCycle'
                }
            },
            resetPlaylist(state) { //  清空/重置播放列表
                state.playlist = {
                    id: 0, //  类型不为搜索的歌单ID
                    type: 'list', //  当前播放列表来源类型 { list: 歌单列表, search: 搜索列表}
                    list: []
                }
            }
        },
        getters: {
          getRankList: (state, getters) => {
            return state.ranklist.length;
          },
          getDjList: (state, getters) => {
            return state.DJlist.length;
          }

        }
    }
    /**
     * 返回一个规定范围内的随机数
     * @param startRange 最小范围
     * @param endRange 最大范围
     * @returns {number}
     */
function randomRange(startRange, endRange) {
    return Math.floor(Math.random() * (endRange + 1 - startRange) + startRange)
}
export default storeConfig
