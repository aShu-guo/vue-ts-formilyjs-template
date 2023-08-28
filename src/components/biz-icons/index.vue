<template>
  <IconFont :type="type" />
</template>

<script setup lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue';
defineOptions({ name: 'BizIcons' });
const props = withDefaults(
  defineProps<{
    type: string;
    size?: number;
  }>(),
  {
    size: 14,
  },
);

const fontSize = computed(() => {
  return props.size + 'px';
});

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3867188_d0zu7pj736a.js',
});
</script>
<style scoped>
.anticon {
  font-size: v-bind('fontSize') !important;
}
</style>
