<template>
  <div class="container">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <h1>登录</h1>
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

      <a-form-item
        label="密码"
        name="password"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 5,
            max: 12,
            message: '长度应为5-12',
            trigger: 'blur',
          },
        ]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
        <a-button type="primary" html-type="submit">登录</a-button>&nbsp;
        <a-button @click="goSignUp">去注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { socket } from "@/socket";
import { message } from "ant-design-vue";
const router = useRouter();

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
});
// 登录按钮
// 成功的回调
const onFinish = (values: any) => {
  // console.log("Success:", values);
  socket.emit("signIn", values);
};
// 失败的回调
const onFinishFailed = (errorInfo: any) => {
  // console.log("Failed:", errorInfo);
};
// 服务器回复
socket.on("signInReply", (data) => {
  if (data.state) {
    goMain();
    return message.success(data.msg);
  }
  return message.error(data.msg);
});
// 去注册
const goSignUp = () => {
  router.push({ path: "/login/signup" });
};
// 去首页
const goMain = () => {
  router.push({ path: "/main" });
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
