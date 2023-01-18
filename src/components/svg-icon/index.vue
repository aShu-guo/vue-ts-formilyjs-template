<template>
  <svg aria-hidden="true" class="svg-icon-spin" :class="clss">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
const {
  prefix = 'icon',
  name = '',
  color = '#333',
  size = 'default',
} = defineProps<{
  prefix?: string;
  name: string;
  color?: string;
  size?: string;
}>();
const symbolId = computed(() => `#${prefix}-${name}`);
const clss = computed(() => {
  return {
    [`sdms-size-${size}`]: size,
  };
});
// 用于绑定样式
const fontSize = reactive({ default: '32px', small: '20px', large: '48px' });
</script>
<style lang="less" scoped>
.svg-icon-spin {
  width: v-bind('fontSize.default');
  height: v-bind('fontSize.default');
  fill: v-bind(color);
  vertical-align: middle;
  color: v-bind(color);

  &.sdms-size-small {
    font-size: v-bind('fontSize.small');
    height: v-bind('fontSize.small');
  }

  &.sdms-size-large {
    font-size: v-bind('fontSize.large');
    height: v-bind('fontSize.large');
  }
}
</style>
