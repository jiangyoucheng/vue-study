<template>
  <div>
      <child1 foo="foo" bar="bar" msg="welcome to your vue.js App" @send="receiveMsg"></child1>
      <child2></child2>
      <button @click="greet">$child</button>
  </div>
</template>

<script>
import child1 from './child1'
import child2 from './child2'
export default {
  provide() {
    return {
        foo: 'foo',
        bar: 'bar'
    }
  },
  components: {
      child1,
      child2
  },
  methods: {
      receiveMsg(e) {
          console.log(e)
      },
      greet() {
          this.$children[0].sayHello()
      }
  },
  mounted() {
      this.$bus.$on('foo', msg => {
          console.log('index', msg)
      })
  }
}
</script>

<style>

</style>