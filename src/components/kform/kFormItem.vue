<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  props: {
    // 输入项标签
    label: {
      type: String,
      default: ""
    },
    // 字段名
    prop: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: "" // 校验错误
    };
  },
  inject: ["form"],
  mounted() {
    // 监听校验事件
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    // 校验事件
    validate() {
      // 获取对应FormItem校验规则
      const rules = this.form.rules[this.prop];
      // 获取校验值
      const value = this.form.model[this.prop];
      // 校验描述对象
      const descriptor = { [this.prop]: rules };
      // 创建校验器
      const schema = new Schema(descriptor);
      // 返回Promise，没有触发catch就说明验证通过
      return schema.validate( { [this.prop]: value }, error => {
          if(error) {
              // 将错误信息显示
              this.error = error[0].message;
          }else {
              // 校验通过
              this.error = "";
          }
      })
    }
  }
};
</script>

<style>
</style>