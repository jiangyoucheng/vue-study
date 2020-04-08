# vue原理分析

![vue原理](C:\Users\Rivers\Desktop\gitrepository\vue-study\notes\vue原理.png)

1. new Vue()首先执行初始化，对data执行响应化处理，这个过程发生在Observer中
2. 同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compile中
3. 同时定义一个更新函数和Watcher，将来对应数据变化时Watcher会调用更新函数
4. 由于data的某个key在一个视图中可能出现多次，所以每个key都需要一个管家Dep来管理多个Watch
5. 将来data中数据一旦发生变化，会首先找到对应的Dep，通知所有Watcher执行更新函数

## 涉及类型介绍

- Vue：框架构造函数
- Observer：执行数据响应化
- Compile：编译模板，初始化视图，收集依赖（更新函数、watcher创建）
- Watcher：执行更新函数（更新dom）
- Dep：管理多个Watcher，批量更新
