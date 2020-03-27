<template>
  <div>
    <!-- 自定义组件双向绑定：:value @input -->
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInput(e) {
      //  派发一个input事件
      this.$emit("input", e.target.value);

      //  通知父级执行校验
      this.$parent.$emit("validate");
    }
  }
};
</script>

<style>
</style>