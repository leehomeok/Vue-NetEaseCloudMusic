/**
 * Created by guojingfeng on 2017/4/11.
 */
//  全局的filter
/**
 * 用于过滤歌手列表,将歌手信息返回为以‘/’分割模式
 * @list 歌手列表数组
 * return string
 */
function transformArtistList (list) {
  var str = ''
  if (!list) return str //  避免传入undefined引发的错误
  var listLength = list.length
  if (listLength === 0) return str
  if (listLength === 1) {
    return list[0].name
  } else {
    list.forEach(function (value, index) {
      if (index !== (listLength - 1)) {
        str += value.name + '/'
      } else {
        str += value.name
      }
    })
    return str
  }
}
/**
 * 根据秒数返回的时间格式为 00:00
 * @time 时间
 * return string
 */
function transformTime (time) {
  if (!time) return '00:00' //  避免传入undefined引发的错误
  var min = parseInt(time / 60)
  var sec = parseInt(time % 60)
  return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
}
/**
 * 根据收听数量返回数字带单位
 * @num 收听量
 * return string
 */
function transformNumberCount (num) {
  if (!num) return '' //  避免传入undefined引发的错误
  if (num < 100000) { //  小于10万
    return num
  } else if (num > 100000 && num < 10000000) { //  10万到1000万，后面带个单位万
    return (num / 10000).toFixed(1) + '万'
  } else if (num > 100000000) { //  1亿以上（目前没发现有）
    return (num / 100000000).toFixed(1) + '亿'
  }
}
export default {
  transformArtistList: transformArtistList,
  transformTime: transformTime,
  transformNumberCount: transformNumberCount
}
