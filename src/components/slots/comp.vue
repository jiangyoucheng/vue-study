<template>
  <div>
      <div>
          <slot></slot>
      </div>
      <div>
          <slot name="content"></slot>
      </div>
      <div>
          <slot :content="foo"></slot>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          foo: 'foo'
      }
  }
}
</script>

<style>

</style>