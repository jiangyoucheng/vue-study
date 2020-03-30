import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import create from './utils/create';

Vue.config.productionTip = false;

// 将create方法挂载到Vue实例的原型上
// Vue.prototype.$create = create;
Vue.use(create);

// 事件总线：通过一个空的Vue实例作为中央事件总线，来触发和监听事件
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
