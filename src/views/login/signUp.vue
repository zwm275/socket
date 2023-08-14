<template>
  <div class="container">
    <a-form
      :model="formState"
      name="basic"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1>注册</h1>
      <a-form-item
        label="用户名"
        name="username"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'change' },
          {
            min: 3,
            max: 12,
            message: '长度应为3-12',
            trigger: 'blur',
          },
        ]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item label="确认密码" name="password2">
        <a-input-password v-model:value="formState.password2" />
      </a-form-item>

      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="验证码"
        name="code"
        :rules="[
          { required: true, message: '请输入验证码', trigger: 'change' },
          {
            min: 4,
            max: 4,
            message: '长度应为4',
            trigger: 'blur',
          },
        ]"
      >
        <a-input v-model:value="formState.code" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
        <a-button type="primary" html-type="submit">注册</a-button>&nbsp;
        <a-button @click="goSignIn">去登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import { socket } from "@/socket";
import { message } from "ant-design-vue";
const router = useRouter();

interface FormState {
  username: string;
  password: string;
  password2: string;
  email: string;
  code: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  password2: "",
  email: "",
  code: "",
});

// 规则
let validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请确认密码");
  } else if (formState.password !== formState.password2) {
    return Promise.reject("两次密码不一致");
  } else {
    return Promise.resolve();
  }
};
const rules: Record<string, Rule[]> = {
  password2: [{ required: true, validator: validatePass, trigger: "change" }],
  password: [
    { required: true, validator: validatePass, trigger: "change" },
    {
      min: 5,
      max: 12,
      message: "长度应为5-12",
      trigger: "blur",
    },
  ],
};
// 注册
const onFinish = (values: any) => {
  // console.log("Success:", values);
  socket.emit("signUp", values);
};
const onFinishFailed = (errorInfo: any) => {
  // console.log("Failed:", errorInfo);
};
// 服务器回复
socket.on("signUpReply", (data) => {
  if (data.state) {
    goSignIn();
    return message.success(data.msg + "，为您跳转至登录界面");
  }
  return message.error(data.msg);
});

// 去登录
const goSignIn = () => {
  router.push({ path: "/login/signin" });
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  h1 {
    text-align: center;
  }
  .ant-form {
    width: 30%;
  }
}
</style>
