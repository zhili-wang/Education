import Vue from 'vue'
import App from './App.vue'
import router from './router'

import iView from 'iview';
//引入工具文件
// import util from './libs/util'
//引入axios封装文件
import axiosBag from './libs/axios'
import store from './store'
import axios from 'axios'

import 'iview/dist/styles/iview.css';

// 引入element
import ElementUI from 'element-ui';     //引入element库
import 'element-ui/lib/theme-chalk/index.css';        //引入element的css

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI);
// Vue.use(util);
Vue.use(axiosBag);
Vue.prototype.axios = axios

//Vue.prototype.baseUrl =  process.env.NODE_ENV == 'development' ? '/api/' : '';
Vue.prototype.baseUrl = "/api";
var userInfo = {
  userId:'',
  userName:'',
  customerName:'',
  projectName:'',
  token:12354354352345,
  isAdmin:true
}
localStorage.setItem("userInfo",JSON.stringify(userInfo));

new Vue({
  store,
  axios,
  router,
  render: h => h(App)
}).$mount('#app')
