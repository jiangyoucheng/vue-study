<template>
  <div>
      <button @click="click">$bus</button>
      <p>{{ foo }}</p>
      <p>{{ bar }}</p>
  </div>
</template>

<script>
export default {
  inject:['foo','bar'],
  methods: {
      click() {
          this.$bus.$emit('foo','msg from child2')
      }
  },
  mounted() {
      this.$parent.$on('bar', msg => {
          console.log('$parent', msg)
      })
  }
}
</script>

<style>

</style>