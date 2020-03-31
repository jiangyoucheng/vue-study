# vue-router

Vue Router是vue.js官方的路由管理器。它和Vue.js的核心深度集成，让构建单页面应用变得易如反掌。

## 1. 核心功能

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于vue.js过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的CSS class的链接
- HTML5历史模式或hash模式，在IE9中自动降级
- 自定义的滚动条行为

## 2. 核心步骤

- 使用vue-router插件，`router.js`

  ``````javascript
  import Vue from 'vue'
  import Router from 'vue-router'
  Vue.use(Router)
  ``````

- 创建路由，`router.js`

  ``````javascript
  const routes = [{
      ...
  }]
  ``````

- 创建Router实例，`router.js`

  ``````javascript
  const router = new Router({
      router
  })
  export default router
  ``````

- 在跟组件上添加该实例，`main.js`

  ``````javascript
  import router from './router'
  new Vue({
      router
  }).$mount('#app')
  ``````

- 添加路由视图，`APP.vue`

  ``````vue
  <router-view></router-view>
  ``````

- 导航

  ``````vue
  <router-link to="/">home</router-link>
  <router-link to="/about">about</router-link>
  ``````

## 3. vue-router源码实现

- ### 需求分析

  - **作为一个插件存在：实现VueRouter类和install方法**
  - **实现两个全局组件：router-view用于显示匹配组件类容，router-link用于跳转**
  - **监控url变化：监听hashchange或popstate事件**
  - **响应最新url：创建一个响应式的属性current，当它改变时获取对应组件并显示**

- ### 具体步骤

  - **实现一个插件：创建VueRouter类和install方法**

    创建kvue-router.js

    ``````javascript
    let Vue;
  
    class VueRouter {
       constructor(options) {
        this.$options = options;  // 保存传入的选项
      }
    }
  
    // 插件：实现install方法。
    // 注册$router
    VueRouter.install = function(_vue) {
      // 引用构造函数，VueRouter中要使用
      Vue = _vue;
  
      Vue.mixin({
        beforeCreate() {
          // 只有根组件拥有router选项
          if(this.$options.router){
            Vue.prototype.$router = this.$options.router;
          }
        }
      })
    }
  
    export default VueRouter;
    ``````

    > ***为什么要用混入方式写？主要原因是use代码在前，Router实例创建在后，而install逻辑又需要用到该实例。***

  - **创建router-view和router-link**

    创建krouter-link.js

    ``````javascript
    // <router-link to="xxx">xxx</router-link>
    export default {
      props :{
        to: String,
        required: true
      },
      render(h) {
        // <a href="xxx">xxx</a>
        return h('a', {
          href: '#' + this.to
        },[
          this.$slots.default
        ])
      }
    }
    ``````

    创建krouter-view.js

    ``````javascript
    export default {
      render(h) {
        // 暂时不渲染任何类容
        return h(null);
      }
    }
    ``````

  - **监控url变化**

    定义响应式的current属性，监听hashchange事件,`kvue-router.js`

    ``````javascript
    class VueRouter {
      constructor(options) {
        // 定义响应式属性current
        const initial = window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(this, 'current', initial);
  
        // 监听hashchange事件
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));
      }
  
      onHashChange() {
        this.current = window.location.hash.slice(1);
      }
    }
    ``````

    动态获取对应组件，`krouter-view.js`

    ``````javascript
    export default {
      render(h) {
        // 动态获取对应组件
        let component = null;
        this.$router.options.routes.forEach(route => {
          if(this.$router.current === route.path) {
            component = route.component;
          }
        })
        return h(component);
      }
    }
    ``````

  - **提前处理路由表**

    提前处理路由表，避免每次都循环

    ``````javascript
    class VueRouter {
      constructor(options) {
        // 缓存path和route的映射关系
        this.routeMap = {};
        this.$options.routes.forEach(route => {
          this.routeMap[route.path] = route;
        })
      }
    }
    ``````

    获取对应组件，`krouter-view.js`

    ``````javascript
    export default {
      render(h) {
        const {routeMap,current} = this.$router;
        const component = routeMap[current].component;
          return h(component);
        }
    }
    ``````
