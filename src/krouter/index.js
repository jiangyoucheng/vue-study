// vue-router源码实现
// 1、作为一个插件存在：实现VueRouter类和install方法
// 2、实现两个全局组件：kRouter-link和kRouter-view
// 3、监控url变化：监听hashchange或popstate事件
// 4、响应最新url：创建一个响应式的属性current，当它改变时获取对应组件并显示

import Vue from 'vue';
import VueRouter from './kVue-router';
import Home from '../views/Home';
import About from '../views/About';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router;