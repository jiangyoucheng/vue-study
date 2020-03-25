# 组件通信常用方式

1. ## props

   用于父给子传值

   ```javascript
   // child
   props: { msg: String }

   // parent
   <Helloworld msg="welcome to your vue.js App" />
   ```

2. ## 自定义事件（$emit）

   用于子给父传值

   ``````javascript
   // child
   this.$emit('add',good)

   // parent
   <Cart @add="cartAdd($event)"></Cart>
   ``````

3. ## 事件总线（$bus）

   这种方法通过一个空的Vue实例作为中央事件总线，用它来触发事件和监听事件，可以实现任何组件间的通信，包括父子、兄弟、跨级。

   ``````javascript
   // main.js
   Vue.prototype.$bus = new Vue()

   // child1
   this.$bus.$emit('foo', 'msg from child1')

   // child2
   this.$bus.$on('foo', msg => {
       console.log(msg)
   })
   ``````

4. ## vuex

   创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更。

5. ## $parent/$root

   兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root

   ``````javascript
   // brother1
   this.$parent.$on('foo', handle)

   // brother2
   this.$parent.$emit('foo')
   ``````

6. ## $children

   父组件可以通过$children访问子组件，实现父子通信

   ``````javascript
   // child
   foo(){
       console.log('foo')
   }

   // parent
   this.$children[0].foo()
   ``````

7. ## $refs

   获取子节点引用

   ``````javascript
   // parent
   <helloWorld ref="foo"></helloWorld>

   mounted() {
       this.$refs.foo.xx = 'xxx'
   }
   ``````

8. ## $attrs/$listeners

   [$attrs](<https://cn.vuejs.org/v2/api/#vm-attrs>):

   > 包含了父作用域中不作为prop被识别（且获取）的特性绑定（class和style除外）。当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定（class和style除外）。并且可以通过``v-bind="$attrs"``传入内部组件--在创建高级别的组件时非常有用 。

   [$listeners](<https://cn.vuejs.org/v2/api/#vm-listeners>):

   > 包含了父作用域中的（不含.native修饰器的）``v-on``事件监听器。它可以通过``v-on="$listeners"``传入内部组件--在创建更高层次的组件时非常有用。

   ``````javascript
   // child
   <p>{{$attrs.foo}}</p>
   <p>{{$attrs.bar}}</p>
   <child-comp2 v-bind="$attrs"></child-comp2>

   // child2
   <p>{{$attrs.foo}}</p>
   <p>{{$attrs.bar}}</P>

   // parent
   <child-comp foo="foo" bar="bar"></child-comp>
   ``````

9. ## provide/inject

   父组件通过provide提供需要引用的属性，后级组件通过inject注入需要用到的属性。

   可实现祖先和后代之间传值。

   ``````javascript
   // parent
   provide() {
       return { foo: 'foo' }
   }

   // child
   inject: ['foo']
   ``````

## 总结

- 父子通信
  - 父传子：props、$children、$refs、$attrs/$listeners
  - 子传父：$emit
- 兄弟通信：$bus、vuex、$parent
- 跨级通信：$bus、vuex、provide/inject、$attrs/$listeners、$root
