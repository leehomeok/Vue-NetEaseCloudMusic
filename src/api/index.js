import axios from 'axios'
import config from './config'

class API {
  get(url, param, callback) {
		config.headers.token= localStorage.getItem("prmManage_token") || "";
		axios.get(config.baseURL+ url, param, config)
		.then((res) => {
			if (res.data.code == 500 ){
				console.log("服务器错误");
			} else if (res.data.code== 523){
				this.$cookie.delete('username');
				window.location.href='#/login';
				console.log('未登录')
			} else if (res.data.code> 400&&res.data.code<500){
				console.log(res.data.code+":"+res.data.msg);
			} else {
				if (typeof callback == "function"){
					callback(res.data);
				}
			}
		})
		.catch((err) => {
			console.log(err);
		});
  }
  post(url, param, callback) {
		axios.post(config.baseURL+  url, param, config).then((res) => {
			if (res.data.code == 500 ){
				console.log("服务器错误");
			} else if (res.data.code== 523){
				this.$cookie.delete('username');
				window.location.href='#/login'
				console.log('未登录')
			} else if (res.data.code> 400&&res.data.code<500){
				console.log(res.data.code+":"+res.data.msg);
			} else {
				if (typeof callback == "function"){
					callback(res.data);
				}
			}
		}).catch((err) => {
			console.log(err);
		});
  }
}
export default API;
