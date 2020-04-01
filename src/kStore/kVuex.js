let Vue;

class Store {
    constructor(options) {
        // 保存mutations和actions
        this._mutations = options.mutations || {};
        this._actions = options.actions || {};

        // 绑定commit上下文，否则action中调用commit时，this为undefined
        // 同时把action也绑了，因为action可以互调
        const store = this;
        const { commit, action } = store;
        this.commit = function boundCommit(type, payload) {
            commit.call(store, type, payload);
        }
        this.action = function boundAction(type, payload) {
            return action.call(store, type, payload);
        }

        // 创建响应式的state
        this._vm = new Vue({
            data: {
                // 加两个$，Vue不做代理
                $$state: options.state
            }
        })
    }

    get state() {
        return this._vm.$data.$$state;
    }

    set state(v) {
        console.error('不能这么做！！');
    }

    // 实现commit：根据用户传入的type执行对应的mutation
    commit(type, payload) {
        // 获取对应的mutation
        const entry = this._mutations[type];

        if (!entry) {
            console.error(`unKnow mutation type: ${type}`);
            return;
        }

        entry(this.state, payload);
    }

    // 实现dispatch：根据用户传入的type执行对应的mutation
    dispatch(type, payload) {
        // 获取对应的action
        const entry = this._actions[type];

        if (!entry) {
            console.error(`unKnow action type: ${type}`);
            return;
        }

        // action函数接受一个与store实例具有相同方法的上下文对象
        // 异步结果处理常常需要返回Promise
        return entry(this, payload);
    }
}

function install(_vue) {
    Vue = _vue;

    Vue.mixin({
        beforeCreate() {
            // 挂载$store
            // 只有跟组件有store选项
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

export default { Store, install };
