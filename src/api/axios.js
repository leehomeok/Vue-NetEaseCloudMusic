import  axios from 'axios';
export  default {
  install:function (Vue) {
    Object.defineProperties(Vue.prototype,'$http',{
      value:axios
    })
  }
}
