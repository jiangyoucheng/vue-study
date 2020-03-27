import Vue from 'vue';

function create(component, props) {
    const vm = new Vue({
        // render函数将传入组件配置对象转换为虚拟dom
        render: h => h(component, { props })
    }).$mount();  // 执行挂载函数，但未指定挂载目标，表示只执行初始化工作（会创建真实dom，但是不会追加操作）

    // 将生成的dom元素追加到body
    document.body.appendChild(vm.$el);

    // 给组件实例添加销毁方法
    const comp = vm.$children[0];
    comp.remove = () => {
        // 将dom元素从body上移除，并调用vue实例的destroy方法销毁vue实例
        document.body.removeChild(vm.$el);
        vm.$destroy();
    }
    return comp;
}

export default create;