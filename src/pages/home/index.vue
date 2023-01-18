<script setup lang="ts">
import { framework } from '../data';

const _data = ref(framework);
</script>
<template>
  <div class="dark:text-slate-400 dark:bg-slate-900">这是首页</div>
</template>

<style lang="less" scoped>
.version {
  display: inline-block;
  padding: 6px;
  margin-left: 6px;
  border-radius: 10px;
}
</style>
