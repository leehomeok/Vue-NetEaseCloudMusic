// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import vuex from 'vuex'
import storeConfig from './store/index'
import filters from './filters/index'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(Mint);
Vue.config.productionTip = false
Vue.use(vuex)
Vue.use(VueResource)

//  获取store对象
const store = new vuex.Store(storeConfig)

//  混入全局对象
Vue.mixin({ filters })

//  设置全局http请求链接
Vue.http.options.root = process.env.NODE_ENV !== 'production' ? '/api' : '/api'
    //  模拟表单提交数据
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

Vue.filter('wan', function (value) {
  if (value>10000){
    var wan= value.toString();
    return wan.substr(0,wan.length-4)+"万";
  }
  return value;
})
Vue.filter('abs', function (value) {
    if(isNaN(Math.abs(value)))  return 0;
    return Math.abs(value);
})
Vue.filter('time', function (value) {
   value= +(value.toString().substr(0,10));
   var result,
      d= new Date( value * 1000),
    Y = d.getFullYear()+ '年',
    M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '月',
    D = d.getDate() + '日 ',
    h = d.getHours()<10 ? '0'+ d.getHours() + ':' :  d.getHours() + ':' ,
    m = d.getMinutes()<10? '0'+d.getMinutes() + ':': d.getMinutes() + ':',
    s = d.getSeconds()<10 ? '0'+ d.getSeconds(): d.getSeconds();
  result = Y + M + D ;
  return result;
})

Vue.filter('datetime', function (value) {
  value= +(value.toString().substr(0,10));
  var result,
    d= new Date( value * 1000),
    Y = d.getFullYear()+ '年',
    M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '月',
    D = d.getDate() + '日 ',
    h = d.getHours()<10 ? '0'+ d.getHours() + ':' :  d.getHours() + ':' ,
    m = d.getMinutes()<10? '0'+d.getMinutes() + ':': d.getMinutes() + ':',
    s = d.getSeconds()<10 ? '0'+ d.getSeconds(): d.getSeconds();
  result = Y + M + D + h +m + s;
  return result;
})
