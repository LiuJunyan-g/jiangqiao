// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import echarts from "echarts"

import axios from 'axios';    //使用axios发送AJAX请求


Vue.prototype.$axios= axios;
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
