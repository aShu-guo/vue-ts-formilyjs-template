<template>
  <IconFont :type="type" />
</template>

<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue';

const { type, size = 14 } = defineProps<{
  type: string;
  size?: number;
}>();

const fontSize = computed(() => {
  return size + 'px';
});

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3867188_1y2psdeyeis.js',
});
</script>
<style lang="less" scoped>
.anticon {
  font-size: v-bind('fontSize') !important;
}
</style>
