import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // state用于保存引用状态
  state: {
    count: 0,
  },
  // mutations用于修改状态
  // 必须是同步函数
  // 在组件中通过this.$store.commit('xxx')提交mutation
  mutations: {
    add(state) {
      state.count++;
    },
    minus(state) {
      state.count--;
    },
  },
  // getter：从state派生出新状态，类似计算属性
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
  // action提交的是mutation，而不是直接变更状态
  // action可以包含任意异步操作
  // 在组件中通过this.$store.dispatch('xxx')提交action
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add');
      }, 1000);
    },
  },
  modules: {
  },
});
