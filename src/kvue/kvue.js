// KVue实例
// 执行初始化，对data执行响应化处理，同时对模板执行编译
class KVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        
        // 为$data做代理
        proxy(this);
        
        // 对data执行响应化处理
        observe(this.$data);

        // 对模板执行编译
        new Compile(this, this.$options.el);
    }
}

// 执行数据响应化
class Observer {
    constructor(val) {
        this.value = val;

        this.walk(val);
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }
}

// const watchers = []; // 临时用于保存watcher测试用

// 执行更新函数
class Watcher {
    constructor(vm, key, fn) {
        this.vm = vm;  // kvue实例
        this.key = key;  // 依赖Key
        this.updateFn = fn;  // 跟新函数
        
        // 临时放入watchers数组
        // watchers.push(this);
        
        // Dep.target静态属性上设置为当前watcher实例，用来保存watcher实例，替代之前的watchers数组
        Dep.target = this;
        this.vm[this.key];  // 读取触发了getter，在getter收集watcher
        Dep.target = null;  // 收集完了就置空
    }

    update() {
        this.updateFn.call(this.vm, this.vm[this.key]);
    }
}

// 依赖，管理某个key相关所有watcher实例
class Dep {
    constructor() {
        this.deps = [];
    }

    add(dep) {
        this.deps.push(dep);
    }

    notify() {
        this.deps.forEach(dep => dep.update());
    }
}

// 利用Object.defineProperty做响应化处理
function defineReactive(obj, key, val) {
    observe(val);

    // 创建一个Dep实例和当前key一一对应
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            // 在getter中收集依赖,watcher实例保存在Dep.target上
            Dep.target && dep.add(Dep.target);
            return val;
        },
        set(newVal) {
            if(newVal !== val) {
                observe(newVal);
                val = newVal;

                // 通知更新
                dep.notify();
            }
        }
    })
}

// 循环遍历，解决嵌套问题
function observe(obj) {
    if(typeof obj !== 'object' || obj === null) {
        return;
    }

    new Observer(obj);
}

// 为$data做代理，直接用this.xxx获取$data中的数据
function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key];
            },
            set(newVal) {
                vm.$data[key] = newVal;
            }
        })
    })
}
