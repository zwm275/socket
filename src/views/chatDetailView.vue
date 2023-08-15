<template>
  <div class="container">
    <h1>publicChatRoom</h1>
    <div class="chatBox" ref="chatBox">
      <div
        v-for="(item, index) in msgList"
        :key="index"
        :class="{
          content: true,
          content_right: item.username === counterStore.username,
        }"
      >
        <img src="../assets/logo.svg" alt="" />
        <div class="right">
          <p>{{ item.username }}</p>
          <div>
            <p>{{ item.msg }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="input">
      <a-input
        v-model:value.lazy="inputValue"
        autofocus
        @keyup.enter.native="sendMsg"
      /><a-button type="primary" @click="sendMsg">发送</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { socket } from "@/socket";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
// 输入框内容
let inputValue = ref("");
// 聊天记录
interface msgInterface {
  username: string;
  msg: string;
}
let msgList = <msgInterface[]>reactive([]);
// 发送
const sendMsg = () => {
  if (inputValue.value !== "") {
    const data = { username: counterStore.username, msg: inputValue.value };
    socket.emit("publicRoom", data);
    inputValue.value = "";
  }
};
// 接受消息
const chatBox = <any>ref();
socket.on("publicRoomReply", (data: msgInterface) => {
  msgList.push(data);
  // 滚动到自己的最下面
  const timer = setTimeout(() => {
    try {
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    } catch (error) {
      // console.log(error)
    }
    clearTimeout(timer);
  }, 100);
});

const route = useRoute();
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #f0f0f0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  h1 {
    text-align: center;
    background-color: #f0f0f0;
    height: 10%;
  }
  .chatBox {
    width: 100%;
    height: 80%;
    overflow: scroll;
    overflow-x: hidden;
    // overflow-y: hidden;
    .content {
      display: flex;
      width: 90%;
      margin: 0 auto;
      flex-direction: row;
      margin-bottom: 20px;
      // background-color: red;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0 10px;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: start;

        // background-color: red;
        p {
          margin: 0;
        }
        :nth-child(1) {
          color: #333;
        }
        div {
          width: 100%;
          background-color: #e6f4ff;
          padding: 5px 8px;
          margin-top: 3px;
          border-radius: 6px;
          background-color: #e6f4ff;
          p {
            line-height: 20px;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
    }
    .content_right {
      flex-direction: row-reverse;
      .right {
        :nth-child(1) {
          display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }
  .input {
    height: 10%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    // margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      width: 60%;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
