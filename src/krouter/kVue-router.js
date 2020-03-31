import Link from './kRouter-link';
import View from './kRouter-view';

let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;
        
        // 将current设置为响应式
        const initial = window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(this, 'current', initial);

        // 监控url的变化：监听hashchange事件
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));

        // 路由映射表
        this.routeMap = {};
        this.$options.routes.forEach(route => {
            this.routeMap[route.path] = route;
        })
    }

    onHashChange() {
        this.current = window.location.hash.slice(1) ;
    }
}

VueRouter.install = function(_vue) {
    Vue = _vue;
    Vue.mixin({
        beforeCreate () {
            // 只有跟组件才拥有router选项
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 实现两个全局组件router-link和router-view
    Vue.component('router-link',Link);
    Vue.component('router-view',View);
}

export default VueRouter;