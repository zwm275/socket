<template>
  <div class="header">
    <img src="../assets/logo.svg" alt="" />
    <span>{{ counterStore.username }}</span>
    <a-button danger>退出登录</a-button>
  </div>
  <div class="content">
    <a-row>
      <a-col :span="4">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="width: 256px"
          mode="inline"
          :items="items"
      /></a-col>
      <a-col :span="20"> <RouterView></RouterView></a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h, ref, watch } from "vue";
import { MessageOutlined, UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();

const router = useRouter();
const selectedKeys = ref(["1"]);
const openKeys = ref(["sub1"]);
watch(
  selectedKeys,
  (Value) => {
    let path = "/main/";
    path += Value[0] == "1" ? "chat" : "person";
    router.push({
      path,
    });
  },
  { immediate: true }
);

// 渲染列表
const items = ref([
  {
    key: "1",
    icon: () => h(MessageOutlined),
    label: "聊天",
    title: "Navigation One",
  },
  {
    key: "2",
    icon: () => h(UserOutlined),
    label: "联系人",
    title: "Navigation Two",
  },
]);
</script>

<style lang="scss" scoped>
.header {
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    margin-left: 3vw;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  span {
    font-size: 18px;
    margin-left: 1vw;
    letter-spacing: 1px;
    transform: translateY(-20%);
    flex: 1;
  }
  .ant-btn {
    margin-right: 3vw;
  }
}
.content {
  height: 85vh;
}
</style>
