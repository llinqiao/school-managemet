// 文档地址
// https://vuefe.cn/
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import moment from 'moment';
import './css/base.scss';
import VueZToast from 'vue-z-toast';
import 'vue-z-toast/dist/index.min.css';
import Scroll from './components/scroll/index';
import Status from './components/status/index';
import ElementUI from 'element-ui';
import Vant from 'Vant';
import VueWechatTitle from 'vue-wechat-title';

// import 'element-ui/lib/theme-chalk/index.css';

import { setWechatTitle } from './lib/utils';
Vue.config.productionTip = false;

// 全局路钩子
// router.beforeEach((to, from, next) => {
// 	// ...
// 	next();
// });

router.afterEach(route => {
  if (route.meta.title) {
    setWechatTitle(route.meta.title);
  }
  // ...
});
Vue.use(VueWechatTitle);
Vue.use(ElementUI);
Vue.use(VueZToast);
Vue.use(Vant);
Vue.component('scroll', Scroll);
Vue.component('status', Status);

Vue.filter('moment', (val, formatStr = 'YYYY-MM-DD') => {
  if (!val) return '';
  if (typeof val === 'number') {
    return moment(val * 1000).format(formatStr);
  } else {
    return moment(new Date(val)).format(formatStr);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
// event bus
/**
 * 使用方法
 * this.$bus.$emit('func', args);
 * this.$bus.$on('func', args => {
 * 	console.log(args);
 * });
 */
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});
