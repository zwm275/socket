<template>
  <div class="containar">
    <div class="header">
      <n-avatar
        round
        :size="48"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      <n-button strong secondary type="tertiary"> 退出登录 </n-button>
    </div>
    <div class="center">
      <n-switch v-model:value="collapsed" />
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
            @update:value="handleUpdateValue"
          />
        </n-layout-sider>
        <n-layout>
          <routerView></routerView>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  NButton,
  NAvatar,
  NSwitch,
  NMenu,
  NLayoutSider,
  NLayout,
} from "naive-ui";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { ref, h } from "vue";
import { useRouter } from "vue-router";

let collapsed = ref(true);
const router = useRouter();
// 菜单渲染列表
const menuOptions: MenuOption[] = [
  {
    label: "聊天",
    key: "chat",
  },
  {
    label: "联系人",
    key: "person",
  },
];
const renderMenuLabel = function (option: MenuOption) {
  if ("href" in option) {
    return h(
      "a",
      { href: option.href, target: "_blank" },
      option.label as string
    );
  }
  return option.label as string;
};
const renderMenuIcon = function (option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
};
const expandIcon = function () {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
};
// 选中回调
const handleUpdateValue = (key: string) => {
  router.push({ path: key });
};
</script>

<style lang="scss" scoped>
.containar {
  display: flex;
  flex-direction: column;
  // width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .center {
    flex: 1;
    margin-top: 20px;
    margin-left: 30px;
    // background-color: skyblue;
  }
}
</style>
