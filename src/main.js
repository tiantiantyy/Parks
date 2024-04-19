import 'reset-css'
import '@/assets/style/style.less'
import '@/plugins/element'
import '@/plugins/vcharts'
import router from '@/router'
import store from '@/store'
import 'babel-polyfill'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
import App from './App.vue'
Vue.use(ElementUI);


Vue.config.productionTip = false
Vue.component('panel', resolve => { require(['@/components/common/panel.vue'], resolve) })
Vue.component('empty', resolve => { require(['@/components/common/empty.vue'], resolve) })

Vue.directive('load-image', {
  bind: function (el, binding) {
    el.onerror = function () {
      el.src = require('@/assets/image/placeholder.png')
      el.classList = 'defaultImg'
    };
    el.src = binding.value
  },
  update: function (el, binding) {
    if (binding.value !== binding.oldValue) {
      el.src = binding.value
    }
  }
});

/* eslint-disable no-unused-vars */
const vm = new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store
}).$mount('#app')

export default vm
