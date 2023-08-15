<template>
  <div class="chatcontainar">
    <div class="left">
      <ul>
        <li @click="goChat('publicChatRoom')">
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>公共聊天室</span>
              <p>你好，很高兴认识你</p>
            </div>
          </div>
        </li>
        <li>
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>张三</span>
              <p>你好，很高兴认识你</p>
            </div>
          </div>
        </li>
        <li>
          <div class="content">
            <div class="img"></div>
            <div class="detail">
              <span>张三</span>
              <p>你好，很高兴认识你,很高兴认识你,很高兴认识你,很高兴认识你,</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right"><RouterView></RouterView></div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goChat = (type: string) => {
  router.push({
    path: "/main/chat/detail",
    query: {
      type,
    },
  });
};
</script>

<style lang="scss" scoped>
.chatcontainar {
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    ul {
      list-style-type: none;
      display: inline-block;
      margin-left: 30px;
      li {
        margin-bottom: 10px;
        .content {
          display: flex;
          justify-content: start;
          align-items: center;
          .img {
            width: 50px;
            height: 50px;
            background-color: green;
            border-radius: 50%;
          }
          .detail {
            margin-left: 10px;
            span {
              line-height: 20px;
              font-weight: 600;
            }
            p {
              line-height: 20px;
              font-size: 12px;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // white-space: nowrap;
              // word-break: break-all;
              width: 200px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  .right {
    margin-left: 20px;
    width: 100%;
    height: 80vh;
  }
}
</style>
