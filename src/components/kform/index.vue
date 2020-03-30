<template>
  <div>
    <h3>kForm表单</h3>
    <hr />
    <k-form :model="user" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <kInput v-model="user.username" placeholder="请输入用户名"></kInput>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <kInput v-model="user.password" type="password" placeholder="请输入密码"></kInput>
      </k-form-item>
      <k-form-item>
          <button @click="login">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import kInput from "./kInput";
import kFormItem from "./kFormItem";
import kForm from "./kForm";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    kInput,
    kFormItem,
    kForm
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        const nt = this.$notice( {
            title: '提示',
            message: valid ? '请求登录' : '校验失败',
            duration: 2000
        })
        nt.show();
      });
    }
  }
};
</script>

<style>
</style>