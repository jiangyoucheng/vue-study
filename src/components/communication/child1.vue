<template>
  <div>
    <p>{{ msg }}</p>
    <p>{{ $attrs.foo }}</p>
    <p>{{ $attrs.bar }}</p>
    <button @click="sendMsg">点击</button>
    <button @click="toChild2">$parent</button>
  </div>
</template>

<script>
export default {
  props: { msg: String },
  methods: {
      sendMsg(){
          this.$emit('send','msg from child1')
      },
      toChild2() {
          this.$parent.$emit('bar', 'msg from child1')
      },
      sayHello() {
          console.log('hello')
      }
  },
  mounted() {
      this.$bus.$on('foo',msg => {
          console.log('child1', msg)
      })
  }
}
</script>

<style>

</style>