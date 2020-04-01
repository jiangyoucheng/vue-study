// vuex原理解析
// 实现一个插件：声明Store类，挂载$store
// 创建响应式的state，保存mutations、actions和getters
// 实现commit：根据用户传入type执行对应mutation
// 实现dispatch：根据用户传入type执行对应action，同时传递上下文
// 实现getters：按照getters定义对state做派生

// 使用
import Vue from 'vue';
import Vuex from './kVuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        add(state) {
            state.count++;
        },
        minus(state) {
            state.count--;
        },
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
    },
    actions: {
        add({ commit }) {
            setTimeout(() => {
                commit('add');
            }, 1000);
        },
    },
    modules: {
    },
})