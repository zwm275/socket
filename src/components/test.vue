<template>
  <div>test</div>
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

<style lang="scss" scoped></style>
