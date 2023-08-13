# 实时聊天网页

**项目技术：**
Vue3、Vite、TypeScript、Naive UI、Socket.io

**项目介绍：**

该项目是一个实时通讯工具，用户可以通过点击好友头像了解好友信息并发起聊天，在聊天⻚面支持获取聊天记录，以及可以发送图片表情包等进行实时互动。

**技术要点：**

1. 注册模块通过 Nodemailer 实现自动发送邮件验证码进行验证，使用验证码倒计时避免短时间内多次发送邮箱验证。
2. 基于 WebSocket 原理，使用 socket.io 库实现同个房间内多名用户实时通讯
3. 使用 TypeScript 来增强代码的类型检查、代码提示和文档生成等功能，从而降低代码出错的⻛险，增强代码可读性。
4. 分析解决⻚面内存上涨问题.使用 chrome 工具排查泄漏点,解决⻚面初始加载慢的问题
<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="inputVelue" /><button @click="">发送</button>
  </form>
  <ul>
    <li v-for="item in msgList" :key="item">{{ item }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { socket } from "@/socket";
import { reactive, ref } from "vue";

let inputVelue = ref("");
const msgList = <string[]>reactive([]);
const onSubmit = () => {
  if (inputVelue.value !== "") {
    socket.emit("chat message", inputVelue.value);
    inputVelue.value = "";
  }
};
socket.on("chat message", (msg: string) => {
  msgList.push(msg);
});
</script>

<style lang="scss" scoped>
h1 {
  color: red;
}
</style>
