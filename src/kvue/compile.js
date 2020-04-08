class Compile {
    constructor(vm, el) {
        this.$vm = vm;
        this.$el = document.querySelector(el);

        if(this.$el) {
            this.compile(this.$el);
        }
    }

    compile(el) {
        const childNodes = el.childNodes;
        // 遍历子节点，判断节点类型，并执行对应的编译方法
        Array.from(childNodes).forEach(node => {
            if(this.isElement(node)){  // 元素节点
                this.compileElement(node);
            }else if(this.isInterpolation(node)) {  // 插值文本
                this.compileText(node);
            }
            // 递归子元素
            if(node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }
    
    // 判断是否为元素节点：nodeType为1
    isElement(node) {
        return node.nodeType === 1
    }
    
    // 判断节点是否为插值文本：nodeType为3，且以"{{"开头，以"}}"结尾
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    // 编译插值文本
    compileText(node) {
        // node.textContent = this.$vm[RegExp.$1.trim()];
        this.update(node, RegExp.$1, 'text');
    }

    // 编译元素节点
    compileElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            const attrName = attr.name;
            const exp = attr.value;
            if(this.isDirective(attrName)) {
                const dir = attrName.substring(2);
                // 执行指令
                this[dir] && this[dir](node, exp);
            }
        })
    }

    isDirective(attr) {
        return attr.indexOf('k-') === 0;
    }

    // k-text
    text(node, exp) {
        // node.textContent = this.$vm[exp];
        this.update(node, exp, 'text');
    }

    // k-html
    html(node, exp) {
        // node.innerHTML = this.$vm[exp];
        this.update(node, exp, 'html');
    }

    // 更新函数：
    // 初始化视图
    // 创建watcher实例
    update(node, exp, dir) {
        // 初始化视图
        const fn = this[dir + 'Updater'];
        fn && fn(node, this.$vm[exp]);

        // 创建watcher实例
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val);
        })
    }

    textUpdater(node, val) {
        node.textContent = val;
    }

    htmlUpdater(node, val) {
        node.innerHTML = val;
    }
}
