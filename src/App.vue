<template>
  <div>
    <el-config-provider :locale="locale" :message="config">
      <router-view />
    </el-config-provider>

  </div>
</template>

<script setup>
import { reactive } from "vue"
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = zhCn;

const config = reactive({
  max: 1,
});

</script>


<style scoped>

</style>
